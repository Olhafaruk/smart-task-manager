# services/notification_service/tests_notification/test_consumer.py
import json

from services.notification_service.src.consumer import callback, handle_event


def test_handle_event_prints(capsys):
    event = {"type": "task_created", "payload": {"id": 1, "title": "Test task"}}

    handle_event(event)

    captured = capsys.readouterr()
    assert "task_created" in captured.out
    assert "Test task" in captured.out


def test_callback_calls_handle_event(capsys):
    event = {"type": "task_updated", "payload": {"id": 2, "title": "Updated"}}

    body = json.dumps(event).encode()

    callback(None, None, None, body)

    captured = capsys.readouterr()
    assert "task_updated" in captured.out
    assert "Updated" in captured.out
