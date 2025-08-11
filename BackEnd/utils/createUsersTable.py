from db_query import db_query

def createUsersTable():
    try:
        query = '''CREATE TABLE IF NOT EXISTS Blog.users(
            user_id     int PRIMARY KEY,
            username    varchar(10)  UNIQUE,
            email       varchar(30)
        )'''

        db_query(query)

        response = {"Message" : "Table Created"}
    except Exception as error:
        response = {"Message" : error}

    return response