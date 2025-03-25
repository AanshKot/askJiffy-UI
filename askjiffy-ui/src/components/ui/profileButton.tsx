import { auth } from "@/lib/auth/authConfig";
import { Session } from "next-auth";
import { SignIn} from "../authComponents";
import ProfileDropdown from "./profileDropdown";


export default async function ProfileButton(){
    const session : Session | null = await auth();

    return(
        // <div className="ml-auto pr-3">
        <div className="pr-5">
            {!session?.user ? (<SignIn/>):
            (
                <ProfileDropdown imageUrl={session.user.image!} />
            )} 
        </div>
    );
}
