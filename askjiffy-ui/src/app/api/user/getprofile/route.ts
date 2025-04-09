import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) : Promise<Response>{
    //token is only sent with request if user is authenticated
    //https://next-auth.js.org/tutorials/securing-pages-and-api-routes#securing-api-routes

    const secret = process.env.AUTH_SECRET
    const token = await getToken({req,secret}); // token is only sent with requests if the request comes from the browser, if the request originates from the server, the server doesn't have browser context and as such cannot send the JWT
  
    if(!token){
        return new Response("Unauthorized, no next auth session", { status: 401})
    }
    
    try{
        const res = await axios.get(`${process.env.API_URL}/User/getprofile`,{
            headers:{
                Authorization: `Bearer ${token.idToken}`
            }
        });
        
        //JSON.stringify ensures that the res.data object is serialized, this is necessary to map response to an api type
        return new Response(JSON.stringify(res.data), {status:200});
    }
    catch(error){
        console.error('Error fetching profile:', error);
        
        // when catching an error, Typescript doesn't know what the type of error is, error is unknown cannot access properties like .response or .status
        // axios.isAxiosError(error) narrows the type first
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