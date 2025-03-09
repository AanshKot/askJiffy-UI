import { auth } from "@/lib/auth/authConfig";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { SignIn, SignOut } from "./authComponents";
import { Avatar, DropdownMenu } from "radix-ui";
import ProfileDropdown from "./ui/profileDropdown";


export default async function ProfileButton(){
    const session : Session | null = await auth();

    if(!session?.user) return ( <SignIn/> );

    return(
        <div className="flex">
            {/* <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <Button>
                        <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-[36px] h-[36px] rounded-full bg-black/30">
                            <Avatar.Image 
                                className="w-full h-full object-cover rounded-inherit"
                                src={session.user.image!}
                                alt="profile avatar"
                            />
                        </Avatar.Root>
                       
                    </Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content sideOffset={5}>
                        <DropdownMenu.Item>
                            <SignOut />
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root> */}
            
            <ProfileDropdown imageUrl={session.user.image!} />
        </div>
    );
}
