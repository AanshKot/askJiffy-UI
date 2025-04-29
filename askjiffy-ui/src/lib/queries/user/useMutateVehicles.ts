import { useToast } from "@/hooks/use-toast";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const addNewVehicle = (newVehicle: Vehicle):Promise<Vehicle> => axios.post("/api/user/savevehicle", newVehicle).then((response) => response.data);

const deleteExistingVehicle = (vehicleId: number): Promise<boolean> => axios.delete(`/api/user/deletevehicle/${vehicleId}`).then((response) => response.data);

export function SaveVehicleMutation(): UseMutationResult<Vehicle,Error,Vehicle, unknown>{
    // define queryClient in hook
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        //mutationKey NOT for caching or refetching, mutations are one-off actions, just for identifying the mutation in a debugging context
        mutationKey: ["saveVehicle"],
        mutationFn: addNewVehicle,
        //always refetch after error or success:
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['useGetVehicles'] }),
        onSuccess: () => {
            toast({title: `Successfully added Vehicle`})
        }, 
        onError: () => {
            toast({ title: "Error deleting Vehicle" });
        }
    });
}

//define update and delete mutations here as well
export function DeleteVehicleMutation(): UseMutationResult<boolean,Error,number,unknown>{
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationKey: ["deleteVehicle"],
        mutationFn: deleteExistingVehicle,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['useGetVehicles'] }),
        
        onSuccess: () => {
            toast({ title: "Successfully deleted Vehicle" });
          }, 
        onError: () => {
            toast({ title: "Error deleting Vehicle" });
          }
    });
}