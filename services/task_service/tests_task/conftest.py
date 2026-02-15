# services/task_service/tests_task/conftest.py

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import services.task_service.src.crud as crud_module
import services.task_service.src.events as events_module
from services.task_service.src.auth import get_current_user
from services.task_service.src.deps import Base, get_db
from services.task_service.src.main import app

events_module.publish_event = lambda *args, **kwargs: None
crud_module.publish_event = lambda *args, **kwargs: None


app.dependency_overrides[get_current_user] = lambda: 1

TEST_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(TEST_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


@pytest.fixture
async def test_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
