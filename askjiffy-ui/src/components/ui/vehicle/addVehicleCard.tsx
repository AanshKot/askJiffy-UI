import { Button } from "../button";
import { Card, CardContent } from "../card";
import { Plus} from "lucide-react"
//props n

export default function AddVehicleCard(){
 return(
    <Card className="w-full h-full border-2 border-dashed border-lightblue shadow-none focus:outline-none">
        <CardContent id="AddCardContent" className="p-0 flex items-center justify-center h-full">
            <Button type="button" className="p-0 h-auto bg-transparent border-none shadow-none focus:outline-none transition-colors duration-300" variant="outline">
                <Plus id="addIcon"  className="h-full min-w-[40px] min-h-[40px] transition-colors duration-300"/>
            </Button>
        </CardContent>
    </Card>
 );
}