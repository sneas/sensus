import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../buildResponse';
import 'openai/shims/node';
import OpenAI from 'openai';

const openai = new OpenAI();

export type AnalysisRequest = {
  comment: string;
};

export const analyze = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const request = JSON.parse(event.body);
  if (!isAnalysisRequest(request)) {
    throw new Error('Request is malformed');
  }

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: createPrompt(request) }],
    model: "gpt-3.5-turbo",
  });

  console.log(`Got request ${event.body}. Analyzer responded with: ${JSON.stringify(completion)}`);

  let response;
  try {
    response = JSON.parse(completion.choices[0].message.content);
    response['averageScore'] = (response.politeness + response.agreeableness + response.usefulness) / 3.0;
  } catch(e) {
    throw new Error(`Failed to parse analyzer's response as JSON: ${e}`);
  }

  return await buildResponse({ body: JSON.stringify(response) });
}

const isAnalysisRequest = (request: any): request is AnalysisRequest => {
  if (!('comment' in request)) {
    return false;
  }

  if (typeof request.comment !== 'string') {
    return false;
  }

  return true;
}

const createPrompt = (analysisRequest: AnalysisRequest): string => (
  `I'm writing comment to an issue or pull request in Github.
   Given my comment below in MY_COMMENT section, can you rate following
   properties of my comment from 1 to 5:
   * Politeness (1 means impolite, 5 means very polite)
   * Usefullness (1 means useless, 5 means very useful)
   * Agreeableness (1 mean disagreeable, 5 means very agreeable)

  For each property please provide explanation or reasoning about why
  certain score was assigned.

  MY_COMMENT: ${analysisRequest.comment}

  Please respond in JSON, as in following example:
  {
    "politeness": 3,
    "politenessReason": "Comment was somewhat polite, but some sentences were rude...",
    "usefulness": 5,
    "usefulnessReason": "Comment very provided useful about...",
    "agreeableness": 4,
    "agreeablenessReason": "Comment is quite agreeable because..."
  }
  `
)

exports.analyze = analyze;
