from flask import Flask, render_template, request
import accountant
import new_game
from web_view_helper import getStarTable, starPage

app = Flask(__name__)
a = accountant.Accountant()

@app.route('/')
def main(message: str = ""):
    if a.game_started:
        return \
            f"<html>\
                <body>\
                    <form action=\"onGetReply\">\
                        Message:<br>\
                        <input type=\"text\" name=\"message\"><br>\
                        <div>\
                            <button>send</button>\
                        </div>\
                    </form>\
                    {message} \
                    <form action=\"onStopGame\">\
                        <div>\
                            <button>stop game</button>\
                        </div>\
                    </form>\
                </body>\
            </html>"
    else:
        return render_template("new_game.html")

@app.route('/onStopGame')
def onStopGame():
    a.stopGame()
    return main()

@app.route('/getStarPage')
def getStarPage():
    scores, num_of_votes, errors = a.getScores()
    return starPage(scores)

@app.route('/onStartGame')
def onStartGame():
    team_a = request.args.get("team_a", "")
    team_b = request.args.get("team_b", "")
    a.startGame(team_a, team_b)
    return main()

@app.route('/onGetReply')
def onGetReply():
    message = request.args.get("message","")
    reply = a.getReply("test_user", message)
    scores, num_of_votes, errors = a.getScores()
    star_page = getStarTable(scores, num_of_votes, errors)
    result = f"<p>"\
        f" {reply}"\
        f"</p>"\
        f"{star_page}"
    return main(result)

if __name__ == '__main__':
    app.run()
