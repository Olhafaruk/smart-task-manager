#services/notification-service/src/consumer.py
import pika
import json
import time
from dotenv import load_dotenv
import os

load_dotenv()

def start_consumer():
    credentials = pika.PlainCredentials(
        os.getenv("RABBITMQ_USER"),
        os.getenv("RABBITMQ_PASSWORD")
    )


    while True:
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host="rabbitmq",
                    port=5672,
                    credentials=credentials
                )
            )
            break
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ not ready, retrying in 3 seconds...")
            time.sleep(3)

    channel = connection.channel()

    channel.exchange_declare(exchange="tasks", exchange_type="fanout")

    queue = channel.queue_declare(queue="", exclusive=True)
    queue_name = queue.method.queue

    channel.queue_bind(exchange="tasks", queue=queue_name)

    print(" [*] Waiting for task events...")

    def callback(ch, method, properties, body):
        event = json.loads(body)
        print(f" [x] Received event: {event['type']}")
        print(f"     Payload: {event['payload']}")

    channel.basic_consume(
        queue=queue_name,
        on_message_callback=callback,
        auto_ack=True
    )

    channel.start_consuming()
