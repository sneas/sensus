import { analyze } from './index';
import {APIGatewayProxyEvent} from "aws-lambda";

// @ts-ignore
let mockEvent: APIGatewayProxyEvent = {};
describe('analyze', () => {
  it('is working', async () => {
    const result = await analyze(mockEvent);
    expect(result.statusCode).toEqual(200);
  })
});
