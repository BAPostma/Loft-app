import { Auth } from "aws-amplify";

export class Authentication {
    static async AwsCredentials() {
        return await Auth.currentUserCredentials();
    }

    static async userInformation() {
        // const poolUser = await Auth.currentUserPoolUser(); // contains .signInUserSession (Auth.currentSession())
        const userInfo = await Auth.currentUserInfo();
        return userInfo;
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
                return true;
            }
    
            const signInResult = await Auth.signIn({ username: username, password: password });
    
            if (signInResult.challengeName === "NEW_PASSWORD_REQUIRED") {
                console.log("Password update required, updating...");
                await Auth.completeNewPassword(signInResult, password);
            }
            
            const userInfo = await Auth.currentUserInfo();
            console.log(`User ${userInfo.username} signed in to AWS`);
            return true;
        } catch (err) {
            console.error("Failed to sign in to AWS: ", err);
            return err.message;
        }
    }

    static async signOut() {
        await Auth.signOut({ global: true });
        console.log("Singed out of AWS");
    }
}