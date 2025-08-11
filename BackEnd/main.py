from fastapi import FastAPI
# from .utils.createUsersTable import createUsersTable
# from .utils.createBlogTable import createBlogTable
# from .utils.createSchema import createSchema
from db_query import db_result
import uvicorn
from pydantic import BaseModel
import uuid
import hashlib
from fastapi.middleware.cors import CORSMiddleware
from fastapi import status, Depends, Header
from fastapi import HTTPException
from fastapi.responses import JSONResponse
import jwt
from datetime import datetime, timedelta
  

app = FastAPI()
secret_key = 'Ka!ma-@Boo_er*ng'

class signUpData(BaseModel):
    user: str
    password: str
    email: str

class loginData(BaseModel):
    email: str
    password: str

class blogData(BaseModel):
    user: str
    user_id: str
    title: str
    description: str
    time: int

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.post("/sign-up")
async def insertRecord(items : signUpData):
    try:
        user_id = uuid.uuid4()
        user = items.user
        email = items.email
        h = hashlib.new("SHA256")
        h.update(items.password.encode())
        password = h.hexdigest()
        query = '''INSERT INTO blog.users ("user_id","user","email","password") VALUES (%s,%s,%s,%s)'''
        # query = "select * from blog.users"
        print("users:",(str(user_id)), user, email, password)
        response = db_result(query, ((str(user_id)),user,email, password))
        print(response)
        return {"Message" : response}
    except Exception as err:
        return {"Message" : err}
    
def create_jwt(user_id: str)->str:    
    expiration = datetime.utcnow() + timedelta(minutes=3) 
    payload = {
        "user_id": str(user_id),
        "exp": expiration
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token

def verify_jwt(authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@app.post("/")
def login(items: loginData):
    email = items.email
    if not email:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"Message": "Email is required"})
    if not items.password:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"Message": "Password is required"})
    password = items.password
    # db = hashlib.new("SHA256")
    # db.update("admin".encode())
    # passwordDB = db.hexdigest()
    # h = hashlib.new("SHA256")
    # h.update(items.password.encode())
    # password = h.hexdigest()
    # print("passwordDB:", passwordDB, "password:", password)
    query = "SELECT password, user_id FROM blog.users WHERE email = %s"
    response = db_result(query, (email,))
    print("response:", response)

    if not response or len(response) == 0:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"Message": "User not found"})
    passwordDB = response[0][0]
    user_id = response[0][1]

    h = hashlib.new("SHA256")
    h.update(items.password.encode())
    password = h.hexdigest()

    if(password == passwordDB):
        token = create_jwt(user_id)                                          
        return JSONResponse(status_code=status.HTTP_200_OK, content={"Message": "Login Successful", "token": token, "user_id": str(user_id)})
    else:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"Message": "Invalid credentials"})
    
               

@app.get("/home")
def getBlogs(payload=Depends(verify_jwt)):
    print("User ID:", payload["user_id"])
    try:
        query = "SELECT * FROM blog.entries"
        userQuery = "SELECT * FROM blog.users WHERE user_id = %s"
        user_id = payload["user_id"]
        user_response = db_result(userQuery, (user_id,))
        print("User Response:", user_response)
        response = db_result(query)
        columns = ["user_id", "username", "title", "description", "blog_id", "time"]
        result = []
        for row in response:
            row_dict = dict(zip(columns, row))
            result.append(row_dict)
        columns = ["user_id", "user", "email", "password"]
        user_result = []
        for row in user_response:
            row_dict = dict(zip(columns, row))
            user_result.append(row_dict)
        print("Response And Users",response, user_response)
        return result, user_result
    except Exception as err:
        print(err)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"Message": str(err)})

@app.post("/home")
async def insertBlog(items: blogData, payload=Depends(verify_jwt)):
    if not payload["user_id"]:
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"Message": "Unauthorized"})
    try:
        blog_id = uuid.uuid4()
        user = items.user
        user_id = payload["user_id"]
        title = items.title
        time = items.time
        description = items.description
         # Insert into the database
         # blog_id, user, user_id, title, description
        query = '''INSERT INTO blog.entries ("Time", "user_id","username","title","description","blog_id") VALUES (%s,%s,%s,%s,%s,%s)'''
        response = db_result(query, (time, user_id, user, title, description, str(blog_id)))
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={"Message": response})
    except Exception as err:
        print(err)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"Message": str(err)})

# @app.post("/users")

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)

