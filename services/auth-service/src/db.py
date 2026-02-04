#services/auth-service/src/db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os
load_dotenv()

DATABASE_URL = (
    f"postgresql://{os.getenv('AUTH_DB_USER')}:"
    f"{os.getenv('AUTH_DB_PASSWORD')}@"
    f"db_auth:5432/"
    f"{os.getenv('AUTH_DB_NAME')}"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


Base = declarative_base()