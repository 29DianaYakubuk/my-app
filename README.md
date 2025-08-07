 ## Full-Stack Blog Application (React + JSON Server + BFF + Redux)

This project is a full-stack blog application that demonstrates user authentication, role-based access control, CRUD operations, and client-server data flow using **React**, **JSON Server**, **Redux**, and **Backend-for-Frontend (BFF)** patterns.

---

## Data Storage Layers

- **Database:** JSON Server (mock REST API)
- **BFF (Backend-for-Frontend):** Manages sessions and unifies data for frontend
- **Redux Store:** Handles UI and client-side state

---

##  Application Entities

###  User
- **Database:** stored in `users` table
- **BFF:** session info (login, password, role)
- **Redux Store:** used to render current user and manage UI state

###  Role
- **Database:** stored in `roles` table
- **BFF:** maps users to roles
- **Redux Store:** used for access control on the client

###  Post
- **Database:** stored in `posts` table
- **Redux Store:** used to list and display individual blog posts

###  Comment
- **Database:** stored in `comments` table
- **Redux Store:** linked to specific posts and shown in UI

---

##  Database Tables (JSON Server)

### `users`
```json
{
  "id": "string",
  "login": "string",
  "password": "string",
  "registered_at": "string",
  "role_id": "string"
}

