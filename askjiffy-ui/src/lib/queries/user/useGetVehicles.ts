import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

//fetchVehicles returns a promise resolving to a list of user Vehicles, therefore don't have to use an async and await keyword here
//query function throws a rejected Promise, this error is persisted in the error state of the query
//is the token forwarded with this request? Yes cookie is automatically forwarded on browser request to server (Next.js app api) because they are on same domain 
const fetchVehicles = ():Promise<Vehicle[]> => axios.get("/api/user/getvehicles").then((response) => response.data);

//specify return type of hook: https://github.com/TanStack/query/discussions/929
export function useGetVehicles():UseQueryResult<Vehicle[],Error>{
    return useQuery({
        queryKey: ['useGetVehicles'],
        queryFn: fetchVehicles,
        retry:1
    });
}
