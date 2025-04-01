import ProfileButton from "./ui/profileButton";
import ToggleTheme from "./ui/toggleTheme";


export default async function NavBar(){
    return(
        <nav className="w-full flex justify-between h-full max-h-[36px]">

                <h1>AskJiffy</h1>
                <ProfileButton />
                {/* <ToggleTheme /> */}
 
        </nav>
    )
}