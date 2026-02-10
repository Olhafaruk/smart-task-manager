#services/auth-service/tests/test_auth_routes.py
import pytest

# -----------------------------
# /auth/register
# -----------------------------
@pytest.mark.asyncio
async def test_register_user(test_client):
    payload = {
        "email": "test@example.com",
        "password": "strongpassword"
    }

    response = await test_client.post("/auth/register", json=payload)
    assert response.status_code == 201

    data = response.json()
    assert "id" in data
    assert data["email"] == payload["email"]


@pytest.mark.asyncio
async def test_register_duplicate_email(test_client):
    payload = {
        "email": "duplicate@example.com",
        "password": "pass123"
    }

    # first registration
    await test_client.post("/auth/register", json=payload)

    # second registration
    response = await test_client.post("/auth/register", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"


# -----------------------------
# /auth/login
# -----------------------------
@pytest.mark.asyncio
async def test_login_success(test_client):
    payload = {
        "email": "login@example.com",
        "password": "mypassword"
    }

    # register first
    await test_client.post("/auth/register", json=payload)

    # login
    response = await test_client.post("/auth/login", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_login_invalid_email(test_client):
    payload = {
        "email": "notfound@example.com",
        "password": "pass"
    }

    response = await test_client.post("/auth/login", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid email or password"


@pytest.mark.asyncio
async def test_login_wrong_password(test_client):
    # register
    await test_client.post("/auth/register", json={
        "email": "wrongpass@example.com",
        "password": "correctpass"
    })

    # wrong password
    response = await test_client.post("/auth/login", json={
        "email": "wrongpass@example.com",
        "password": "incorrectpass"
    })

    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid email or password"


# -----------------------------
# /auth/me
# -----------------------------
@pytest.mark.asyncio
async def test_get_me(test_client):
    # register
    payload = {
        "email": "me@example.com",
        "password": "pass123"
    }
    await test_client.post("/auth/register", json=payload)

    # login
    login_response = await test_client.post("/auth/login", json=payload)
    token = login_response.json()["access_token"]

    # get /auth/me
    response = await test_client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert data["email"] == payload["email"]


# -----------------------------
# OPTIONS
# -----------------------------
@pytest.mark.asyncio
async def test_options_register(test_client):
    response = await test_client.options("/auth/register")
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_options_login(test_client):
    response = await test_client.options("/auth/login")
    assert response.status_code == 200
