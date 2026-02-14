import pytest

# -----------------------------
# INVALID EMAILS
# -----------------------------
@pytest.mark.asyncio
async def test_register_invalid_email(test_client):
    payload = {"email": "not-an-email", "password": "123"}
    response = await test_client.post("/auth/register", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_login_invalid_email_format(test_client):
    payload = {"email": "wrong", "password": "123"}
    response = await test_client.post("/auth/login", json=payload)
    assert response.status_code == 422


# -----------------------------
# EMPTY PASSWORD
# -----------------------------
@pytest.mark.asyncio
async def test_register_empty_password(test_client):
    payload = {"email": "valid@example.com", "password": ""}
    response = await test_client.post("/auth/register", json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_login_empty_password(test_client):
    payload = {"email": "valid@example.com", "password": ""}
    response = await test_client.post("/auth/login", json=payload)
    assert response.status_code == 422
