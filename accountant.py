import asyncio
import random
import time
import threading

import answers
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
        _players = players.score()
        num_of_votes = len(self.voters)
        stars = {1:"", 2:"", 3:""}
        for voter, votes in self.voters.items():
            for i in [1,2,3]:
                try:
                    _players[votes[i].upper()]+=i
                except Exception:
                    errors+=1
        
        result = dict(sorted(_players.items(), key=lambda x: x[1], reverse=True))
        print(f"error count: {errors}")
        self.voters = {}
        return getStarPage(result, num_of_votes)

    def getReply(self, sender_id, message):
        if not self.game_started:
            if "vote" in message.lower():
                return "Aucun match en cours..."
            else:
                return

        if sender_id not in self.voters:
            if "vote" in message.lower():
                self.voters[sender_id] = [message]
                reply = random.choice(answers.answer_sequence[0])
                return reply
            return

        index = len(self.voters[sender_id]) 
        if index < 4:
            message = message.lower()
            vote = ""
            try:
                for player, names in players.players.items():
                    if message in names:
                        vote = player
                        break
            except:
                print(f"error with message: {message}")
                return
            if vote == "":
                reply = random.choice(answers.name_error)
                return reply

            if self.current_teams["team_a"] not in vote.upper() and self.current_teams["team_b"] not in vote.upper():
                return "Ce joueur ne joue pas ce soir."
            
            if vote in self.voters[sender_id]:
                return "Vous avez deja voté pour ce joueur."

            try:
                reply = random.choice(answers.answer_sequence[index])
                self.voters[sender_id].append(vote)
                return reply
            except:
                return

if __name__ == '__main__':
    import multiprocessing
    multiprocessing.set_start_method("spawn")
    loop_ = asyncio.get_event_loop()
    accountant = Accountant()
    asyncio.ensure_future(accountant.startGame(team_a="BLANCS", team_b="VERTS"))
    loop_.run_forever()