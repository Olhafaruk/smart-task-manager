#services/task-service/src/routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .deps import get_db
from .auth import get_current_user
from .schemas import TaskCreate, TaskUpdate, TaskResponse
from .crud import create_task, get_tasks, update_task, delete_task

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=TaskResponse)
def create_task_route(
    data: TaskCreate,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_task(db, user_id, data)

@router.get("/", response_model=list[TaskResponse])
def list_tasks(
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_tasks(db, user_id)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task_route(
    task_id: int,
    data: TaskUpdate,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    task = update_task(db, task_id, user_id, data)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.delete("/{task_id}")
def delete_task_route(
    task_id: int,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    deleted = delete_task(db, task_id, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"status": "deleted"}
