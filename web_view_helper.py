import json

from flask import render_template


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



def getStarTable(players, num_of_votes, errors):
    html_table = ""
    for player, points in players.items():
        html_table += f"          <tr>"\
            f"              <td>{player}</td>"\
            f"              <td>{points}</td>"\
            f"          </tr>"\

    return f"  <div>"\
        f"    Nombre de voteurs: {num_of_votes}"\
        f"      <table>"\
        f"          <tr>"\
        f"              <td>Joueur</td>"\
        f"              <td>Points</td>"\
        f"          </tr>"\
        f"          {html_table}"\
        f"      </table>"\
        f"  </div>"


def starPage(scores):
    podium = {}
    firstValue = 0
    secondValue = 0
    thirdValue = 0
    for player, result in scores.items():
        if not result['score']:
            continue
        current = podium.get(result['score'], [])
        current.append({
            'number': player[0],
            'name': result['displayName'],
            'team': player[2:],
            'score': result['score']
            }
        )
        podium[result['score']] = current
        if result['score'] > firstValue:
            firstValue = result['score']
        elif result['score'] > secondValue:
            secondValue = result['score']
        elif result['score'] > thirdValue:
            thirdValue = result['score']

    first = podium.get(firstValue, [])
    second = podium.get(secondValue, [])
    third = podium.get(thirdValue, [])
    return render_template("star_page.html", first=first, second=second, third=third)


def getAutoRefreshStarPage(players, num_of_votes, errors):
    html_table = ""
    for player, points in players.items():
        html_table += f"          <tr>"\
            f"              <td>{player}</td>"\
            f"              <td>{points}</td>"\
            f"          </tr>"\

    return f"<html>"\
        f"<script>" \
        f"  setTimeout(function(){{" \
        f"      window.location.href = 'https://abobot.aboimpro.com/getCurrentScores';" \
        f"  }}, 5000);" \
        f"</script>" \
        f"  <body>"\
        f"    Nombre de voteurs: {num_of_votes}"\
        f"      <table>"\
        f"          <tr>"\
        f"              <td>Joueur</td>"\
        f"              <td>Points</td>"\
        f"          </tr>"\
        f"          {html_table}"\
        f"      </table>"\
        f"      <form action=\"onStopGame\">"\
        f"          <div>"\
        f"              <button>Stop Game</button>"\
        f"          </div>"\
        f"      </form>"\
        f"  </body>"\
        f"</html>"
