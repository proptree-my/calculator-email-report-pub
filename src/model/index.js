const cache = require('@proptree/proptree-lib/lib/cache');
const moment = require('moment');

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();


const model = async (body) => {
  const id = uuidv4();
  const currentTime = moment().toISOString();

  var params = {
    TableName: 'proptree-report-list-dev',
    Item: {
      id,
      email:  body.email,
      report: body.report,
      isSubscribeNewsletter: body.isSubscribeNewsletter,
      created_on: currentTime,
    },
  };
  let response
  try {
    response = await documentClient.put(params).promise();
    if (body.isSubscribeNewsletter) {
      insertSubscription(body, currentTime);
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
  return response;
};

const insertSubscription = async (body, currentTime) => {
  const id = uuidv4();
  var params = {
    TableName: 'proptree-subscription-list-dev',
    // Item: {
    //   id: { S: id },
    //   email: { S: body.email },
    //   isActive: { BOOL: true },
    //   created_on: { S: currentTime },
    // },
    Item: {
      id,
      email: body.email,
      isActive: true,
      created_on: currentTime,
    },
  };

  try {
    const response = await documentClient.put(params).promise();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports.createReport = model;
