import { Amplify } from "aws-amplify";
import { BrowserStorage, ISettings } from "./clients/BrowserStorage";

export function ConfigureSDK(): void {
    const raw = BrowserStorage.getSettings() as Partial<ISettings> | undefined;
    if (!raw) {
        console.warn("Amplify not configured: no settings in localStorage yet");
        return;
    }

    const { region, userPoolId, userPoolWebClientId, identityPoolId } = raw;

    if (!region || !userPoolId || !userPoolWebClientId || !identityPoolId) {
        console.warn("Amplify not configured: missing region/userPoolId/userPoolWebClientId/identityPoolId");
        return;
    }

    const config: any = {
        region,
        userPoolId,
        userPoolClientId: userPoolWebClientId,
        identityPoolId: identityPoolId,
        loginWith: {
            username: true,
            email: false
        },
        authenticationFlowType: 'USER_SRP_AUTH'
    };

    Amplify.configure({ Auth: { Cognito: config } });
}
