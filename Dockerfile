FROM python:3.7-slim

WORKDIR /app

COPY requirements.txt /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

COPY . /app

EXPOSE 80
EXPOSE 8080

CMD ["python", "main.py"]