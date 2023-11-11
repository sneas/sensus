import {
  onAnalyzeRequest,
} from '@sensus/extension-api';


onAnalyzeRequest(async (sendResponse, comment) => {
  const result = await fetch('https://vnlfq7j4lyqqstuzamdsacthcq0kfdcx.lambda-url.us-east-1.on.aws/', {
    method: 'POST',
    body: JSON.stringify({comment}),
  }).then((response) => response.json());

  console.log(result);

  return sendResponse(result.averageScore);
});
