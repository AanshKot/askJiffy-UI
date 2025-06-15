"use client"

import ChatInput from "./chatInput";
import ChatSection from "./chatSection";

interface ChatPageProps{
    chatSession: ChatSession
}

export default function ChatPage({chatSession}: ChatPageProps){

    return(
        <div id="chatSections" className="relative w-full h-[80%] overflow-auto mb-5 flex flex-col items-center">
            {
                chatSession?.chatMessages.map((chatMessage) => (
                    <ChatSection key={chatMessage.id} chatMessage = {chatMessage} />
                ))
            }
            <ChatInput/>
        </div>
    );
}