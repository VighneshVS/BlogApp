from db_query import db_query

def insertRecord():
    try:
        query = '''INSERT INTO Blog.users()'''

        db_query(query)

        response = {"Message" : "Table Created"}
    except Exception as error:
        response = {"Message" : error}

    return response