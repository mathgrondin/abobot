def newGame():
    return f"""
            <html>
                <body>
                    <form action="onStartGame">
                        <br>
                            <input type="radio" name="team_a" value="BLANCS"> BLANCS
                            <input type="radio" name="team_a" value="BLEUS"> BLEUS
                            <input type="radio" name="team_a" value="ROUGES"> ROUGES
                            <input type="radio" name="team_a" value="VERTS"> VERTS
                        </br>
                        VS
                        <br>
                            <input type="radio" name="team_b" value="BLANCS"> BLANCS
                            <input type="radio" name="team_b" value="BLEUS"> BLEUS
                            <input type="radio" name="team_b" value="ROUGES"> ROUGES
                            <input type="radio" name="team_b" value="VERTS"> VERTS
                        </br>
                        <div>
                            <button>Start game</button>
                        </div>
                    </form>
                </body>
            </html>
            """
