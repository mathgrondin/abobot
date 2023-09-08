import { randomUUID } from 'crypto';
import { readCollection, writeDocument } from '../../../firebase/firestoreHelper';

export type Team = {
    id: string,
    seasonId: string,
    name: string,
    iconPath: string,
    playerIds: string[]
}

const TEAMS_COLLECTION_ID = 'teams';

function getTeam(teamId: string): Promise<Team | undefined> {
  return Promise.resolve()
    .then(() => readCollection(TEAMS_COLLECTION_ID))
    .then(collectionSnapshot => {
      const teamSnapshot = collectionSnapshot.docs.find(document => document.id === teamId);
      if (!teamSnapshot) {
        return undefined;
      }
      const team = teamSnapshot.data() as Team;
      return team;
    });
}

function getTeamsByName(name: string): Promise<Team[]> {
  return Promise.resolve()
    .then(() => readCollection(TEAMS_COLLECTION_ID))
    .then(collectionSnapshot => {
      const teamSnapshots = collectionSnapshot.docs.filter(document => (document.data() as Team).name === name);
      if (teamSnapshots.length == 0) {
        return [];
      }
      const team = teamSnapshots.map(snapshot => snapshot.data() as Team);
      return team;
    });
}

function createTeam(teamCandidate: Team): Promise<Team | undefined> {
  const teamId = randomUUID();
  const team: Team = {
    ...teamCandidate,
    id: teamId
  };

  return Promise.resolve()
    .then(() => writeDocument(TEAMS_COLLECTION_ID, teamId, team))
    .then(() => {
      console.log("New Team Created", JSON.stringify(team))
      return team
    });
}



const TeamRepository = {
  getTeam,
  getTeamsByName,
  createTeam
};

export default TeamRepository;