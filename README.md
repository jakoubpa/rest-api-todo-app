# TODO App - React Frontend & Java Spring Boot Backend

This is a simple TODO app with a React frontend and Java Spring Boot backend. It was developed as a part of an Udemy course, "Master Spring Boot 3 & Spring Framework 6 with Java," with some additional features. It incorporates security using JWT tokens and Spring Security, and the authentication process is based on [this guide](https://www.bezkoder.com/spring-boot-jwt-authentication/).

The app uses a MySQL database to store user data and TODO items. It offers the following features:

- User management: Create users, login, and logout.
- Create, update, and delete TODO items.

## Installation

### Java Spring Boot Backend

1. **Clone this repository:**
   ```
   git clone <repository_url>
   ```
2. **Open the Spring Boot backend project in IntelliJ or your preferred IDE.**

3. **Make sure to have MySQL installed and running.**

4. **Configure the database connection in src/main/resources/application.properties:**
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/todo_app
   spring.datasource.username=root
   spring.datasource.password=root
   ```
5. **Build and run the Spring Boot application.**

### React Frontend

1. **Navigate to the frontend directory in your cloned repository:**

```
cd frontend
```
2. **Install project dependencies:**

```
npm install
```
3. **Start the React development server:**
```
npm start
```

4. **The React app should now be accessible at http://localhost:3000.**

### MySQL Database
1. **Install and configure MySQL as per your operating system.**
2. **Insert roles into database**


   Before creating a new user, you need to insert roles into the roles table. This can be done with simple SQL query:
   ```
   INSERT INTO roles(name) VALUES('ROLE_USER');
   INSERT INTO roles(name) VALUES('ROLE_ADMIN');
   ```

### Development Environment (CSRF & CORS)
For development purposes, Cross-Site Request Forgery (CSRF) and Cross-Origin Resource Sharing (CORS) protection have been disabled to facilitate easy local development and testing.

