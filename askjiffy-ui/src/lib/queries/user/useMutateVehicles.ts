import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

const addNewVehicle = (newVehicle: Vehicle):Promise<Vehicle> => axios.post("/api/user/savevehicle", newVehicle).then((response) => response.data);

export function useSaveVehicle(): UseMutationResult<Vehicle,Error,Vehicle,unknown>{
    return useMutation({
        //NOT for caching or refetching, mutations are one-off actions, just for identifying the mutation in a debugging context
        mutationKey: ["saveVehicle"],
        mutationFn: addNewVehicle,
    });
}

//define update and delete mutations here as well