"use server" //defining a server action to pass data from client to server-side without using http  https://www.reddit.com/r/nextjs/comments/16k9gs6/server_actions_are_amazing/
import { signIn, signOut } from "@/lib/auth/authConfig"

//looks cleaner than inline use server 

export async function logout(){
    await signOut();
}

export async function login(){
    await signIn("google");
}