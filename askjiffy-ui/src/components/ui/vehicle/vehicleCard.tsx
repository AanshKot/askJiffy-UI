import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Trash2 } from "lucide-react"
import { Separator } from "../separator";
import { DeleteVehicleMutation } from "@/lib/queries/user/useMutateVehicles";
import { selectedVehicleAtom } from "@/contexts/atoms/ChatInputAtoms";
import { useAtom } from "jotai";

interface Props{
    vehicle : Vehicle
}

export default function VehicleCard({vehicle}:Props){
    const {mutate:deleteVehicle } = DeleteVehicleMutation();

    const [selectedVehicleId, setSelectedVehicleId] = useAtom(selectedVehicleAtom);

    const handleDeleteClick = (vehicleId:number) => {
        if(vehicleId == selectedVehicleId){
            setSelectedVehicleId(null);
        }
        
        deleteVehicle(vehicleId); //handles toast logic in here
    }

    return(
        <Card key={vehicle.id} className={`w-full h-full justify-center items-center ${selectedVehicleId === vehicle.id ? 'border-2 border-blue-500' : ''}`}>
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-center text-sm sm:text-lg">
                    {vehicle.make} {vehicle.model} - {vehicle.year}
                </CardTitle>
                <Separator />
            </CardHeader>
            
            <CardContent className="px-0 pb-0 w-full h-full max-h-[65%]">
                <div id="vehicleButtons" className="flex flex-col items-center gap-3 h-full w-full px-1">
                    <Button type="button" onClick={() => setSelectedVehicleId(vehicle.id!)} className="w-full h-full max-w-[136px] max-h-[22%]"> Select </Button>
                    <Button type="button" className="w-full h-full max-w-[136px] max-h-[22%]" variant="secondary" disabled={true}> Edit </Button>
                    <Button type="button" onClick={() => handleDeleteClick(vehicle.id!)} className="w-full h-full max-w-[136px] max-h-[22%]" variant="destructive"> Delete <Trash2/> </Button>
                </div>
            </CardContent>
            
        </Card>
    );
}