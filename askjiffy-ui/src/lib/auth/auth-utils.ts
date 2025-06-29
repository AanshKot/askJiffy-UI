import axios from "axios";
import { JWT } from "next-auth/jwt";

// API call to create a user profile doesn't have an effect on cached entity data is an action: 
// chose to not make it a custom hook that wraps a react-query hook, not retrieving anything just making a post request using the user email and provider to create a profile
// more info on decision: https://www.reddit.com/r/reactjs/comments/jd5oxu/does_reactquery_make_sense_in_an_auth_provider/
export async function createProfile(idToken: string) : Promise<boolean>{
    try {
        const res = await axios.post<boolean>(`${process.env.API_URL}/User/createprofile`, null,{
            headers:{
                Authorization: `Bearer ${idToken}`
            }
        })
        return res.data;
    } catch (error) {
        console.error("Error creating profile", error);
        return false;
    }
}

export async function checkProfileExists(idToken: string): Promise<boolean>{
    try {
        const res = await axios.get<boolean>(`${process.env.API_URL}/User/profileexists`, {
            headers:{
                Authorization: `Bearer ${idToken}`
            }
        })
        return res.data;
    } catch (error) {
        console.error("Error finding profile", error);
        return false;
    }
}

export async function refreshSecurityTokens(token : JWT) : Promise<JWT>{
    try {
        const urlSearchParams = new URLSearchParams({
            client_id: process.env.AUTH_GOOGLE_ID!,
            client_secret: process.env.AUTH_GOOGLE_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken!
        })

        //request new IdToken from googleapis token endpoint
        const url = "https://oauth2.googleapis.com/token"
        
        const response = await axios.post(url, urlSearchParams,{
            headers:{
               "Content-Type": "application/x-www-form-urlencoded" 
            }
        });
        
        const refreshedTokens = response.data;
        
        const newTokens = refreshedTokens as {
            access_token: string,
            id_token: string,
            expires_in: number,
            refresh_token?: string
        }

        return{
            ...token,
            accessToken: newTokens.access_token,
            idToken: newTokens.id_token,
            expiresAt: Math.floor(Date.now() / 1000 + newTokens.expires_in),
            // some providers only issue refresh tokens once, so preserve old one if didn't recieve new one
            refresh_token: newTokens.refresh_token ? newTokens.refresh_token : token.refreshToken
        }
    }
    catch(error){
        console.error("Error refreshing token", error);
        token.error = "RefreshTokenError"
        return token;
    }
}