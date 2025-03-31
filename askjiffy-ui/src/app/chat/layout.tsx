import { ChatInputProvider } from "@/contexts/ChatHistoryContext";

export default async function ChatLayout({children} : Readonly<{
    children: React.ReactNode;
  }>){
    return(
        <ChatInputProvider>
            {children}
        </ChatInputProvider>
    );
}