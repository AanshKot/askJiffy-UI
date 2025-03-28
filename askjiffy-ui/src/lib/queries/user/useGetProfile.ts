import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

//fetchUserProfile returns a promise resolving to a UserProfile, therefore don't have to use an async and await keyword here, will have to use it when calling the useGetProfile hook
//query function throws a rejected Promise, this error is persisted in the error state of the query
//is the token forwarded with this request? Yes cookie is automatically forwarded on browser request to server (Next.js app api) because they are on same domain 
const fetchUserProfile = ():Promise<UserProfile> => axios.get("/api/user/getprofile").then((response) => response.data);

//specify return type of hook: https://github.com/TanStack/query/discussions/929
export function useGetProfile():UseQueryResult<UserProfile,Error>{
    return useQuery({
        queryKey: ['useGetProfile'],
        queryFn: fetchUserProfile,
        retry:1
    });
}