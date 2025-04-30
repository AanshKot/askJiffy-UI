"use client"

import ChatInput from "./chatInput";
import VehicleCarousel from "../vehicle/vehicleCarousel";

export default function NewChatPage(){
    return(
        <div className="NewChatForm w-[95%] h-full flex items-center justify-center">
            
            <div className="w-full h-full flex flex-col items-center justify-between">
                <VehicleCarousel />
                {/* <QuestionTypeSelect setQuestionType={setQuestionType}/> */}
                <ChatInput/>
            </div>
        </div>
    )
}