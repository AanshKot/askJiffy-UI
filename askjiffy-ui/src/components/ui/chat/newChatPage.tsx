"use client"

import { useGetProfile } from "@/lib/queries/user/useGetProfile";
import ChatInput from "./chatInput";

export default function NewChatPage(){
    
    const {data:userProfile, isLoading, isError} = useGetProfile();
    console.log(userProfile);
    if(isError){
        return(
            <div>
                Unauthenticated
            </div>
        );
    }

    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        );
    }

    return(
        <div className="NewChatForm">
            <ul>
                {userProfile?.vehicles.map((vehicle,index) => (
                    <li key={index}>{vehicle.make}</li>
                ))}
            </ul>
            <ChatInput />
        </div>
    )
}