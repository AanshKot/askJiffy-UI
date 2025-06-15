"use client"
import ChatPage from "@/components/ui/chat/chatPage";
import { useGetChat } from "@/lib/queries/user/useGetChat";
import { useParams } from "next/navigation";

export default function ChatSessionPage(){
    const params = useParams<{ chatSessionId: string }>()
    const {data: chatSession, isLoading, isError} = useGetChat(parseInt(params.chatSessionId));
    console.log(chatSession);
    if (isLoading) {
        return "Loading...";
    }

    if (isError || !chatSession) {
        return "No Chat Session Found...";
    }
    
    return(
        <div id="ChatPage" className="bg-red-200 flex items-center justify-center h-full w-full px-5">
           <ChatPage chatSession={chatSession} /> 
        </div>
    );
}