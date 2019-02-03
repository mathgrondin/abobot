import bottle
from bottle import get, post, request, response, static_file, route, template, redirect
import json
import os
import requests

from accountant import Accountant

# import Accountant

host = "localhost"
port = 1234

class AbobotServer:

    def __init__(self, host: str, port: int):
        print(f"###############################################")
        print("Initializing Abobot.")
        print(f"    Host: {host}")
        print(f"    Port: {port}")
        print(f"###############################################")
        self.host = host
        self.port = port
        self.accountant = Accountant()

        with open('secrets.json') as data_file:    
            data = json.load(data_file)
            self.access_token = data["access_token"]
            self.verify_token = data["verify_token"]

        abs_app_dir_path = os.path.dirname(os.path.realpath(__file__))
        abs_views_path = os.path.join(abs_app_dir_path, 'views')
        bottle.TEMPLATE_PATH.insert(0, abs_views_path )
        self.app = bottle.default_app()
        self.app.routes = [
            route(path="/", method="GET", callback=self.newGame),
            route(path="/onStartGame", method="GET", callback=self.onNewGame),
            route(path="/messengerWebHook", method="GET", callback=self.GETMessengerWebhook),
            route(path="/messengerWebHook", method="POST", callback=self.POSTMessengerWebhook)
        ]
                

    def runServer(self):
        self.app.run(host=self.host, port=self.port)

    def newGame(self):
        if self.accountant.game_started:
            return template("current_game.tpl", self.accountant.current_teams)
        return static_file("new_game.html", root="static/html")

    def onNewGame(self):
        if self.accountant.game_started:
            return self.newGame()
        try:
            team_a = request.query["team_a"]
            team_b = request.query["team_b"]
        except KeyError:
            return "Invalid game parameters."
        self.accountant.startGame(team_a, team_b)
        return self.newGame()

    def GETMessengerWebhook(self):
        mode = request.query['hub.mode']
        token = request.query['hub.verify_token']
        challenge = request.query['hub.challenge']
        
        if not mode or not token:
            response.status = 500
            return "ERROR: bad request "
    
        if mode == "subscribe" and token == self.verify_token:
            print('WEBHOOK_VERIFIED')
            response.status = 200
            return challenge

    def POSTMessengerWebhook(self): 
        print("Message received")
        notification = request.json
        for entry in notification["entry"]:
            if "messaging" in entry:
                for message in entry["messaging"]:
                    sender_id = message["sender"]["id"]
                    text = message["message"]["text"]
                    print(f"{sender_id} says {text}")
                    reply_message = self.accountant.getReply(sender_id, message)
                    if reply_message == "":
                        return
                    
                    params = (
                        ('"messaging_type"', '"RESPONSE"'),
                        ('recipient', '{\n  "id": "'+f"{sender_id}"+'"\n}'),
                        ('message', '{\n     "text": "'+f"{reply_message}"+'"\n}'),
                        ('access_token', self.access_token),
                    )
                    response = requests.post('https://graph.facebook.com/v3.2/me/messages', params=params)
                    # if response.status_code is not 200:
                    print(response)


if __name__ == '__main__':
    server = AbobotServer("localhost",8080)
    server.runServer()
    
    