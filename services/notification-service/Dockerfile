FROM python:3.12-slim

WORKDIR /app


RUN apt-get update && apt-get install -y curl && apt-get clean

COPY services/notification-service/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY services/notification-service /app


HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD curl -f http://rabbitmq:15672/api/healthchecks/node || exit 1

CMD ["python", "-u", "src/main.py"]
