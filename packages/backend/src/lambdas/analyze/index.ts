import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from '../../buildResponse';

export const analyze = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> =>
  buildResponse({ body: JSON.stringify({ ok: true }) });

exports.analyze = analyze;
