import { NextApiRequest } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

export const InvalidQuery_MissingQueryParam = (missingParam: string): ApiError => new ApiError(400, `Missing query parameter: ${missingParam}`);
export const InvalidQuery_UnexpectedParamValue = (value: string): ApiError => new ApiError(400, `Unexpected param value: ${value}`);

const HUB_MODE = 'hub.mode';
const HUB_VERIFY_TOKEN = 'hub.verify_token';
const HUB_CHALLENGE = 'hub.challenge';
const EXPECTED_HUB_MODE = 'subscribe';

/**
* @swagger
* /api/message:
*   get:
*     summary: messenger validation challenge
*     produces:
*       - application/json
*     responses:
*       200:
*         description: 
*/
export async function verificationChallenge(request: NextApiRequest): Promise<string> {
  const { query } = request;
  if (query == null) {
    throw InvalidQuery_MissingQueryParam(`${HUB_MODE} and ${HUB_VERIFY_TOKEN}`);
  }

  const mode = query[HUB_MODE];
  if (mode == null) {
    throw InvalidQuery_MissingQueryParam(HUB_MODE);
  }
    
  const token = query[HUB_VERIFY_TOKEN];
  if (token == null) {
    throw InvalidQuery_MissingQueryParam(HUB_VERIFY_TOKEN);
  }
    
  const challenge = request.query[HUB_CHALLENGE] as string;
  if (token == null) {
    throw InvalidQuery_MissingQueryParam(HUB_VERIFY_TOKEN);
  }

  if (mode !== EXPECTED_HUB_MODE) {
    throw InvalidQuery_UnexpectedParamValue(HUB_MODE);
  }
    
  if (token !== process.env.VERIFY_TOKEN) {
    throw InvalidQuery_UnexpectedParamValue(HUB_VERIFY_TOKEN);
  }
    
  return challenge;
}