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

  const promptContent = createPrompt(request);

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: promptContent }],
    model: "gpt-3.5-turbo",
    temperature: 0,
    top_p: 0,
  });

  console.log(`Sent prompt ${promptContent}. Analyzer responded with: ${JSON.stringify(completion)}`);

  let response;
  try {
    response = JSON.parse(completion.choices[0].message.content);
    response.averageScore = (response.politeness + response.agreeableness + response.usefulness) / 3.0;
  } catch(e) {
    throw new Error(`Failed to parse analyzer's response as JSON: ${e}`);
  }

  return await buildResponse({ body: JSON.stringify(response) });
}

const truncateComment = (comment: string): string => {
  const MAX_TOKENS = 100;
  const tokens = comment
    .split(/([^A-Za-z])/g)
    .map((token) => token.trim())
    .filter((token) => token !== '');
  tokens.splice(MAX_TOKENS);
  return tokens.join(' ');
};

const isAnalysisRequest = (request: any): request is AnalysisRequest => {
  if (!('comment' in request)) {
    return false;
  }

  if (typeof request.comment !== 'string') {
    return false;
  }

  return true;
}

const createPrompt = (analysisRequest: AnalysisRequest): string => {
  const truncatedComment = truncateComment(analysisRequest.comment);
  return [
    "I'm writing comment for Github issue or pull request. Given comment in MY_COMMENT section, rate following properties of my comment from 1 to 5:",
    "* politeness",
    "* usefulness",
    "* agreeableness",
    "",
    `MY_COMMENT: ${truncatedComment}`,
    "",
    "Respond in JSON, as in example: {\"politeness\":1,\"usefulness\":3,\"agreeableness\":4}"
  ].join('\n');
}

exports.analyze = analyze;
