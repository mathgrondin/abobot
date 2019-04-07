import json

def getGameStartedPage(teams):
    team_a = teams["team_a"]
    team_b = teams["team_b"]
    return f"<html>"\
        f"  <body>"\
        f"      {team_a} VS. {team_b}"\
        f"      <form action=\"onStopGame\">"\
        f"          <div>"\
        f"              <button>Stop Game</button>"\
        f"          </div>"\
        f"      </form>"\
        f"  </body>"\
        f"</html>"\

def getStarPage(players, num_of_votes):
    html_table = "" 
    for player, points in players.items():
        html_table+= f"          <tr>"\
                     f"              <td>{player}</td>"\
                     f"              <td>{points}</td>"\
                     f"          </tr>"\

    return f"<html>"\
        f"  <body>"\
        f"    Nombre de voteurs: {num_of_votes}"\
        f"      <table>"\
        f"          <tr>"\
        f"              <td>Joueur</td>"\
        f"              <td>Points</td>"\
        f"          </tr>"\
        f"          {html_table}"\
        f"      </table>"\
        f"  </body>"\
        f"</html>"