import { FileUp, ArrowUp } from "lucide-react"
import { Textarea } from "../textarea"
import { chatInputTextAtom, selectedVehicleAtom } from "@/contexts/atoms/ChatInputAtoms";
import { useAtom, useAtomValue } from "jotai";
import { cn } from "@/lib/utils";

interface InputFooterProps{
    inputText: string
    selectedVehicleId: number | null,
}

export default function ChatInput(){
    const [inputText, setInputText] = useAtom(chatInputTextAtom);
    const selectedVehicleId = useAtomValue(selectedVehicleAtom);

    return(
        <div id="chatInput" className="w-full h-[20%] max-w-3xl border border-solid rounded-lg shadow px-2">
            <form className="w-full h-full">
                <Textarea value = {inputText} onChange={(e) => setInputText(e.target.value)} className="flex px-0 h-[80%] outline-none focus:outline-none border-none focus:border-transparent focus-visible:ring-0 shadow-none align-top leading-none"/>
                <InputFooter inputText={inputText} selectedVehicleId={selectedVehicleId}/>
            </form>
        </div>
    ) 
}

function InputFooter({inputText, selectedVehicleId}:InputFooterProps){
    const disableButton = !selectedVehicleId || inputText.trim() === "";

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