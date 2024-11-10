from database import Base
from sqlalchemy import Column, Integer, String, DateTime , ForeignKey , Boolean
from sqlalchemy import Index
from datetime import datetime

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String , unique=True)
    username = Column(String , unique=True)
    first_name = Column(String)
    last_name = Column(String)
    password = Column(String)
    is_active = Column(Boolean , default = True)
    role = Column(String)


class PersonalBlogs(Base):
    __tablename__ = 'personalBlogs'

    id = Column(Integer, primary_key=True, index=True)

    name= Column(String)
    date= Column(DateTime, default=datetime.utcnow)
    description= Column(String)
    owner_id = Column(Integer , ForeignKey("users.id"))