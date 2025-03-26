import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) : Promise<Response>{
    //token is only sent with request if user is authenticated
    //https://next-auth.js.org/tutorials/securing-pages-and-api-routes#securing-api-routes

    const secret = process.env.AUTH_SECRET
    const token = await getToken({req,secret}); // token is only sent with requests if the request comes from the browser, if the request originates from the server, the server doesn't have browser context and as such cannot send the JWT
  
    if(!token){
        return new Response("Unauthorized", { status: 401})
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
        return new Response("Error fetching profile",{ status: 500});
    }
    

   
}