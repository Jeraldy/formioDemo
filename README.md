## Form Builder Demo

Running the app
- docker-compose up --build

Access backend here
 - http://localhost:8090

Access frontend here
 - http://localhost:3002

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