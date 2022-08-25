export function getCurrentMatchId(): number {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const matchId = parseInt(`${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`);
  return matchId;
}