from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException , status , Path
from pydantic import BaseModel, Field
from datetime import datetime 
from fastapi import APIRouter
from database import SessionLocal
from models import PersonalBlogs
from .auth import get_current_user


router = APIRouter()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency = Annotated[Session , Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

class BlogRequest(BaseModel):
    name:str = Field(min_length=3)
    date:datetime 
    description:str

@router.get("/blogs")
async def read_all(user : user_dependency, db: db_dependency):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Authentication failed .')
    return db.query(PersonalBlogs).filter(PersonalBlogs.owner_id == user.get('id')).all()

@router.get("/blog/{blog_id}" , status_code = status.HTTP_200_OK)
async def read_blogs(user : user_dependency, db:db_dependency , blog_id:int=Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Authentication failed .')
    blog_model = db.query(PersonalBlogs).filter(PersonalBlogs.id == blog_id).filter(PersonalBlogs.owner_id == user.get('id')).first()
    if blog_model is not None:
        return blog_model
    raise HTTPException(status_code = 404, detail = 'Blog not found')

@router.post("/blog" , status_code = status.HTTP_201_CREATED)
async def create_blog(user : user_dependency, db:db_dependency , blog_request:BlogRequest):
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Authentication failed .')
    blog_model = PersonalBlogs(**blog_request.dict() , owner_id = user.get('id'))
    db.add(blog_model)
    db.commit()

@router.put("/blog/{blog_id}" , status_code = status.HTTP_204_NO_CONTENT)
async def update_blog(user : user_dependency, db:db_dependency , blog_id:int , blog_request :BlogRequest):
    blog_model = db.query(PersonalBlogs).filter(PersonalBlogs.id == blog_id).filter(PersonalBlogs.owner_id == user.get('id')).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Authentication failed .')
    if blog_model is None:
        raise HTTPException(status_code = 404, detail = 'Blog not found')
    blog_model.name = blog_request.name
    blog_model.date = blog_request.date
    blog_model.description = blog_request.description

    db.add(blog_model)
    db.commit()

@router.delete("/blog/{blog_id}" , status_code = status.HTTP_204_NO_CONTENT)
async def delete_blog(user : user_dependency, db:db_dependency , blog_id:int):
    blog_model = db.query(PersonalBlogs).filter(PersonalBlogs.id == blog_id).filter(PersonalBlogs.owner_id == user.get('id')).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Authentication failed .')
    if blog_model is None:
        raise HTTPException(status_code = 404, detail = 'Blog not found')
    db.delete(blog_model)
    db.commit()
