from db_query import db_query

def createBlogTable():
    try:
        query = '''CREATE TABLE IF NOT EXISTS Blog.blogData(
            blog_id     int PRIMARY KEY,
            username    varchar(10)  UNIQUE,
            title       varchar(40),
            description varchar(1000),
            created_At  timestamp
        )'''

        db_query(query)

        response = {"Message" : "Table Created"}
    except Exception as error:
        response = {"Message" : error}

    return response