import { ApiError } from 'next/dist/server/api-utils';

const SeasonRequestError_InvalidSeasonId = () => new ApiError(400, 'Invalid season id. Must be in the following format: YYYYYYYY (ex: 20222023)');
const SeasonRequestError_YearsAreNotConsecutives = () => new ApiError(400, 'Invalid season id. Years must be consecutive (ex: 20222023)');

export function validateNewSeasonId(seasonId: string){
  const isValid = seasonId.match(/^[0-9]{8}$/);
  if (!isValid) {
    throw SeasonRequestError_InvalidSeasonId();
  }

  const isConsecutive = parseInt(seasonId.slice(4, 8)) - parseInt(seasonId.slice(0, 4)) == 1;
  if (!isConsecutive) {
    throw SeasonRequestError_YearsAreNotConsecutives();
  }
}