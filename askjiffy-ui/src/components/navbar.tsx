import ProfileButton from "./profileButton";
import ToggleTheme from "./ui/toggleTheme";


export default async function NavBar(){
    return(
        <nav className="w-full flex max-h-[120px] items-center">
            <div className = "w-full max-h-[120px] flex items-center justify-between">
                <h1>AskJiffy</h1>
                <ProfileButton />
                <ToggleTheme />
            </div>
        </nav>
    )
}