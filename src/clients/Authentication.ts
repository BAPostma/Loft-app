import { Auth } from "aws-amplify";

export class Authentication {
    static async AwsCredentials() {
        return await Auth.currentUserCredentials();
    }

    static async isSignedIn() {
        try {
            await Auth.currentAuthenticatedUser();
            return true;
        } catch (err) {
            return false;
        }
    }

    static async signIn(username: string, password: string) {
        try {
            console.log("Signing in to AWS...");
    
            if (await this.isSignedIn()) {
                console.log("User already signed in");
                return;
            }
    
            const signInResult = await Auth.signIn({ username: username, password: password });
    
            if (signInResult.challengeName === "NEW_PASSWORD_REQUIRED") {
                await Auth.completeNewPassword(signInResult, password);
            }
            
            // const poolUser = await Auth.currentUserPoolUser(); // contains .signInUserSession (Auth.currentSession())
            // const userInfo = await Auth.currentUserInfo(); // keep for .username
            // console.log(poolUser);
            // console.log(userInfo);
    
        } catch (err) {
            console.error("Failed to sign in to AWS: ", err);
        }
    }

    static async signOut() {
        await Auth.signOut({ global: true });
        console.log("Singed out of AWS");
    }
}