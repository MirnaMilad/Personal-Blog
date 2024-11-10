from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException , status , Path
from pydantic import BaseModel, Field
from datetime import datetime 
from fastapi import APIRouter
from database import SessionLocal
from models import PersonalBlogs


router = APIRouter()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency = Annotated[Session , Depends(get_db)]

class BlogRequest(BaseModel):
    name:str = Field(min_length=3)
    date:datetime 
    description:str

@router.get("/blogs")
async def read_all(db: db_dependency):
    return db.query(PersonalBlogs).all()

@router.get("/blog/{blog_id}" , status_code = status.HTTP_200_OK)
async def read_blogs(db:db_dependency , blog_id:int=Path(gt=0)):
    blog_model = db.query(PersonalBlogs).filter(PersonalBlogs.id == blog_id).first()
    if blog_model is not None:
        return blog_model
    raise HTTPException(status_code = 404, detail = 'Blog not found')

@router.post("/blog" , status_code = status.HTTP_201_CREATED)
async def create_blog(db:db_dependency , blog_request:BlogRequest):
    blog_model = PersonalBlogs(**blog_request.dict())
    db.add(blog_model)
    db.commit()

@router.put("/blog/{blog_id}" , status_code = status.HTTP_204_NO_CONTENT)
async def update_blog(db:db_dependency , blog_id:int , blog_request :BlogRequest):
    blog_model = db.query(PersonalBlogs).filter(PersonalBlogs.id == blog_id).first()
    if blog_model is None:
        raise HTTPException(status_code = 404, detail = 'Blog not found')
    blog_model.name = blog_request.name
    blog_model.date = blog_request.date
    blog_model.description = blog_request.description

    db.add(blog_model)
    db.commit()

@router.delete("/blog/{blog_id}" , status_code = status.HTTP_204_NO_CONTENT)
async def delete_blog(db:db_dependency , blog_id:int):
    blog_model = db.query(PersonalBlogs).filter(PersonalBlogs.id == blog_id).first()
    if blog_model is None:
        raise HTTPException(status_code = 404, detail = 'Blog not found')
    db.delete(blog_model)
    db.commit()
