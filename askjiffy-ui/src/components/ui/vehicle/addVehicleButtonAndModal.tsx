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
import { getTransmissionEnumValue } from "@/lib/utils"
import { useState } from "react"

const currentYear: number = new Date().getFullYear();

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
                                            <FormControl>
                                                <Input className="col-span-3 " placeholder="Manufacturer" {...field} required />
                                            </FormControl>
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
                                            <FormControl>
                                                <Input className="col-span-3 " placeholder="Model" {...field} required />
                                            </FormControl>
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
                                            <FormControl>
                                                <Input className="col-span-3 ml-2 " placeholder="Transmission" {...field} />
                                            </FormControl>
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