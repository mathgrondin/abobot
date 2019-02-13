import asyncio
import time
import threading

import players
from web_view_helper import getStarPage

class Accountant:
    def __init__(self):
        self.game_started = False
        self._teams = ["BLANC", "BLEU", "ROUGE", "VERT" ]
        self.current_teams = {}
        self.voters = {}

    def startGame(self, team_a: str,team_b: str):
        if team_a not in self._teams or team_b not in self._teams or team_a == team_b:
            return

        self.current_teams = {"team_a": team_a,
            "team_b": team_b
        }
        self.game_started = True
        team_a = self.current_teams["team_a"]
        team_b = self.current_teams["team_b"]
        print(f"GAME STARTED: {team_a} VS {team_b}")

    def stopGame(self):
        self.game_started = False
        team_a = self.current_teams["team_a"]
        team_b = self.current_teams["team_b"]

        errors = 0
        _players = players.players
        stars = {1:"", 2:"", 3:""}
        for voter, votes in self.voters.items():
            for i in [1,2,3]:
                try:
                    _players[votes[i]]+=i
                except Exception:
                    errors+=1
        
        result = dict(sorted(_players.items(), key=lambda x: x[1]))
        print(f"error count: {errors}")
        self.voters = {}
        return getStarPage(result)

    def getReply(self, sender_id, message):
        if not self.game_started:
            if "vote" in message:
                return "Aucun match en cours..."
            else:
                return

        if sender_id not in self.voters:
            if "vote" in message:
                self.voters[sender_id] = [message]
        else:
            if message not in players.players:
                return "Hummm. ce n'est pas un joueur valide. (ex: 1-BLANC, 1-BLEU, 1-ROUGE, 1-VERT, ...)"
            if message in self.voters[sender_id]:
                return "Vous avez deja voté pour ce joueur"
            self.voters[sender_id].append(message)
        replies = self.voters[sender_id]
        team_a = self.current_teams["team_a"]
        team_b = self.current_teams["team_b"]
        positions = [f"Match en cours. {team_a} VS. {team_b}\\n Vote pour ta troisième ⭐", "Vote pour ta deuxième ⭐", "Vote pour ta première ⭐", "Merci!"]
        try:
            return positions[len(replies)- 1]
        except:
            return "Vous avez déjà voté pour vos étoiles"
        return "hein?"

if __name__ == '__main__':
    import multiprocessing
    multiprocessing.set_start_method("spawn")
    loop_ = asyncio.get_event_loop()
    accountant = Accountant()
    asyncio.ensure_future(accountant.startGame(team_a="BLANCS", team_b="VERTS"))
    loop_.run_forever()