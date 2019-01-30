import asyncio
import time
import threading

class Accountant:
    def __init__(self):
        self.game_timeout = 60 * 60 * 5
        self.game_timer = threading.Timer(self.game_timeout, self.stopGame)
        self.game_started = False
        self._teams = ["BLANCS", "BLEUS", "ROUGES", "VERTS" ]
        self.current_teams = {}

    def startGame(self, team_a: str,team_b: str):
        if team_a not in self._teams or team_b not in self._teams:
            return
        self.current_teams = {"team_a": team_a,
            "team_b": team_b
        }
        self.game_timer.start()
        self.game_started = True
        team_a = self.current_teams["team_a"]
        team_b = self.current_teams["team_b"]
        print(f"GAME STARTED: {team_a} VS {team_b}")

    def stopGame(self):
        self.game_timer.cancel()
        self.game_started = False
        team_a = self.current_teams["team_a"]
        team_b = self.current_teams["team_b"]
        print(f"GAME ENDED: {team_a} VS {team_b}")



if __name__ == '__main__':
    import multiprocessing
    multiprocessing.set_start_method("spawn")
    loop_ = asyncio.get_event_loop()
    accountant = Accountant()
    asyncio.ensure_future(accountant.startGame(team_a="BLANCS", team_b="VERTS"))
    loop_.run_forever()