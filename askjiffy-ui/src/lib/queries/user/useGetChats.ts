import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

const fetchChats = ():Promise<ChatSessionHistory[]> => axios.get("/api/user/getchats").then(
    (response) => (
        response.data.map(
            (chat : any) => (
                {
                    ...chat,
                    updatedAt: new Date(chat.updatedAt)
                }
            )
        )
    )
);


export function useGetChats(): UseQueryResult<ChatSessionHistory[],Error> 
{
    return useQuery({
        queryKey: ['useGetChats'],
        queryFn: fetchChats,
        retry: 1
    });    
}