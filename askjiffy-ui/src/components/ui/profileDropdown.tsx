"use client"

import { Avatar } from "radix-ui";
//can only call signOut using form action with inline "use server" in a server component
// can call logout server action because 
import { logout } from "@/actions/authActions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
interface ProfileDropdownProps{
    imageUrl : string

}


export default function ProfileDropdown({imageUrl} : ProfileDropdownProps){
   
    return(
        <DropdownMenu>
                <DropdownMenuTrigger>
                    
                        <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-[36px] h-[36px] rounded-full bg-black/30">
                            <Avatar.Image 
                                className="w-full h-full object-cover rounded-inherit"
                                src={imageUrl}
                                alt="profile avatar"
                            />
                        </Avatar.Root>
                        {/* <Avatar.Fallback className="" delayMs={600}>

                        </Avatar.Fallback> */}
                    
                </DropdownMenuTrigger>

               
                    <DropdownMenuContent className="ProfileDropdown" sideOffset={5}>
                        <DropdownMenuItem className="flex justify-center w-full">
                            <button className="text-black w-full hover:bg-accent " onClick={() => logout()}>Sign Out</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
        
        </DropdownMenu>
    );
}