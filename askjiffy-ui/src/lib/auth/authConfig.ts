import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import 'next-auth/jwt';
import { refreshSecurityTokens, createProfile, checkProfileExists } from "./auth-utils";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            //Google requires offline access type to provide a 'refresh_token'
            authorization: {params : {access_type: "offline", prompt: "consent"}}
        })
    ],
    session: {strategy : "jwt"},
    callbacks: {
        async jwt({token, account}){
            // on user signIn the IdToken is automatically refreshed, and the account param is passed to jwt callback
            if(account){
                let profileExists = await checkProfileExists(account.id_token!); 
    
                //want to create a profile on signUp or on subsequent logins if for some case the user profile wasn't created on signUp
                if(!profileExists)
                {
                    await createProfile(account.id_token!);
                }
                
                return{
                    ...token,
                    accessToken : account.access_token,
                    idToken : account.id_token,
                    refreshToken : account.refresh_token,
                    expiresAt : account.expires_at ?? Math.floor(Date.now() / 1000) + 3600 // timestamp representing when IdToken expires, current time timestamp + 1 hour
                }
            }
            
            //below runs whenever session is accessed (and user isn't logging in/signing up)
            
            else if( Date.now() < token.expiresAt! * 1000 ){
                return token;
            }

            else{
                //subsequent logins or session accesses but id_token and access_token has expired, try to refresh
                if(!token.refreshToken) throw new TypeError("Missing refresh_token");
                return await refreshSecurityTokens(token);              
            }
        },
        async session({session, token}){
            //make access token available in the session
            session.error = token.error
            return session;
        },
        //https://authjs.dev/reference/nextjs#authorized, this gets called by middleware, runs before every request to routehandler
        authorized: async ({auth}) => {
            // Logged in users are authenticated
            return !!auth //!!auth: double negation is a way to convert any value into a boolean. If auth exists, it returns true; otherwise, it returns false.
        }
    }
   

})

 //declare module to extend session interface
declare module "next-auth"{
    interface Session{
        accessToken?:string
        error?: "RefreshTokenError"
    }
}

// https://github.com/nextauthjs/next-auth/issues/9571
declare module "next-auth/jwt"{
    interface JWT {
        accessToken?: string
        idToken?: string
        refreshToken?: string
        expiresAt?: number
        error? : "RefreshTokenError"
    }
}

