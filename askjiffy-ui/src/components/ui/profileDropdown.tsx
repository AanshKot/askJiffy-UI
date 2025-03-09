"use client"

import { Avatar, DropdownMenu } from "radix-ui";
import { Button } from "./button";
//can only call signOut using form action with inline "use server" in a server component
// can call logout server action because 
import { logout } from "@/actions/authActions";

interface ProfileDropdownProps{
    imageUrl : string

}

export default function ProfileDropdown({imageUrl} : ProfileDropdownProps){
    return(
        <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <Button>
                        <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-[36px] h-[36px] rounded-full bg-black/30">
                            <Avatar.Image 
                                className="w-full h-full object-cover rounded-inherit"
                                src={imageUrl}
                                alt="profile avatar"
                            />
                        </Avatar.Root>
                        {/* <Avatar.Fallback className="" delayMs={600}>

                        </Avatar.Fallback> */}
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content className="ProfileDropdown" sideOffset={5}>
                        <DropdownMenu.Item className="flex justify-center w-full">
                            <button className="text-black w-full hover:bg-accent " onClick={() => logout()}>Sign Out</button>
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}