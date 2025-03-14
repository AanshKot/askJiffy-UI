import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    session: {strategy : "jwt"},
    callbacks: {
        jwt({token, account, profile,trigger}){
            if(account){
                token.accessToken = account.access_token
            }
            console.log(token);
            return token;
        },
        async session({session, token}){
            // if (token?.accessToken) session.accessToken = token.accessToken

            return session;
        }
    }
    //declare module to extend session interface
})

