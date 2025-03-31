"use client"

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

/* 
    this context is required in order to avoid defining every state in the 
    parent newChatPage and having to drill props ot the newChatPage's children 
*/

interface ChatProviderProps{
    children : ReactNode
}

// creating the context and passing in its initial values 
const ChatInputContext = createContext<{
    selectedVehicle: UserVehicle | null;
    setSelectedVehicle: Dispatch<SetStateAction<UserVehicle | null>>;
    inputText: string;
    setInputText: Dispatch<SetStateAction<string>>;
}>(
    {
        selectedVehicle: null,
        setSelectedVehicle:() => {},
        inputText: "",
        setInputText: () => '',
    }
);

// ChatInputProvider doesn't expect any props, except the children its warapping around
export const ChatInputProvider = ({children} : ChatProviderProps ) => {
    const [selectedVehicle,setSelectedVehicle] = useState<UserVehicle | null>(null);
    const [inputText,setInputText] = useState<string>("");

    return(
        <ChatInputContext.Provider value={{selectedVehicle, setSelectedVehicle, inputText, setInputText}}>
            {children}
        </ChatInputContext.Provider>
    );
}

export const UseChatInputContext = () => {
    return useContext(ChatInputContext)
}