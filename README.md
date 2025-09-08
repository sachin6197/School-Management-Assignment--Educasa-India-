# School Management Assignment (Educasa India)
Node.js APIs for School Management

# School Management APIs

A Node.js + Express + MySQL backend that allows you to **add schools** and **list schools sorted by distance** from a user’s location using the Haversine formula.  

This project was created as an **assignment** to demonstrate backend API development skills.

---

##  Features
- Add a new school with name, address, latitude, and longitude.
- List all schools sorted by nearest to a given location.
- MySQL database with prepared statements for safety.
- Input validation using `express-validator`.
- Modular folder structure (controllers, routes, middlewares, utils).
- Postman collection included for easy testing.

---

## 🗂️ Project Structure

school-api/
├─ server.js
├─ package.json
├─ .env.example
├─ sql/
│ └─ init.sql
├─ src/
│ ├─ app.js
│ ├─ config/db.js
│ ├─ controllers/schoolController.js
│ ├─ routes/schoolRoutes.js
│ ├─ middlewares/
│ │ ├─ validate.js
│ │ └─ errorHandler.js
│ └─ utils/haversine.js
└─ postman/
└─ SchoolAPIs.postman_collection.json

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone 
cd school-api
npm install

