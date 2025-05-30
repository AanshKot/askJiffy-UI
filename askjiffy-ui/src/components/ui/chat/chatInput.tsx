import { FileUp, ArrowUp } from "lucide-react"
import { Textarea } from "../textarea"
import { chatInputTextAtom, selectedVehicleAtom } from "@/contexts/atoms/ChatInputAtoms";
import { useAtom, useAtomValue } from "jotai";
import { cn } from "@/lib/utils";
import { SaveChatMutation } from "@/lib/queries/user/useMutateChats";
import { useParams } from "next/navigation";

interface InputFooterProps{
    inputText: string
    selectedVehicleId: number | null,
}

export default function ChatInput(){
    const [inputText, setInputText] = useAtom(chatInputTextAtom);
    const selectedVehicleId = useAtomValue(selectedVehicleAtom);
    const { chatSessionId } = useParams();
    
    const { mutate: createNewChat } = SaveChatMutation();

    const handleSubmit = () => {
        //no path params means creating a new chat rather than messaging in a existing one

        if(!chatSessionId){
            if (!selectedVehicleId || inputText.trim() === "") return;

            const chatRequest: ChatRequest =  {
                vehicleId: selectedVehicleId,
                initialQuestionText: inputText
            }

            createNewChat(chatRequest);
            //redirect to the created chat page after this post request completes
        }else{
            const chatId = Number(chatSessionId);
            
            const newChatMessage: NewMessage = {
                //TODO figure out how to include chatMessageId here in the case the user is editing an old chat
                questionText: inputText
            }

            //TODO stream back answer here add a query hook 
        }
    }

    return(
        <div id="chatInput" className="w-full h-[20%] max-w-3xl border border-solid rounded-lg shadow px-2">
            <form className="w-full h-full" onSubmit={(e) => {
                    e.preventDefault(); //prevents full page reload
                    handleSubmit();
                }}>
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