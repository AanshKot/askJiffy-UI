"use client"

import ChatInput from "./chatInput";
import VehicleCarousel from "../vehicle/vehicleCarousel";
import { selectedVehicleAtom } from "@/contexts/atoms/ChatInputAtoms";
import { useAtom } from "jotai";
import { SaveChatMutation } from "@/lib/queries/user/useMutateChats";

export default function NewChatPage(){
    const [selectedVehicleId, setSelectedVehicleId] = useAtom(selectedVehicleAtom);
    const { mutate: createNewChat } = SaveChatMutation();

    //newChatPage handleSubmit should:
    //1. create a new chat using the backend endpoint
    //2. redirect to the new chat page (both are handled using the createNewChat endpoint)
    const handleSubmit = (inputText: string) => {
        if(!selectedVehicleId || inputText.trim() === "") return;

        const chatRequest: ChatRequest = {
            vehicleId: selectedVehicleId,
            initialQuestionText: inputText
        }
        setSelectedVehicleId(null);
        createNewChat(chatRequest);
    }

    return(
        <div className="NewChatForm w-[95%] h-full flex items-center justify-center">
            
            <div className="relative w-full h-full flex flex-col items-center justify-between">
                <VehicleCarousel />
                {/* <QuestionTypeSelect setQuestionType={setQuestionType}/> */}
                <ChatInput selectedVehicleId={selectedVehicleId} handleSubmit={handleSubmit}/>
            </div>
        </div>
    )
}