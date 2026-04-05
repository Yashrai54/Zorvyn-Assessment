# Finance Data summary app with access control

## Project Overview
This is a backend system for managing financial records for each viewer along with RBAC (role-based access control). It contains APIs for user authentication, managing
financial records and providing summaries.

## Tech Stack
Node.js
MongoDB- For faster query retrievals.
Express.js - For building APIs quickly.

## Features
- User and role management 
- Financial CRUD operations
- RBAC using Middleware
- Dashboard Summary API
- Filtering and Pagination

## Role Based Permissions
- Viewer: View Records
- Analyst: View Records + Summaries
- Admin: CRUD

## Authentication 
- This project uses Mock Auth and the userData is passed through request headers.
- Middleware attaches the user, applies RBAC and passes in record routes.

## API Endpoints
### Users
- `POST /users` → Create user
- `GET /users` → Get all users
- `PUT /users/:id` → Update role/status

### Records
- `POST /records` → Create record (Admin only)
- `GET /records` → Get records (with filters + pagination)
- `PUT /records/:id` → Update record (Admin only)
- `DELETE /records/:id` → Delete record (Admin only)

#### Filters:
- `type`
- `category`
- `startDate`, `endDate`
- `page`, `limit`

### Summary
- `GET /summary` → Dashboard data (Admin, Analyst)
Returns:
- Total income
- Total expense
- Net balance
- Category-wise totals
- Recent transactions

## Data Models

### User
- name
- email
- role (viewer | analyst | admin)
- isActive

### Record
- amount
- type (income | expense)
- category
- date
- notes
- createdBy

## Setup Instructions

```bash
git clone https://github.com/Yashrai54/Zorvyn-Assessment
npm install
```
- Create .env file
```bash
MONGO_URI=Your_mongodb_uri
```

- Run server
```bash
nodemon server.js
```

## Assumptions
- Authentication is mocked using headers
- Categories are flexible and not restricted

## Improvements
- JWT-based authentication
- Better validation using libraries ( express-validator)
