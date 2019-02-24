import subprocess
import time

import asyncio
import requests

min_port = 5000
max_port = 60000


def startHttpsServerTunnel(retry: int = 1):
    https_tunnel_process = None
    port, ngrok_api_port = _getDynamicPort()
    if port is not 0:
        try:
            https_tunnel_process = subprocess.Popen(["ngrok", "http", f"{port}"], stdout=subprocess.PIPE)
            public_address = _getHttpsAddress(ngrok_api_port, port)
            return port, public_address, https_tunnel_process
            
                       
        except (TypeError, ValueError, KeyError, OSError) as exc:
            if https_tunnel_process is not None:
                https_tunnel_process.kill()
            print(f"Failed to start webHandler... {exc}")
            if retry < 7:
                time.sleep(retry)
                return startHttpsServerTunnel(retry=retry+1)

def _getDynamicPort():
    ngrok_api_port = 4040
    unused_port = min_port
    while unused_port <= max_port:
        try:
            requests.get(f"http://localhost:{ngrok_api_port}/status")
        except requests.exceptions.ConnectionError:
            return unused_port, ngrok_api_port
        unused_port += 1
        ngrok_api_port += 1
    return 0, 0

def _getHttpsAddress(ngrok_port, port, retry:int = 1):
    print(f"Get https address (attempt #{retry})")
    response = requests.get(f"http://localhost:{ngrok_port}/api/tunnels")
    if response is not None:
        public_server_info = response.json()
        for tunnel in public_server_info["tunnels"]:
            if tunnel["proto"] == "https":
                public_address = tunnel["public_url"]
                print(f"ngrok started... Running on localhost:{port} -> {public_address}")
                return public_address
    if retry < 5:
        _getHttpsAddress(ngrok_port, port, retry+1)