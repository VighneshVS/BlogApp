from db_query import db_query

def createSchema():
    try:
        query = '''CREATE SCHEMA IF NOT EXISTS Blog'''

        db_query(query)

        response = {"Message" : "Schema Created"}
    except Exception as error:
        response = {"Message" : error}

    return response