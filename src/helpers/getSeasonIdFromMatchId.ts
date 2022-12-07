import { getMonthFromDate, getYearFromDate } from "./timeHelper";

export function getSeasonIdFromMatchId(matchId: number): string{
    var earlySeasonDateRange = [6, 12]
    var year = parseInt(`${matchId}`.slice(0,4));
    var month = parseInt(`${matchId}`.slice(4,6));
    if(earlySeasonDateRange[0] <= month && earlySeasonDateRange[1] >= month){
        return `${year}${year+1}`
    } else {
        return `${year-1}${year}`
    }
}