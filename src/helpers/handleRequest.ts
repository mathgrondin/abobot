import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

export async function handleRequest(response: NextApiResponse, apiFunction: () => Promise<void>){
    try{
        console.log("running api function")
        return await apiFunction();
    }catch(error){
        console.log("Caugth exception!")
        if(error instanceof ApiError){
            const apiError = (error as ApiError)
            console.error(apiError.message);
            return response.status(apiError.statusCode).json({
                message: apiError.message
            });
        }
    }
}