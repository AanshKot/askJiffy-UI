import { Button } from "../button";
import { Input } from "../input";
import { FileUp, ArrowUp } from "lucide-react"

export default function ChatInput(){
    return(
        <div id="chatInput" className="w-full">
            <Input />
            <InputFooter/>
        </div>
    ) 
}

function InputFooter(){
    return(
        <div id="inputFooter" className="w-full flex">
            <label>
                <Button asChild variant = "outline" type="button">
                    <FileUp className="w-7 h-7" />
                </Button>
            </label>
            
            <label>
                <Button asChild type="submit">
                    <ArrowUp className="w-7 h-7" />
                </Button>
            </label>
        </div>
    )
}