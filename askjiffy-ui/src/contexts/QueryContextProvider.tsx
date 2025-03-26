"use client" //need to use client here because we are passing a non-serialized class to children and we are using useState hook, also QueryClientProvider relies on useContext under the hood

import { isServer,QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";


interface Props{
    children: ReactNode
}


//NEVER DO THE COMMENTED CODE BELOW: https://tanstack.com/query/latest/docs/framework/react/guides/ssr
//https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#initial-setup

// const queryClient = new QueryClient(
//     {defaultOptions:{
//         queries:{
//             //with SSR we usually want to set a default stale time
//             //above 0 to avoid refetching immediately on client
//             staleTime: 60 * 1000,
//         }
// }});

/* 
This is because creating the queryClient at the root file level makes the cache shared.
Between all requests and means _all_ data gets passed to _all__ users
this is bad for performance and leaks any sensitive data
*/

function makeQueryClient(){
    return new QueryClient(
        {
            defaultOptions: {
              queries: {
                // With SSR want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
              },
            },
          }
    );
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(){
    if(isServer){
        return makeQueryClient(); //Server: always make a new query client
    }
    else{
        /*Browser: make a new query client if we don't already have one 
        this is important so we don't re-make a new client if React suspends during the initial render, may no tbe needed if we have a suspense boundary 
        BELOW the creation of the new query client
        */

        if(!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }

}

export const QueryContextProvider = ({children}:Props) => {
    /* NOTE: Avoid useState when initializing the query client if you don't
           have a suspense boundary between this and the code that may
           suspend because React will throw away the client on the initial
           render if it suspends and there is no boundary
    */

    const queryClient = getQueryClient();

    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
