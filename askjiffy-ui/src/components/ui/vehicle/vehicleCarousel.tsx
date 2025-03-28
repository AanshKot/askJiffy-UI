import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../carousel";
import VehicleCard from "./vehicleCard";


interface Props{
    vehicleList : UserVehicle[] | undefined
    //onClick change state of selected vehicle in parent component
}

export default function VehicleCarousel({vehicleList}:Props){

    //can configure to autoplay after some time of inactivity??
    return(
        <Carousel className="w-full max-w-[500px]">
            <CarouselContent className="carouselContent">
                
                    {vehicleList?.map(vehicle => (
                        <CarouselItem className="basis-1/2" key={vehicle.id}>
                            <VehicleCard vehicle={vehicle} />
                        </CarouselItem>
                    ))}
            
            </CarouselContent>
            <CarouselPrevious type="button" />
            <CarouselNext type="button"/>
        </Carousel>
    );
}