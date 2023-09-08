import { safetyWrap } from './safetyWrap';

export function getCurrentDayTimestamp(): number {
  const date = new Date();
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  date.setUTCMilliseconds(0);
  return date.getTime();
}

export function getYearFromDate(dateNumber: number, fallback = 0): number{
  return safetyWrap(() => {
    const date = new Date(dateNumber);
    if(isNaN(date.getUTCFullYear())){
      return fallback;
    }
    return date.getUTCFullYear();
  }, fallback) as number;
}

export function getMonthFromDate(dateNumber: number, fallback = 0): number{
  return safetyWrap(() => {
    const date = new Date(dateNumber);
    if(isNaN(date.getMonth())){
      return fallback;
    }
    return date.getMonth();
  }, fallback) as number;
}