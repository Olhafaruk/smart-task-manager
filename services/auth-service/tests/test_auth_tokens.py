import pytest
from datetime import timedelta
from src.auth import create_access_token


# -----------------------------
# NO TOKEN
# -----------------------------
@pytest.mark.asyncio
async def test_me_no_token(test_client):
    response = await test_client.get("/auth/me")
    assert response.status_code == 401


# -----------------------------
# INVALID TOKEN FORMAT
# -----------------------------
@pytest.mark.asyncio
async def test_me_invalid_token_format(test_client):
    response = await test_client.get(
        "/auth/me",
        headers={"Authorization": "NotBearer something"}
    )
    assert response.status_code == 401


# -----------------------------
# INVALID SIGNATURE
# -----------------------------
@pytest.mark.asyncio
async def test_me_invalid_token_signature(test_client):
    fake_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.payload"
    response = await test_client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {fake_token}"}
    )
    assert response.status_code == 401


# -----------------------------
# EXPIRED TOKEN
# -----------------------------
@pytest.mark.asyncio
async def test_me_expired_token(test_client):
    expired_token = create_access_token(
        {"sub": "1"},
        expires_delta=timedelta(seconds=-10)
    )

    response = await test_client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {expired_token}"}
    )

    assert response.status_code == 401


# -----------------------------
# TOKEN WITHOUT SUB
# -----------------------------
@pytest.mark.asyncio
async def test_me_token_without_sub(test_client):
    token = create_access_token({})
    response = await test_client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 401


# -----------------------------
# USER NOT FOUND
# -----------------------------
@pytest.mark.asyncio
async def test_me_user_not_found(test_client):
    token = create_access_token({"sub": "99999"})
    response = await test_client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 401
