from fastapi import Body, FastAPI

app = FastAPI()

Personal_Blogs = [
    {
        'name':'My first Article',
        'date':'August 7, 2024',
        'description':'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'
    },{
        'name':'My second Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'name':'My third Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'name':'My fourth Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'name':'My fifth Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'name':'My sixth Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'name':'My eighth Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    },{
        'name':'My ninth Article',
        'date':'August 7, 2024',
        'description': 'The Lorem Ipsum text used today can be tracked down to the printing press industry in the 16th century. An unknown printer used a scrambled version of Ciceros philosophical book "De Finibus Bonorum et Malorum", written in 45 BC, to create filler text. The text became popular among printers and typesetters because it provided a standard dummy text that could be used to showcase different fonts, layouts, and designs without the distraction of meaningful content.'

    }
]

@app.get("/blogs")
async def read_all_books():
    return Personal_Blogs