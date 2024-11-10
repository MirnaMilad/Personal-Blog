from fastapi import FastAPI
from database import engine
from fastapi.middleware.cors import CORSMiddleware
from routers import auth , personalBlogs
import model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model.Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(personalBlogs.router)
