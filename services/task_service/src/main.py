#services/task-service/src/main.py
from fastapi import FastAPI
from .deps import Base, engine
from .routes import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Task Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

#Base.metadata.create_all(bind=engine)

app.include_router(router)

