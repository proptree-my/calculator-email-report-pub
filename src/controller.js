var AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const controller = async (body) => {
  try {
    await sendMessage(body);
    return 'SUCCESS';
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const sendMessage = (body) => {
return new Promise((resolve, reject) => {
  const params = {
    MessageBody: JSON.stringify(body),
    QueueUrl: process.env.SQS_URL,
    /*{ MessageAttributes: {
      SomeAttr: {
        DataType: 'String',
        StringValue: 'cool beans'
      },
      OtherAttr: {
        DataType: 'String',
        StringValue: 'hey there good lookin'
      }
    } }*/
  }
  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("Error", err);
      reject(err)
    } else {
      console.log("Success", data.MessageId);
      resolve( data.MessageId)
    }
  });
})}

module.exports = controller;
