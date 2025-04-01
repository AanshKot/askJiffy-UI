import { FileUp, ArrowUp } from "lucide-react"
import { Textarea } from "../textarea"
import { UseChatInputContext } from "@/contexts/ChatHistoryContext"

export default function ChatInput(){
    const { setInputText } = UseChatInputContext();

    return(
        <div id="chatInput" className="w-full h-[20%] max-w-3xl border border-solid rounded-lg shadow px-2">
            <Textarea onChange={(e) => setInputText(e.target.value)} className="flex px-0 h-[80%] outline-none focus:outline-none border-none focus:border-transparent focus-visible:ring-0 shadow-none align-top leading-none"/>
            <InputFooter/>
        </div>
    ) 
}

function InputFooter(){
    return(
        <div id="inputFooter" className="w-full h-full flex justify-between">
            <label>
                <button className="bg-transparent" type="button">
                    <FileUp className="w-5 h-5" />
                </button>
            </label>
            
            <label>
                <button type="submit">
                    <ArrowUp className="w-5 h-5" />
                </button>
            </label>
        </div>
    )
}