
from datetime import datetime

from fastapi import Body, FastAPI
from pydantic import BaseModel, Field

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Blog:
    id:int
    name:str
    date:datetime
    description:str

    def __init__(self , id , name , date , description):
        self.id = id
        self.name = name
        self.date = date
        self.description = description


class BlogRequest(BaseModel):
    id:Optional[int] = None
    name: str=Field(min_length=3)
    date: datetime
    description: str

    model_config = {
        "json_schema_extra":{
            "example":{
            "name": "My first Article",
            "date": "2024-08-07T00:00:00",
            "description": "The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book \"De Finibus Bonorum et Malorum\", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content."
             }
        }
    }



Personal_Blogs = [
    {
        'id':111,
        'name':'My first Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description':'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'
    },{
        'id':2,
        'name':'My second Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'id':3,
        'name':'My third Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'id':4,
        'name':'My fourth Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'id':5,
        'name':'My fifth Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'id':6,
        'name':'My sixth Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'id':7,
        'name':'My eighth Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'id':8,
        'name':'My ninth Article',
        'date': datetime.strptime('August 7, 2024', '%B %d, %Y'),
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    }
]

@app.get("/blogs")
async def blogs():  
    return Personal_Blogs


@app.get("/blogs/{blog_id}")
async def blog_by_id(blog_id:int):  
    for blog in Personal_Blogs:
        if blog['id'] == blog_id:
            return blog
    raise HTTPException(status_code = 404 , detail = 'Item not found')



@app.post("/create-blog")
async def create_blog(blog_request:BlogRequest):
    blog_dict = blog_request.model_dump()  # Convert to dictionary
    blog_dict['id'] = find_blog_id()  # Set the ID for the new blog
    new_blog = Blog(**blog_dict)  # Unpack dictionary to create Blog instance
    Personal_Blogs.append(new_blog)
    return new_blog

def find_blog_id() -> int:
    """Find the next available blog ID."""
    if Personal_Blogs:
        return Personal_Blogs[-1]['id'] + 1
    return 1



@app.put("/update_blog")
async def update_blog(update_blog:BlogRequest):
     for i in range(len(Personal_Blogs)):
        if Personal_Blogs[i]["id"] == update_blog.id:
            Personal_Blogs[i] = update_blog
            return Personal_Blogs[i]


@app.delete("/blogs/{blog_id}")
async def delete_by_id(blog_id:int):  
    for i in range(len(Personal_Blogs)):
        if Personal_Blogs[i]["id"] == blog_id:
            Personal_Blogs.pop(i)
            return {"message": f"Blog with id {blog_id} has been deleted"}
        return {"error": f"Blog with id {blog_id} not found"}