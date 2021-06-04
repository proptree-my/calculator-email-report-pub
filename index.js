const initialize = require('./src/initialize')
const validator = require('./src/validator');
const response = require('@proptree/proptree-lib/lib/response/lambda');
exports.handler = async (event, context, callback) => {
  // https://stackoverflow.com/questions/41621776/why-does-aws-lambda-function-always-time-out
  context.callbackWaitsForEmptyEventLoop = false;

  // refer https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html for full list of context property
  const { functionName, functionVersion } = context;
  console.log(`Executing function <${functionName}> - v${functionVersion}`);

  // refer to event.json for api gateway payload
  const body = event.body;
  const headers = event.headers
  const queryParams = event.queryStringParameters;
  const multiValueQueryParams = event.multiValueQueryStringParameters;

  // Application entry point
  try {
    // initialze parameter
    // console.log('Initialize parameters');
    // await initialize();

    // Parse body to JSON
    const bodyJSON = parseJSON(event)

    // Logic validation
    // validator.validateQueryParam(queryParams)
    
    // Controller entry point
    const controller = require('./src/controller');
    const res = await controller(bodyJSON);
    
    // Response
    context.succeed(res)
    // response.successWithPayload(callback, res);
  } catch (err) {
    response.failure(callback, err);
  }
};

const parseJSON = (body) => {
  let jsonBody
  // console.log(body)
  try {
    if (body && typeof body === "object") {
      jsonBody = body;
    } else if (body) {
      jsonBody = JSON.parse(body)
    }
  } catch (e) {
    console.log(e)
    console.log(body)
  }
  return jsonBody
}