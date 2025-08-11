import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

def connect_db():
    try:
        print("pass:",os.getenv("password"))
        print("pass:",os.getenv("user"))
        
        connection = psycopg2.connect(
            user=os.getenv("user"),
            password=os.getenv("password"),
            host=os.getenv("host"),
            port=os.getenv("port"),  
            database=os.getenv("database")
        )
      
        print("DB connected")
    except Exception as error:
        print(error)