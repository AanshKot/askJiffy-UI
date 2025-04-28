import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Trash2 } from "lucide-react"
import { Separator } from "../separator";

interface Props{
    vehicle : Vehicle
}

export default function VehicleCard({vehicle}:Props){
    return(
    <Card key={vehicle.id} className="w-full h-full justify-center items-center">
        <CardHeader className="pb-2">
            <CardTitle className="flex justify-center text-sm sm:text-lg">
                {vehicle.make} {vehicle.model} - {vehicle.year}
            </CardTitle>
            <Separator />
        </CardHeader>
        
        <CardContent className="px-0 pb-0 w-full h-full max-h-[65%]">
            <div id="vehicleButtons" className="flex flex-col items-center gap-3 h-full w-full px-1">
                <Button type="button" className="w-full h-full max-w-[136px] max-h-[22%]"> Select </Button>
                <Button type="button" className="w-full h-full max-w-[136px] max-h-[22%]" variant="secondary"> Edit </Button>
                <Button type="button" className="w-full h-full max-w-[136px] max-h-[22%]" variant="destructive"> Delete <Trash2/> </Button>
            </div>
        </CardContent>
        
    </Card>
    );
}