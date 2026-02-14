import pytest
from services.task_service.src.auth import get_current_user
from services.task_service.src.main import app

@pytest.mark.asyncio
async def test_create_task(test_client):
    response = await test_client.post("/tasks/", json={
        "title": "Test task",
        "description": "Test description"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test task"
    assert data["description"] == "Test description"
    assert data["completed"] is False
    assert data["user_id"] == 1


@pytest.mark.asyncio
async def test_list_tasks(test_client):
    response = await test_client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


@pytest.mark.asyncio
async def test_update_task(test_client):

    create = await test_client.post("/tasks/", json={
        "title": "Old title",
        "description": "Old desc"
    })
    task_id = create.json()["id"]


    response = await test_client.put(f"/tasks/{task_id}", json={
        "title": "New title",
        "completed": True
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "New title"
    assert data["completed"] is True


@pytest.mark.asyncio
async def test_delete_task(test_client):

    create = await test_client.post("/tasks/", json={
        "title": "To delete"
    })
    task_id = create.json()["id"]


    response = await test_client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json() == {"status": "deleted"}


    response = await test_client.delete(f"/tasks/{task_id}")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_update_foreign_task(test_client):

    create = await test_client.post("/tasks/", json={
        "title": "My task"
    })
    task_id = create.json()["id"]



    app.dependency_overrides[get_current_user] = lambda: 999

    response = await test_client.put(f"/tasks/{task_id}", json={"title": "Hack"})
    assert response.status_code == 404


    app.dependency_overrides[get_current_user] = lambda: 1

