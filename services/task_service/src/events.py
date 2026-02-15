# services/task-service/src/events.py
import json
import os

import pika
from dotenv import load_dotenv

load_dotenv()


def publish_event(event_type: str, payload: dict):
    credentials = pika.PlainCredentials(
        os.getenv("RABBITMQ_USER"), os.getenv("RABBITMQ_PASSWORD")
    )

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host="rabbitmq", port=5672, credentials=credentials)
    )

    channel = connection.channel()
    channel.exchange_declare(exchange="tasks", exchange_type="fanout")

    message = {"type": event_type, "payload": payload}

    channel.basic_publish(exchange="tasks", routing_key="", body=json.dumps(message))

    connection.close()
