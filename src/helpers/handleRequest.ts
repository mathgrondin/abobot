import { NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

export async function handleRequest(response: NextApiResponse, apiFunction: () => Promise<void>) {
    try {
        return await apiFunction();
    } catch (error) {
        if (error instanceof ApiError) {
            const apiError = (error as ApiError);
            console.error(apiError.message);
            return response.status(apiError.statusCode).json({
                message: apiError.message
            });
        }
    }
}