import { analyze } from './index';
import {APIGatewayProxyEvent} from "aws-lambda";

// @ts-ignore
let mockEvent: APIGatewayProxyEvent = {
  body: '{"comment": "This is terrible suggestion! If we start copy-pasting code then it will become difficult to modify it. For example, if there will be a mistake in one copy-pasted function, then we would have to fix this mistake in all the places where this function would be copied. It also makes codebase larger and will force compiler do more work. Is this a joke or something? It is quite surprising to see such a suggestion from experienced software engineer which you are claiming to be. So you either being malicious or dishonest about your experience. I suggest you read information on the internet about pifalls of copying and pasting large chunks of code since this is crucial issue for any software engineer to be aware of ."}',
};

describe('analyze', () => {
  it('is working', async () => {
    const result = await analyze(mockEvent);
    console.log(JSON.stringify(result));
    expect(result.statusCode).toEqual(200);
  }, 60_000)
});
