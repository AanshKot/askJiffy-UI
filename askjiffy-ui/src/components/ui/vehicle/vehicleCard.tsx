import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Trash2 } from "lucide-react"
import { Separator } from "../separator";

interface Props{
    vehicle : UserVehicle
}

export default function VehicleCard({vehicle}:Props){
    return(
    <Card key={vehicle.id} className="w-full justify-center items-center">
        <CardHeader>
            <CardTitle className="flex justify-center">
                {vehicle.make} {vehicle.model} - {vehicle.year}
            </CardTitle>
            <Separator />
        </CardHeader>
        
        <CardContent>
            <div id="vehicleButtons" className="flex flex-col gap-3">
                <Button type="button"> Select </Button>
                <Button type="button" variant="secondary"> Edit </Button>
                <Button type="button" variant="destructive"> Delete <Trash2/> </Button>
            </div>
        </CardContent>
        
    </Card>
    );
}