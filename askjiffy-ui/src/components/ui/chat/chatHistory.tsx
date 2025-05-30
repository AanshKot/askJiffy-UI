"use client"

import { useGetChats } from "@/lib/queries/user/useGetChats";
import { Separator } from "../separator";
import { useAtomValue } from "jotai";
import { activeChatSessionAtom } from "@/contexts/atoms/ChatSessionAtom";
import { cn } from "@/lib/utils";


function cleanTitle(title: string){
    const cleanTitle = title.replace(/[^a-zA-Z0-9 - $]/g, '');
    return cleanTitle;
}

function categorizeChatSessions(
    sessions: ChatSessionHistory[] | undefined
): Record<string, ChatSessionHistory[]> {
    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    //set bounds for start and end of yesterday
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(startOfToday.getDate() - 6); //includes today as day 0

    const categorized: Record<string, ChatSessionHistory[]> = {
        "Today": [],
        "Yesterday": [],
        "Last 7 Days": [],
        "A Long Time Ago": [],
    };

    sessions?.forEach(
        (chatSessionHistory) => {
            const lastUpdated = chatSessionHistory.updatedAt;

            if (lastUpdated >= startOfToday){
                categorized["Today"].push(chatSessionHistory);
            }else if(lastUpdated >= startOfYesterday && lastUpdated <= endOfYesterday){
                categorized["Yesterday"].push(chatSessionHistory);
            }else if( lastUpdated >= sevenDaysAgo){
                categorized["Last 7 Days"].push(chatSessionHistory);
            }else{
                categorized["A Long Time Ago"].push(chatSessionHistory);
            }
    })
    
    return categorized;
}

export default function ChatHistory(){
    const {data: chatSessionHistory, isLoading, isError, error} = useGetChats();
    const activeChatSession = useAtomValue(activeChatSessionAtom);
    
    if(isError){
        return(
            <div>Error: {error.message}</div>
        )
    }

    if(isLoading){
        return(
            <div>Loading...</div>
        )
    }

    const dateSortedChats = categorizeChatSessions(chatSessionHistory);

    return(
            <div className="px-4 py-2 h-full max-h-[650px] w-full rounded-md border overflow-y-auto">
               {
                    Object.entries(dateSortedChats).map(
                        ([category, chatSessions]) => (
                            <div key={`${category}-container`} className="h-full w-full">
                                <h4 key={`${category}-header`} className="font-medium text-xs mb-2">{category}</h4>
                                <div className="h-full max-h-[125px] overflow-y-auto mb-2 overflow-hidden " data-testid = {`${category}-container`} key={`${category}-container`}> 
                                    <ul className="w-full h-full">
                                        {
                                            chatSessions.map((chat) => (
                                                <li key={chat.id} className={cn("my-2 hover:bg-gray-200 w-full rounded-md px-2 pt-1",
                                                    activeChatSession?.id === chat.id ? "bg-gray-200" : ""
                                                )}>
                                                    {/* TODO: onClick handler */}
                                                    <button type="submit" className="text-xs text-left rounded-md">
                                                        {
                                                            cleanTitle(chat.title)
                                                        }
                                                    </button>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <Separator className="my-2"/>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
    )
}