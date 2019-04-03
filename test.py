import accountant
import new_game

from flask import Flask, render_template, request

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
    return a.stopGame()

@app.route('/onStartGame')
def onStartGame():
    team_a = request.args.get("team_a","")
    team_b = request.args.get("team_b","")
    a.startGame(team_a,team_b)
    return main()

@app.route('/onGetReply')
def onGetReply():
    message = request.args.get("message","")
    reply = a.getReply("test_user", message)
    return main(reply)

if __name__ == '__main__':
    app.run()
