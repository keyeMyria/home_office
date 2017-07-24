const AWS = require('aws-sdk');
const uuid = require('uuid');

const REGION = 'us-east-1';
const IDENTITY_POOL_ID = 'us-east-1:4ee00cb4-9d9b-49e3-b9d1-eabbd931d533';
const APPLICATION_ARN = 'arn:aws:sns:us-east-1:234924483865:app/GCM/Educarebox-gcm';

AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID,
});

const TOKEN =
    'd3Baw6YwGNc:APA91bECIV4Gh1ymSexZFlOAe7PX1F0YzgUHkza_6imI9gc2V6OdzhdNf-BhU5cYUwXvUHKgG8Tn0Nz-yqkWLCjdFahzFIPNSvZPDfXeySCo_dnMXJ-XNUVIByVLo6U9EJlHh7W4NI0G';

const sns = new AWS.SNS({ region: REGION });

const params = {
    PlatformApplicationArn: APPLICATION_ARN,
    Token: uuid(),
    Attributes: {
        Token: TOKEN,
        CustomUserData:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et amet officia, reiciendis tempore, est obcaecati dicta voluptate quia molestias id nostrum voluptatibus vel fugit dolores, aperiam possimus perspiciatis odio commodi.',
    },
    CustomUserData: 'TESTE',
};
sns.createPlatformEndpoint(params, (err, data) => {
    if (err) {
        console.log(err, err.stack);
    } else console.log(data); // an error occurred // successful response
});
