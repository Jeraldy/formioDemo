## Form Builder Demo

Running the app
- docker-compose up --build


### Create admin user
curl -X POST http://localhost:8090/api/v1/user/signup \
-H "Content-Type: application/json" \
-d '{
    "name": "Admin",
    "email": "admin@gmail.com",
    "password": "@User123",
    "passwordConfirm": "@User123",
    "role": "user"
}'

### Edit user role in the database 
Use mongoDB Compass to Access database\
Connection string
  - mongodb://localhost:27018/
  - Users table change  "role": "user" => "role": "admin"