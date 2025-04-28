"use client"

import { useGetProfile } from "@/lib/queries/user/useGetProfile";
import ChatInput from "./chatInput";
import VehicleCarousel from "../vehicle/vehicleCarousel";
import { useSession } from "next-auth/react";
import { UseChatInputContext } from "@/contexts/ChatHistoryContext";

export default function NewChatPage(){
    
    const {data : session} = useSession();
   

    /*
        using React context to avoid defining states here, cleaner + avoids having to drill 
        event handler props through the Vehicle Carousel component and into the Vehicle Card components
    */
    const { inputText, selectedVehicle } = UseChatInputContext();

  
    return(
        <div className="NewChatForm w-[95%] h-full flex items-center justify-center">
            
            <form className="w-full h-full flex flex-col items-center justify-between">
                <VehicleCarousel />
                {/* <QuestionTypeSelect setQuestionType={setQuestionType}/> */}
                <ChatInput/>
            </form>
        </div>
    )
}