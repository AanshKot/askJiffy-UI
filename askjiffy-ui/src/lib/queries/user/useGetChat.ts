import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const fetchChat = (chatSessionId: number): Promise<ChatSession> =>
  axios.get(`/api/chat/${chatSessionId}/getchatsession`).then((response) => {
    const chat = response.data;
    return {
      ...chat,
      updatedAt: new Date(chat.updatedAt),
    };
});

//for individual chatSession
export function useGetChat(chatSessionId: number): UseQueryResult<ChatSession, Error>{
    return useQuery(
        {
            queryKey: ["useGetChat", chatSessionId],
            queryFn: () => fetchChat(chatSessionId),
            retry: 1
        }
    );
}