TAG="latest"
docker build -f Dockerfile -t gcr.io/serene-foundry-234719/abobot:$TAG
# docker push gcr.io/serene-foundry-234719/abobot:$TAG
# gcloud compute instances reset abobot --zone northamerica-northeast1-a