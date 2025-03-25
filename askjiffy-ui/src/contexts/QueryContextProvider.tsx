"use client" //need to use client here because we are passing a class to children

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


interface Props{
    children: ReactNode
}

const queryClient = new QueryClient();

export const QueryContextProvider = ({children}:Props) => {
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
