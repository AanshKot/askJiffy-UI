import { Input } from "../input";
import { FileUp, ArrowUp } from "lucide-react"

export default function ChatInput(){
    return(
        <div id="chatInput" className="w-full max-w-3xl border border-solid rounded-lg shadow px-2">
            <Input className="px-0 outline-none focus:outline-none border-none focus:border-transparent focus-visible:ring-0 shadow-none"/>
            <InputFooter/>
        </div>
    ) 
}

function InputFooter(){
    return(
        <div id="inputFooter" className="w-full flex justify-between">
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