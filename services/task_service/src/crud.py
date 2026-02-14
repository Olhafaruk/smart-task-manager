from sqlalchemy.orm import Session
from .models import Task
from .schemas import TaskCreate, TaskUpdate
from .events import publish_event

def create_task(db: Session, user_id: int, data: TaskCreate):
    task = Task(
        title=data.title,
        description=data.description,
        user_id=user_id
    )
    db.add(task)
    db.commit()
    db.refresh(task)

    publish_event("task_created",
                  {"id": task.id,
                   "title": task.title,
                   "description": task.description,
                   "completed": task.completed,
                   "user_id": task.user_id})
    return task

def get_tasks(db: Session, user_id: int):
    return db.query(Task).filter(Task.user_id == user_id).all()

def update_task(db: Session, task_id: int, user_id: int, data: TaskUpdate):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
    if not task:
        return None

    for field, value in data.dict(exclude_unset=True).items():
        setattr(task, field, value)

    db.commit()
    db.refresh(task)
    publish_event("task_updated", {
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "completed": task.completed,
        "user_id": task.user_id
    })

    return task

def delete_task(db: Session, task_id: int, user_id: int):
    task = db.query(Task).filter(Task.id == task_id, Task.user_id == user_id).first()
    if not task:
        return False

    db.delete(task)
    db.commit()
    publish_event("task_deleted", {
        "id": task_id,
        "user_id": user_id
    })

    return True
