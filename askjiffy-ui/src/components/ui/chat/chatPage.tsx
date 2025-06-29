"use client"

import { useEffect, useRef, useState } from "react";
import ChatInput from "./chatInput";
import ChatSection from "./chatSection";
import { useQueryClient } from "@tanstack/react-query";
import { ActiveChatSection } from "./activeChatSection";
import { updateChatMessageHistory } from "@/lib/utils";
import { useStreamAnswer } from "@/hooks/useStreamAnswer";

interface ChatPageProps{
    chatSession: ChatSession
    newChat: boolean
}

//what am I trying to do?
// 1. the pendingChatMessageAtom is a derived atom of the chatMessageAtom
// 2. it should store the chatMessage that hasn't been answered 
// and when the answer is being streamed in fetchStream it should update the state its own attribute response atom
// why do I need the pendingChatMessageAtom? because when a new chat is created the starting message is still unanswered
// on chatSession page load I need to look at my backlog (pendingChatMessage) and set it to this unanswered chatMessage

/* 
but in the case that the pendingChatMessage response attribute is updating this doesn't trigger any rerenders
of the chatSection because the overarching chatMessageAtom hasn't updated
*/

export default function ChatPage({chatSession, newChat}: ChatPageProps){
    // manually call queryClient for invalidating stale queries after chatSession updates
    const queryClient = useQueryClient();
    const [chatMessageHistory, setChatMessageHistory] = useState<ChatMessage[]>(chatSession.chatMessages);
    const [pendingQuestion, setPendingQuestion] = useState<string>('');
    const [isNewChat, setIsNewChat] = useState<boolean>(newChat);
    
    //using ref to not cause rerenders, also want the newChatMessage to have "unique" id when optimistically updated
    const pendingChatMessageId = useRef<number>(-1); 
    
    // https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
    const hasRunRef = useRef<boolean>(false); //to stop the useEffect from running twice on mount

    const handleComplete = (initialQuestion: string, fullAnswer: string, messageId?: number) => {
        const newChatMessage: ChatMessage = {
            id: messageId ?? pendingChatMessageId.current,
            question: initialQuestion,
            response: fullAnswer
        }
        pendingChatMessageId.current = pendingChatMessageId.current - 1;
        setChatMessageHistory(prev => updateChatMessageHistory([...prev], newChatMessage));
        queryClient.invalidateQueries({ queryKey: ["useGetChats"] })
        setPendingQuestion('');
        setIsNewChat(false);
    }

    // don't need useEffects to handle user events 
    // messageId is passed in only when the starter chat needs to be answered
    // or when a user is editing an old chat
    const handleSubmit = async (inputText: string, messageId? : number) => {
        if(inputText.trim() === "") return;
        setPendingQuestion(inputText);
        fetchStream({id: messageId, questionText: inputText});
    }

    const { answerText, fetchStream } = useStreamAnswer({ chatSessionId: chatSession.id , onComplete: handleComplete })


    // this useEffect is necessary to answer the starter chat message
    useEffect(() => {
        const starterMessage = chatSession.chatMessages[0];

        //stream answer to initial question as a sideEffect of chat page load and newChat === true
        if(!hasRunRef.current && newChat && !starterMessage.response){
            hasRunRef.current = true;
            handleSubmit(starterMessage.question, starterMessage.id);
        }
    }, [newChat])

    // useState initializer runs only once when ChatPage mounts.
    // If chatSession.chatMessages changes later (because of a refetch), this does NOT reset or update the state.
    // chatPage component doesn't change because it doesn't detect a change to the underlying chatMessages
    useEffect(() => {
        if (chatSession.chatMessages && chatSession.chatMessages.length > 0) {
            setChatMessageHistory(chatSession.chatMessages);
        }
    }, [chatSession.chatMessages]);

    return(
        <div id="chatSections" className="relative w-full h-[80%] overflow-auto mb-5 flex flex-col items-center">
            {
                !isNewChat &&
                (
                    chatMessageHistory.map((chatMessage) => (
                        <ChatSection key={chatMessage.id} chatMessage = {chatMessage} />
                    ))
                )
            }
            
            {
                pendingQuestion && <ActiveChatSection questionText={pendingQuestion} answerText={answerText}/>
            }
            <ChatInput streamingAnswer={pendingQuestion ? true: false} selectedVehicleId={chatSession.vehicle.id} handleSubmit={handleSubmit}/>
        </div>
    );
}