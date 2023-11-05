import { analyze } from './index';
import {APIGatewayProxyEvent} from "aws-lambda";

// @ts-ignore
let mockEvent: APIGatewayProxyEvent = {
  body: '{"comment": "This is terrible suggestion!"}',
};

describe('analyze', () => {
  it('is working', async () => {
    const result = await analyze(mockEvent);
    console.log(JSON.stringify(result));
    expect(result.statusCode).toEqual(200);
  }, 60_000)
});
