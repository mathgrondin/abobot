import { Season } from '../app/repository/seasonRepository';

export const getSeasonDisplayName = (season: Season) => season.id.slice(0, 4) + ' - ' + season.id.slice(4);