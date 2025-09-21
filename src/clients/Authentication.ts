import { signIn, signOut, getCurrentUser, fetchAuthSession, confirmSignIn } from "aws-amplify/auth";

export class Authentication {
    static async AwsCredentials() {
        const { credentials } = await fetchAuthSession();
        return credentials;
    }

    static async userInformation() {
        try {
            const user = await getCurrentUser();
            return { username: user.username, userId: user.userId, signInDetails: user.signInDetails };
        } catch {
            return null;
        }
    }

    static async isSignedIn() {
        try {
            await getCurrentUser();
            return true;
        } catch {
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
            const result = await signIn({ username, password });
            if (result.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                console.log("Password update required, updating...");
                await confirmSignIn({ challengeResponse: password });
            }
            
            const user = await getCurrentUser();
            console.log(`User ${user.username} signed in to AWS`);
            return true;
        } catch (err:any) {
            console.error("Failed to sign in to AWS: ", err);
            return err?.message || 'Sign-in failed';
        }
    }

    static async signOut() {
        try {
            await signOut();
            console.log("Signed out of AWS");
        } catch(err) {
            console.error(err);
        }
    }
}