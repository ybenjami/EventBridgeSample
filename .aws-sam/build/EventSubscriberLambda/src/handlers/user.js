const AWS = require('aws-sdk');

const eventBridge = new AWS.EventBridge();

exports.userHandler = async (event) => {
  const userName = event.userName;
  const timestamp = new Date().toISOString();

  const eventData = {
    userName: "SOME NAME",
    timestamp: timestamp,
  };

  const params = {
    Entries: [
      {
        Detail: JSON.stringify(eventData),
        DetailType: 'User Event',
        Source: 'UserEventFunction',
        EventBusName: 'EnterpriseBus'
      }
    ]
  };

  try {
    const result = await eventBridge.putEvents(params).promise();
    console.log(`Successfully sent event to EventBridge with result: ${JSON.stringify(result)}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully sent event to EventBridge`,
      }),
    };
  } catch (error) {
    console.error(`Error sending event to EventBridge: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error sending event to EventBridge: ${error}`,
      }),
    };
  }
};