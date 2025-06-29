import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transmission } from "@/types/enums"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTransmissionEnumValue = (transmission: string | undefined): Transmission | null => {
  if (!transmission) {
    return null;
  }

  switch (transmission) {
    case "Automatic":
      return Transmission.Automatic;
    case "Manual":
      return Transmission.Manual;
    case "CVT":
      return Transmission.CVT;
    default:
      return null; // Handle invalid transmission
  }
};


export const updateChatMessageHistory = (chatMessageHistory: ChatMessage[], newChatMessage: ChatMessage) => {
  const foundMessageIndex = chatMessageHistory.findIndex((message) => {return message.id === newChatMessage?.id});          
  // in the case that the pendingChat message is in response to the start message
  // optimistically update the chatMessage
  if (foundMessageIndex !== -1) {
    chatMessageHistory[foundMessageIndex].response = newChatMessage.response;
  } 
  else {
    chatMessageHistory.push(newChatMessage);
  }

  return chatMessageHistory;
}