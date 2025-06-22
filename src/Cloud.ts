import { Amplify } from "aws-amplify";
import { BrowserStorage } from "./clients/BrowserStorage";

export function ConfigureSDK() {
    const { region, identityPoolId, userPoolId, userPoolWebClientId } = BrowserStorage.getSettings();
    Config.Auth.region = region;
    Config.Auth.identityPoolId = identityPoolId;
    Config.Auth.userPoolId = userPoolId;
    Config.Auth.userPoolWebClientId = userPoolWebClientId;

    Amplify.configure(Config);
}

export const Config = {
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: '',
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: '',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: '',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'eu-west-1',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.yourdomain.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - Cookie secure flag
        // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_SRP_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

        // OPTIONAL - Hosted UI configuration
        // oauth: {
        //     domain: '',
        //     scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        //     redirectSignIn: '',
        //     redirectSignOut: '',
        //     responseType: 'code' // or 'code', note that REFRESH token will only be generated when the responseType is code
        // }
    }
};
