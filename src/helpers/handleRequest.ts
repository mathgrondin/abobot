import { NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

export async function handleRequest(response: NextApiResponse, apiFunction: () => Promise<void>) {
  try {
    return await apiFunction();
  } catch (error) {
    if (error instanceof ApiError) {
      const apiError = (error as ApiError);
      console.error(apiError.message);
      return response.status(200).json({
        message: apiError.statusCode + ' - ' + apiError.message
      });
    }
  }
}