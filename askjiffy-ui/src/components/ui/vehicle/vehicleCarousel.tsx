import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../carousel";
import AddVehicleCard from "./addVehicleCard";
import VehicleCard from "./vehicleCard";



interface Props{
    vehicleList : UserVehicle[] | undefined
}

export default function VehicleCarousel({vehicleList}:Props){

    //can configure to autoplay after some time of inactivity??
    return(
        <div className="w-full h-full max-w-[500px] max-h-[250px] flex flex-col items-center gap-3">
            <h1 className="sm:text-xl">Select a Vehicle</h1>
            <Carousel className="w-full h-full">
                <CarouselContent className="carouselContent flex items-center w-full h-[95%] gap-5">
                        <CarouselItem className="basis-1/3 h-[33.3333%] max-w-[70px] max-h-[70px] addVehicleCarouselItem">
                            <AddVehicleCard />
                        </CarouselItem>


                        {vehicleList?.map(vehicle => (
                            <CarouselItem className="min-w-[165px] basis-1/2 h-full" key={vehicle.id}>
                                <VehicleCard vehicle={vehicle} />
                            </CarouselItem>
                        ))}
                
                </CarouselContent>
                <CarouselPrevious type="button" />
                <CarouselNext type="button"/>
            </Carousel>
        </div>
    );
}