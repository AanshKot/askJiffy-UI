import axios from "axios";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request, { params }: { params: { chatSessionId: number } }) : Promise<Response>{
    const secret = process.env.AUTH_SECRET
    const token = await getToken({req,secret});
  
    if(!token){
        return new Response("Unauthorized, no next auth session", { status: 401})
    }
    
    try{
        const { chatSessionId } = await params;
        const requestBody = await req.json();

        //TypeScript's RequestInit type currently does not include duplex, which causes the type error.
        //But you must include duplex: 'half' at runtime when sending a body in Node.js to avoid a TypeError
        const init = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.idToken}`,
                'Content-Type': 'application/json' //axios automatically sets this header but with fetch you have to specify it
            },
            body: JSON.stringify(requestBody),
            duplex: 'half', //Node.js (18+) fetch supports duplex: 'half' for streamed requests.
        } as any; // TypeScript won't complain about duplex property not existing 

        const res = await fetch(`${process.env.API_URL}/Chat/${chatSessionId}/message`, init);
        const reader = res.body!.getReader();

        // pull(controller) - a method that when included is called repeatedly until the stream's internal queue is full
        // used to control the stream as more chunks are enqueued
        // can include the cancel method in the object to cancel the stream request (use the controller to close the stream)
        const stream = new ReadableStream({
            async pull(controller){
                const { done, value } = await reader.read();
                
                if (value){
                    controller.enqueue(value);
                }

                if(done){
                    controller.close();
                }

            }
        })

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain',
                'Transfer-Encoding': 'chunked'
            }
        })
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