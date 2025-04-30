import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import AddVehicleCard from "./addVehicleCard"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Transmission } from "@/types/enums"
import { SaveVehicleMutation } from "@/lib/queries/user/useMutateVehicles"
import { cn, getTransmissionEnumValue } from "@/lib/utils"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../popover"
import { Check, ChevronsUpDown } from "lucide-react"
import carData from "@/lib/assets/carData"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../command"

const currentYear: number = new Date().getFullYear();
const manufacturers = Object.keys(carData);
const tranmissionSelect = ["Automatic", "Manual", "CVT"];

const formSchema = z.object({
    make: z.string().min(2, {
        message: "Must select a valid manufacturer.",
    }),
    model: z.string().min(2, {
        message: "Must select a valid model."
    }),
    year: z.coerce.number().gt(1961,{
        message: "Must input a year greater than 1961"
    }).lte(currentYear,{
        message: `Must input a year less than or equal to ${currentYear}`
    }),
    transmission: z.string().optional().refine(value => {
        if (value === undefined || value === "") return true; // If the value is an empty string, don't run the check.
        return Object.keys(Transmission).includes(value); // Check if the value is a key of the Transmission enum
    }, {
        message: "Must select a valid transmission (Automatic, Manual, CVT)."
    }),
    chassis: z.string().optional(),
    mileage: z.coerce.number().gte(0,{
        message: "Cannot have negative mileage."
    }).lt(999999,{
        message: "Mileage must be less than 999999 km"
    }).optional()
})

export default function AddVehicleButtonAndModal(){
    const {mutate:saveVehicle} = SaveVehicleMutation();

    //https://www.radix-ui.com/primitives/docs/components/dialog#close-after-asynchronous-form-submission
    const [open, setOpen] = useState<boolean>(false);
    const [models,setModels] = useState<string[]>([]);

    // 1. Define form with schema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange", // enable real-time validation tracking
        defaultValues: {
            make: "",
            model: "",
            year: 0,
            transmission: "",
            chassis: "",
            mileage: 0
        },
    })

    //2. Submit Handler
    function onSubmit(values: z.infer<typeof formSchema>){
        
        const newVehicle : Vehicle = {
            make: values.make,
            model: values.model,
            year: values.year,
            chassis: values.chassis,
            transmission: getTransmissionEnumValue(values.transmission),
            mileage: values.mileage
        }

        saveVehicle(newVehicle);
        setOpen(false);
    }

    // https://react-hook-form.com/docs/useform/watch
    const selectedMake = form.watch("make");
    const selectedModel = form.watch("model");
    const selectedTransmission = form.watch("transmission");

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <AddVehicleCard />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Add Vehicle
                        <DialogDescription>
                            Describe your vehicle here. Click save when you're done!
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                <div className="w-full flex items-center justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-2 w-[80%] items-center">
                                <FormField 
                                    control={form.control}
                                    name="make"
                                    render={({field}) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right mt-2">Make</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                        { selectedMake || "Select a manufacturer" }
                                                        <ChevronsUpDown className="opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent id="PopoverContent" className="w-[200px] p-0" >
                                                    <Command>
                                                        <CommandInput placeholder="Search Manufacturers" className="h-9" />
                                                        <CommandList>
                                                            
                                                            <CommandEmpty>
                                                                Couldn't find manufacturer.
                                                            </CommandEmpty>
                                                            
                                                            <CommandGroup>
                                                                {manufacturers.map((manufacturer) => (
                                                                    <CommandItem
                                                                        value={manufacturer}
                                                                        key={manufacturer}
                                                                        onSelect={() => {
                                                                            form.setValue("make", manufacturer);
                                                                            setModels(Object.keys(carData[manufacturer]));
                                                                            form.setValue("model", "");
                                                                        }}
                                                                    >
                                                                        {manufacturer}

                                                                        <Check 
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                manufacturer === field.value
                                                                                  ? "opacity-100"
                                                                                  : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="w-full col-span-3 m-0" />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name="model"
                                    render={({field}) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right mt-2">Model</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                            disabled={!selectedMake}
                                                        >
                                                            { selectedModel || "Select a model" }
                                                            <ChevronsUpDown className="opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0" >
                                                    <Command>
                                                        <CommandInput placeholder="Search Models" className="h-9" />
                                                        <CommandList>
                                                            
                                                            <CommandEmpty>
                                                                Couldn't find model.
                                                            </CommandEmpty>
                                                            
                                                            <CommandGroup>
                                                                {models.map((model) => (
                                                                    <CommandItem
                                                                        value={model}
                                                                        key={model}
                                                                        onSelect={() => {
                                                                            form.setValue("model", model)
                                                                        }}
                                                                    >
                                                                        {model}

                                                                        <Check 
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                model === field.value
                                                                                  ? "opacity-100"
                                                                                  : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="w-full col-span-3 m-0" />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name="year"
                                    render={({field}) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right mt-2">Year</FormLabel>
                                            <FormControl>
                                                <Input className="col-span-3 " placeholder="Year" {...field} required />
                                            </FormControl>
                                            <FormMessage className="w-full col-span-3 m-0" />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField 
                                    control={form.control}
                                    name="mileage"
                                    render={({field}) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right mt-2">Mileage</FormLabel>
                                            <FormControl>
                                                <Input className="col-span-3 " placeholder="Mileage" {...field} />
                                            </FormControl>
                                            <FormMessage className="w-full col-span-3 m-0" />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name="transmission"
                                    render={({field}) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right mt-2">Transmission</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "col-span-3 justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                { selectedTransmission || "Select transmission type" }
                                                                <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0" >
                                                        <Command>
                                                            <CommandInput placeholder="Search Transmission" className="h-9" />
                                                            <CommandList>
                                                                
                                                                <CommandEmpty>
                                                                    Couldn't find transmission type.
                                                                </CommandEmpty>
                                                                
                                                                <CommandGroup>
                                                                    {tranmissionSelect.map((transmission) => (
                                                                        <CommandItem
                                                                            value={transmission}
                                                                            key={transmission}
                                                                            onSelect={() => {
                                                                                form.setValue("transmission", transmission)
                                                                            }}
                                                                        >
                                                                            {transmission}

                                                                            <Check 
                                                                                className={cn(
                                                                                    "ml-auto",
                                                                                    transmission === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                </PopoverContent>
                                                </Popover>
                                            <FormMessage className="w-full col-span-3 m-0" />
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name="chassis"
                                    render={({field}) => (
                                        <FormItem className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right mt-2">Chassis</FormLabel>
                                            <FormControl>
                                                <Input className="col-span-3 " placeholder="Chassis" {...field} />
                                            </FormControl>
                                            <FormMessage className="w-full col-span-3 m-0" />
                                        </FormItem>
                                    )}
                                />
                            <div className="w-full flex justify-center pt-2" >
                                <Button type="submit" className="w-[50%]" disabled={!form.formState.isValid}>
                                    Save Vehicle
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}