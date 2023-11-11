import {
  onAnalyzeRequest,
} from '@sensus/extension-api';
import {Analysis, isSuccess, resultify} from "@sensus/model";


onAnalyzeRequest(async (sendResponse, comment) => {

  const response = await resultify(
      fetch(
          'https://vnlfq7j4lyqqstuzamdsacthcq0kfdcx.lambda-url.us-east-1.on.aws/',
          {
            method: 'POST',
            body: JSON.stringify({comment}),
          }
      ), {
        reason: 'Failed to fetch analysis from the backend.',
      });

  if (!isSuccess(response)) {
    return sendResponse(response);
  }

  const result = await resultify<Analysis>(response.value.json(), {
    reason: 'Failed to parse analysis from the backend.',
  });

  console.log(result);

  if (!isSuccess(result)) {
    return sendResponse(result);
  }

  return sendResponse(result);
});


chrome.runtime.setUninstallURL(
    'https://docs.google.com/forms/d/e/1FAIpQLScqSjT41DScPl_ODGa20VYLAlB0E2N42TxWIOo5_UiXOFUmGg/viewform?usp=sf_link'
);
