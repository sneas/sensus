import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../buildResponse';

export const analyze = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('OPENAI_API_KEY', process.env.OPENAI_API_KEY);
  return buildResponse({ body: JSON.stringify({ ok: true }) });
}

exports.analyze = analyze;
