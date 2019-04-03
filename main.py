import json
import requests

from flask import Flask, render_template, request

from accountant import Accountant
from dynamic_server import startHttpsServerTunnel
from web_view_helper import getGameStartedPage

accountant = Accountant()
verify_token = ""
app_access_token = ""

with open("secrets.json") as data_file:    
    data = json.load(data_file)
    access_token = data["access_token"]
    verify_token = data["verify_token"]
    app_access_token = data["app_access_token"]

app = Flask(__name__)

@app.route('/')
def newGame():
    if accountant.game_started:
        pending_game_page = getGameStartedPage(accountant.current_teams)
        return pending_game_page
    return render_template("new_game.html")

@app.route('/onStartGame', methods=['GET'])
def onStartGame():
    if accountant.game_started:
        return newGame()    

    team_a = request.args.get("team_a","")
    team_b = request.args.get("team_b","")
    if team_a == "" or team_b == "":
        return "Invalid game parameters."
    accountant.startGame(team_a, team_b)
    return newGame()

@app.route('/onStopGame', methods=['GET'])
def onStopGame():
    results = accountant.stopGame()
    return results

@app.route('/messengerWebHook', methods=['GET'])
def GETMessengerWebhook():
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    if not mode or not token:
        return "ERROR: bad request"

    if mode == "subscribe" and token == verify_token:        
        print("verifying webhook")        
        challenge = request.args.get("hub.challenge")
        print(challenge)
        return f"{challenge}"
    return ""

@app.route('/messengerWebHook', methods=['POST'])
def POSTMessengerWebhook(): 
    print("Message received")
    try:
        notification = request.get_json()
        for entry in notification["entry"]:
            if "messaging" in entry:
                for message in entry["messaging"]:
                    sender_id = message["sender"]["id"]
                    text = message["message"]["text"]
                    print(f"{sender_id} says {text}")
                    reply_message = accountant.getReply(sender_id, text)
                    if reply_message is None:
                        return "error happened."
                    
                    params = {
                        "messaging_type": "RESPONSE",
                        "recipient": f"{{\"id\": \"{sender_id}\"}}",
                        "message": f"{{\n\"text\": \"{reply_message}\"}}",
                        "access_token": access_token
                    }
                    response = requests.post("https://graph.facebook.com/v3.2/me/messages", params=params)
                    print(response)
    except Exception as e:
        params = {
            "messaging_type": "RESPONSE",
            "recipient": f"{{\"id\": \"{sender_id}\"}}",
            "message": f"{{\n\"text\": \"Une erreur est survenue...\"}}",
            "access_token": access_token
        }
        response = requests.post("https://graph.facebook.com/v3.2/me/messages", params=params)
        print(e)
    return "all good"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)

