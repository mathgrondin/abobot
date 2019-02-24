import json
import os
import subprocess

from aiohttp import ClientSession, web, web_runner
import asyncio
import requests
import urllib

from accountant import Accountant
from dynamic_server import startHttpsServerTunnel
from new_game import newGame
from web_view_helper import getGameStartedPage

# import Accountant

host = "localhost"
port = 1234

class AbobotServer:

    def __init__(self):
        self.host = "localhost"
        self.port = 0
        self.accountant = Accountant()
        self._proc = None
        self.restart_web_tunnel_future = None

        with open("secrets.json") as data_file:    
            data = json.load(data_file)
            self.access_token = data["access_token"]
            self.verify_token = data["verify_token"]
            self.app_access_token = data["app_access_token"]

        abs_app_dir_path = os.path.dirname(os.path.realpath(__file__))
        abs_views_path = os.path.join(abs_app_dir_path, "views")
        self._web_runner = web_runner.AppRunner(web.Application())
        self._web_runner.app.add_routes([web.get(f"/", self.newGame),
            web.get("/onStartGame", self.onNewGame),
            web.get("/onStopGame", self.onStopGame),
            web.get("/messengerWebHook", self.GETMessengerWebhook),
            web.post("/messengerWebHook", self.POSTMessengerWebhook)
        ])

    def __del__(self):
        if self._proc is not None:
            self._proc.kill()

    async def runServer(self):
        await self.startWebhandler()
        asyncio.ensure_future(self._refreshServer())

    async def startWebhandler(self):
        if self._proc is not None:
            await self._web_runner.cleanup()
            self._proc.kill()
        
        port, host, proc = startHttpsServerTunnel()
        # port = 2000
        # host = "localhost"
        self.port = port
        self.host = host
        self._proc = proc

        print(f"###############################################")
        print("Initializing Abobot.")
        print(f"    Host: {host}")
        print(f"    Port: {port}")
        print(f"###############################################")
        
        await self._web_runner.setup()
        site = web.TCPSite(self._web_runner, "localhost", self.port)
        await site.start()
        asyncio.ensure_future(self._refreshWebHook())

    async def _refreshServer(self):
        while True:
            await asyncio.sleep(7 * 60 * 60)
            await self.startWebhandler()

    async def _refreshWebHook(self, retry: int = 1):
        print(f"Updating webhook (attempt #{retry})...")
        if retry > 5:
            print("failed...")
            return
        server_url = urllib.parse.quote(self.host, safe='')
        access_token = urllib.parse.quote(self.app_access_token, safe='')
        request_url = "https://graph.facebook.com/v3.2/2390921924269044/subscriptions"

        params = {
            "callback_url": f"{self.host}/messengerWebHook",
            "object": "page",
            "fields": "messages, messaging_postbacks",
            "verify_token": f"{self.verify_token}",
            "access_token": f"{access_token}"
        }

        async with ClientSession() as session:
            async with session.post(request_url, params=params) as resp:
                if resp.status is not 200:
                    await asyncio.sleep(retry)
                    asyncio.ensure_future(self._refreshWebHook(retry=retry+1))
        return True

    async def newGame(self, request):
        if self.accountant.game_started:
            pending_game_page = getGameStartedPage(self.accountant.current_teams)
            return web.Response(body=pending_game_page, content_type="text/html")
        response = web.FileResponse(f"{os.getcwd()}/static/html/new_game.html")
        return response

    async def onNewGame(self, request):
        if self.accountant.game_started:
            return await self.newGame(None)
        try:
            team_a = request.query["team_a"]
            team_b = request.query["team_b"]
        except KeyError:
            return web.Response(text="Invalid game parameters.")
        self.accountant.startGame(team_a, team_b)
        return await self.newGame(None)

    async def onStopGame(self, request):
        results = self.accountant.stopGame()
        return web.Response(body=results, content_type="text/html")

    async def GETMessengerWebhook(self, request):
        mode = request.query["hub.mode"]
        token = request.query["hub.verify_token"]
        if not mode or not token:
            return web.Response(text="ERROR: bad request ")
    
        if mode == "subscribe" and token == self.verify_token:        
            print("verifying webhook")        
            challenge = request.query["hub.challenge"]
            return web.Response(text=f"{challenge}")

    async def POSTMessengerWebhook(self, request): 

        print("Message received")
        try:
            notification = await request.json()
            for entry in notification["entry"]:
                if "messaging" in entry:
                    for message in entry["messaging"]:
                        sender_id = message["sender"]["id"]
                        text = message["message"]["text"]
                        print(f"{sender_id} says {text}")
                        reply_message = self.accountant.getReply(sender_id, text)
                        if reply_message is None:
                            return web.Response(text="all good")
                        
                        params = {
                            "messaging_type": "RESPONSE",
                            "recipient": f"{{\"id\": \"{sender_id}\"}}",
                            "message": f"{{\n\"text\": \"{reply_message}\"}}",
                            "access_token": self.access_token
                        }
                        response = requests.post("https://graph.facebook.com/v3.2/me/messages", params=params)
                        print(response)
        except Exception as e:
            params = {
                "messaging_type": "RESPONSE",
                "recipient": f"{{\"id\": \"{sender_id}\"}}",
                "message": f"{{\n\"text\": \"Une erreur est survenue...\"}}",
                "access_token": self.access_token
            }
            response = requests.post("https://graph.facebook.com/v3.2/me/messages", params=params)
            print(e)
        return web.Response(text="all good")


if __name__ == "__main__":
    import multiprocessing
    multiprocessing.set_start_method("spawn")
    try:
        loop = asyncio.get_event_loop()
        server = AbobotServer()
        loop.run_until_complete(server.runServer())
        loop.run_forever()
    except (KeyboardInterrupt, SystemExit):
        server.__del__()

