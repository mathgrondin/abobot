export function getSeasonIdFromMatchId(matchId: number): string{
  const earlySeasonDateRange = [6, 12];
  const year = parseInt(`${matchId}`.slice(0,4));
  const month = parseInt(`${matchId}`.slice(4,6));
  if(earlySeasonDateRange[0] <= month && earlySeasonDateRange[1] >= month){
    return `${year}${year+1}`;
  } else {
    return `${year-1}${year}`;
  }
}