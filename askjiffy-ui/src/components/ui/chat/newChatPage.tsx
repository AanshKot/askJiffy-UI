"use client"

import { useGetProfile } from "@/lib/queries/user/useGetProfile";
import ChatInput from "./chatInput";
import VehicleCarousel from "../vehicle/vehicleCarousel";
import { useSession } from "next-auth/react";

export default function NewChatPage(){
    
    const {data : session} = useSession();
    const {data:userProfile, isLoading, isError} = useGetProfile();

    if(!session?.user){
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

    if(isError){
        return(
            <div>
                Handle Error...
            </div>
        );
    }
    
    return(
        <div className="NewChatForm w-full h-full flex items-center justify-center">
            
            <form className="w-full h-full max-h-[44rem] flex flex-col items-center justify-between">
                <VehicleCarousel vehicleList={userProfile?.vehicles} />

                <ChatInput />
            </form>
        </div>
    )
}