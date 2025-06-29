import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request, { params }: { params: { chatSessionId: number } }) : Promise<Response>{
    const secret = process.env.AUTH_SECRET
    const token = await getToken({req,secret});
  
    if(!token){
        return new Response("Unauthorized, no next auth session", { status: 401})
    }
    
    try{
        const { chatSessionId } = await params;

        const res = await axios.get(`${process.env.API_URL}/Chat/${chatSessionId}`,{
            headers:{
                Authorization: `Bearer ${token.idToken}`
            }
        });
        
        return new Response(JSON.stringify(res.data), {status:200});
    }
    catch(error){
        console.error('Error starting new chat:', error);

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