import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    session: {strategy : "jwt"},
    callbacks: {
        jwt({token, account, profile,trigger}){
            if(account){
                token.accessToken = account.access_token
            }
            console.log(token);
            //add call to fetch user profile here? or just create a separate hook that takes the session.access token and gets the user profile
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
    }
}

