import { activeChatSessionAtom } from "@/contexts/atoms/ChatSessionAtom";
import { useToast } from "@/hooks/use-toast";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

const addNewChat = (newChatRequest: ChatRequest):Promise<ChatSession> => axios.post("/api/chat/new", newChatRequest).then((response) => response.data);

// TData is the type of data returned on success from the mutation
// TError the type of error thrown on failure
// TVariables the type of variables passed into mutation function
// TContext: type of context returned from the onMutation function used for optimistic updates + rollbacks
export function SaveChatMutation() : UseMutationResult<ChatSession,Error, ChatRequest, unknown>{
    const queryClient = useQueryClient();
    const router = useRouter();
    const { toast } = useToast();
    const setActiveChatSession = useSetAtom(activeChatSessionAtom);

    return useMutation({
        mutationKey: ["newChat"],
        mutationFn: addNewChat,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['useGetChats'] }),
        onSuccess: (chatSession) => {
            setActiveChatSession(chatSession); 
            router.push(`/chat/${chatSession.id}`);
            toast({title: `Successfully started chat`, variant:"success"});
        }, 
        onError: () => {
            toast({ title: "Error starting chat", variant:"destructive" });
        }
    });
}

