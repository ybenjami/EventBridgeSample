const AWS = require('aws-sdk');

const ses = new AWS.SES();

exports.handler = async (event) => {
  console.log('****STart');
  console.log(event.detail);
  
  const emailParams = {
    Destination: {
      ToAddresses: ['ybenjami@gmail.com'],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `User generated an event at.`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Event Notification',
      },
    },
    Source: 'ybenjami@gmail.com',
  };

  try {
    const result = await ses.sendEmail(emailParams).promise();
    console.log(`Successfully sent email with result: ${JSON.stringify(result)}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Successfully sent email`,
      }),
    };
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error sending email: ${error}`,
      }),
    };
  }
};