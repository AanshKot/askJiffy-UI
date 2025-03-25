import axios from "axios";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";


export async function GET(req: Request) : Promise<Response>{
    //token is only sent with request if user is authenticated
    //https://next-auth.js.org/tutorials/securing-pages-and-api-routes#securing-api-routes
    const token = await getToken({req})
    
    if(!token){
        return new Response("Unauthorized", { status: 401})
    }
    
    const res = await axios.get(`${process.env.API_URL}/User/getprofile`,{
        headers:{
            Authorization: `Bearer ${token.idToken}`
        }
    });
    return new Response(res.data, {status:200});
}