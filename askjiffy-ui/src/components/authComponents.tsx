import { signIn, signOut } from "@/lib/auth/authConfig";
import { Button } from "./ui/button";

//React.ComponentPropsWithRef<T> extracts all props of a given component and adds support for ref in the componenet if the componenets support forwarding refs, 
//the Button component that SignIn is compromised of forwards ref to the <button> JSX tag
export function SignIn({provider, ...props} : {provider?:string} & React.ComponentPropsWithRef<typeof Button >){
    return(
        <form action={
            async () => {
                //in callback as without it the form action will call on render
                //server action
                "use server"
                await signIn("Google");     
            }
        }>
            <Button className="bg-black text-white rounded-lg" type="submit" {...props}>Sign In</Button> 
        </form>
    )
}

export function SignOut({...props} : React.ComponentPropsWithRef<typeof Button>){
    return(
        <form action={
            async () => {
                "use server"
                await signOut();
            }
        }>
            <Button variant="ghost" className="w-full" {...props}>Sign Out</Button>
        </form>
    )
}