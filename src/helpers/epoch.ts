export function isEpochToday(matchId) {
    //const date = new Date(epoch)
    const nowEpoch = epochToday()
    if (matchId == nowEpoch) {
        return true
    }
    return false

}

export function epochToday() : string {
    //current match id
    const now = new Date;
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0)
    const nowEpoch = now.getTime()

    return nowEpoch.toString()
}

export function getCurrentSeasonId() : string {
    //season begins in september
    let currentSeasonId : string = ""
    const now = new Date
    const month = now.getMonth()
    const year = now.getFullYear()
    // between january and august
    if (month >= 0 && month <= 7 ) {
        currentSeasonId = `${year-1}${year}`
    } else {
        currentSeasonId = `${year}${year+1}`
    }
    return currentSeasonId

}