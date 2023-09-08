export const getMatchDisplayName = (matchId: string) => {
  return matchId.slice(0, 4) + '/' + matchId.slice(4,6) + '/' + matchId.slice(6,8);
};
