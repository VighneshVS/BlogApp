import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

connection = None
cursor = None

def db_result(query, values=None):
    try:
        connection = psycopg2.connect(
            user=os.getenv("user"),
            password=os.getenv("password"),
            host=os.getenv("host"),
            port=os.getenv("port"),  
            database=os.getenv("database")
        )
        print("DB connected")

        cursor = connection.cursor()
        cursor.execute(query, values)
        print("Query executed")

        if query.strip().lower().startswith("select"):
            result = cursor.fetchall()
            return result
        # cursor.commit()
        connection.commit()
        return "Database Updates Successfully"

    except Exception as error:
        return error
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()
            print("DB disconnected")
