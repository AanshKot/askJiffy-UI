import { FileUp, ArrowUp } from "lucide-react"
import { Textarea } from "../textarea"
import { cn } from "@/lib/utils";
import React, { useState } from "react";

//what if I pass the setStreamingAnswer and streamingAnswer bool state vars into the ChatInput that way if streamingAnswer is true 
// the chatPage component can render a new ChatSection 
interface ChatInputProps{
    streamingAnswer?: boolean
    selectedVehicleId?: number | null //provided by the chatSession (on chatPage) or the vehicle carousel select (on newChatPage)
    handleSubmit: (inputText: string) => void 
}
interface InputFooterProps{
    inputText: string
    selectedVehicleId?: number | null
    streamingAnswer?: boolean
}

//If I pass the queryClient into the functional component will it rerender every time the ChatInput component rerenders?
// will that cause any issues?
export default function ChatInput({streamingAnswer, selectedVehicleId, handleSubmit} : ChatInputProps){    
    const [inputText, setInputText] = useState<string>('');

    return(
        <div id="chatInput" className="sticky bottom-0 mt-2 bg-white w-[75%] h-[20%] max-w-3xl border border-solid rounded-lg shadow px-2 z-[10]">
            <form className="w-full h-full pb-2" onSubmit={(e) => {
                    e.preventDefault(); //prevents full page reload
                    handleSubmit(inputText);
                    setInputText('');
                }}>
                <Textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className="flex px-0 h-[80%] outline-none focus:outline-none border-none focus:border-transparent focus-visible:ring-0 shadow-none align-top leading-none"/>
                <InputFooter inputText={inputText} selectedVehicleId={selectedVehicleId} streamingAnswer={streamingAnswer}/>
            </form>
        </div>
    ) 
}

function InputFooter({inputText, selectedVehicleId, streamingAnswer}: InputFooterProps){
    const disableButton = !selectedVehicleId || inputText.trim() === "" || streamingAnswer;

    return(
        <div id="inputFooter" className="w-full h-full flex justify-between max-h-[35px]">
            <label>
                <button className="bg-transparent" type="button">
                    <FileUp className="w-5 h-5" />
                </button>
            </label>
            
            <label>
                <button type="submit" disabled={disableButton}>
                    <ArrowUp className={cn("w-5 h-5 transition-colors", disableButton ? "text-muted-foreground" : "text-primary")}/>
                </button>
            </label>
        </div>
    )
}