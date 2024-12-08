from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException , status , Path
from pydantic import BaseModel, Field
from datetime import datetime 
from fastapi import APIRouter
from database import SessionLocal
from models import PersonalBlogs
from .auth import get_current_user


router = APIRouter(
    prefix='/admin',
    tags=['admin']
)



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency = Annotated[Session , Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]