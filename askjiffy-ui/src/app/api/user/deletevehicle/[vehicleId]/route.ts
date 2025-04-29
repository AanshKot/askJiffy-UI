import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: Request, { params }: { params: { vehicleId: number } }) : Promise<Response>{
    const secret = process.env.AUTH_SECRET
    const token = await getToken({req,secret});
    const { vehicleId } = await params;

    if(!token){
        return new Response("Unauthorized, no next auth session", { status: 401})
    }
    
    try{
        
        const res = await axios.delete(`${process.env.API_URL}/User/deletevehicle`, {
            params: {vehicleId: vehicleId},
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.idToken}`
            } 
        });
        
        return new Response(JSON.stringify(res.data), {status:200});
    }
    catch(error){
        console.error('Error saving vehicle:', error);
        
        if(axios.isAxiosError(error)){
            const status = error.response?.status;

            if(status == 401 || status == 403){
                return new Response("Unauthorized", {status});
            }

            return new Response("Internal Server Error", { status : 500});
        }

        //catch all for unknown errors 
        return new Response("Unexpected Error",{ status : 500});
    }   
}