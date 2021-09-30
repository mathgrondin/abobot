# ABOBOT
Un bot messenger pour comptabiliser les votes des étoiles

## Local setup
### Python
Sur windows
```sh
choco install python
pip3 install --user virtualenv
.\env\Scripts\activate.bat
py -m pip install --upgrade pip --user
py -m pip install -r requirements.txt --user
```

### Docker

build
```sh
docker build -t gcr.io/serene-foundry-234719/abobot:latest . 
```
run
```sh
docker run -d -p 80:80 gcr.io/serene-foundry-234719/abobot:latest
```
push
```sh
docker push gcr.io/serene-foundry-234719/abobot:latest
```