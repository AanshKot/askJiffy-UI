import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    session: {strategy : "jwt"},
    callbacks: {
        //profile variable represents the user's profile info retrieved from OAuth provider
        jwt({token, account, profile}){
            if(account){
                token.accessToken = account.access_token
                token.idToken = account.id_token
            }
            return token;
        },
        async session({session, token}){
            //make access token available in the session
            if(token?.accessToken) session.accessToken = token.accessToken
            return session;
        }
    }
   

})

 //declare module to extend session interface
declare module "next-auth"{
    interface Session{
        accessToken?:string
    }
}

// https://github.com/nextauthjs/next-auth/issues/9571
declare module "next-auth/jwt"{
    interface JWT {
        accessToken?: string
        idToken?: string
    }
}

