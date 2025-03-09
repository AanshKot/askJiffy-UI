"use client"
import clsx from "clsx";
import { Moon, Sun } from "feather-icons-react";
import { useTheme } from "next-themes";
import { Switch } from "radix-ui";
import { useEffect, useState } from "react";


export default function ToggleTheme(){
    /*u
    useTheme uses localStorage and interacts with browser API's local storage but since client component runs once on the server before rendering on the browser
    localStorage is undefined, since server cant interact with browser API. so server pre renders with theme==undefined. React expects there to be a Moon due to condition below
    but on screen there is the Sun on first browser render 
    */ 
    const {theme, setTheme} = useTheme()
    const [mounted,setMounted] = useState<boolean>(false);

    const handleToggle = (checked : boolean) => {
       if(checked){
        setTheme('dark')
       }
       else{
        setTheme('light')
       }
    }

    //useEffect only called on component mount, with empty dependency array
    useEffect(() => {
        setMounted(true)
    },[]);

    if(!mounted){
        return null;
    }

    return(
        <div className="flex items-center">
           <Switch.Root
                id="theme-switch"
                checked={theme === 'dark'}
                onCheckedChange={handleToggle}
                className={
                    clsx(
                        "SwitchRoot",
                        "data-[state=unchecked]:bg-[#1E1E1E]",
                        "data-[state=checked]:bg-white"
                      )
                }
            >
                {/* Thumb of switch with icons inside */}
                <Switch.Thumb
                    className="SwitchThumb"
                    style={{
                        display: 'flex',
                        justifyContent: theme === "light" ? 'flex-start' : 'flex-end', //Moves thumb based on theme
                        alignItems: 'center',
                        padding: '2px'
                    }}
                >
                    {theme === "light" ? (
                        <Sun size={24} color="white"/>
                    ) : (
                        <Moon size={24} color="black"/>
                    )}
                </Switch.Thumb>
           </Switch.Root>
        </div>
    );
}