import { getMonthFromDate, getYearFromDate } from "../../helpers/timeHelper";

function getSeasonIdFromDate(date: number): string{
    var earlySeasonDateRange = [6, 11]
    var month = getMonthFromDate(date);
    var year = getYearFromDate(date);
    if(earlySeasonDateRange[0] <= month && earlySeasonDateRange[1] >= month){
        return `${year}${year+1}`
    } else {
        return `${year-1}${year}`
    }
}

export function getMatch(matchId: number){
    var season = getSeasonIdFromDate(matchId);
    // wip
}
