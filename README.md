<div align="center">

# 🏥 Organ Donation Management System (ODMS)  
### Secure & Efficient Platform for Managing Organ Donations  

</div>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
</p>

---

## 📌 Overview  

The **Organ Donation Management System (ODMS)** is a **secure role-based web platform** designed to **digitize and manage the organ donation lifecycle**.  

It ensures:  
- ✅ Quick and accurate **donor-recipient matching**  
- ✅ Secure handling of **sensitive medical data**  
- ✅ Efficient collaboration between **hospitals, donors, and admins**  
- ✅ Minimal delays in the **organ transplant journey**  

---

## ✨ Features  

- 📊 **Centralized Digital Platform** — Manage donors, recipients, and hospitals in one place  
- 🔒 **Secure Authentication** — JWT-based user login & access control  
- 🏥 **Role-Based Dashboards** — Separate dashboards for **Admin** & **Hospital staff**  
- 🧑‍⚕️ **Admin Dashboard** — View & manage all donors & recipients  
- 🏨 **Hospital Dashboard** — Register & manage donors and recipients  
- ⚡ **Real-Time Matching System** — API to find compatible donors based on **organ type & blood group**  
- 📂 **Secure Record Management** — All sensitive medical data is encrypted & protected  

---

## 🛠️ Tech Stack  

| Layer        | Technologies               | Purpose                              |
|--------------|----------------------------|--------------------------------------|
| **Frontend** | HTML, CSS, Vanilla JS       | Simple and lightweight user interface |
| **Backend**  | Node.js, Express.js         | API and business logic                |
| **Database** | MongoDB + Mongoose          | Data modeling & storage               |
| **Auth**     | JSON Web Tokens (JWT)       | Secure authentication & authorization |

---

## 📁 Folder Structure  

```
├── .gitignore
├── config
    └── db.js
├── controllers
    ├── auth.controllers.js
    ├── donor.controllers.js
    ├── matching.controllers.js
    └── recipient.controllers.js
├── middleware
    └── auth.middleware.js
├── models
    ├── donor.models.js
    ├── recipient.models.js
    └── user.models.js
├── odms-frontend
    ├── app.js
    ├── dashboard.html
    ├── dashboard.js
    ├── index.html
    └── styles.css
├── package-lock.json
├── package.json
├── routes
    ├── auth.routes.js
    ├── donors.routes.js
    ├── matching.routes.js
    └── recipient.routes.js
└── server.js

```

---

## 🧪 Local Development  

### 🔧 Requirements  

- Node.js & npm  
- MongoDB (local or Atlas)  
- Postman (for API testing)  

---

## 🏁 Getting Started  

### 1. Clone the Repo  

```bash
git clone <repository-url>
cd odms
```

### 2. Backend Setup  

```bash
cd odms-backend
npm install
```

Create a `.env` file in the root of `odms-backend` with:  

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=3000
```

Run the server:  

```bash
npm run dev
```

➡️ Backend will run at: **http://localhost:3000**  

---

### 3. Frontend Setup  

```bash
cd odms-frontend
```

- No installation required  
- Open `index.html` in your browser (recommended: use **Live Server in VS Code**)  
- Ensure API endpoints in `app.js` & `dashboard.js` point to:  
  ```
  http://localhost:3000
  ```

---

## 📡 API Endpoints  

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| **POST** | `/api/auth/register` | Register a new user (Admin/Hospital) | ❌ |
| **POST** | `/api/auth/login` | Login user & get JWT | ❌ |
| **POST** | `/api/donors` | Add a new donor | ✅ Hospital/Admin |
| **GET**  | `/api/donors` | Get all donors | ✅ Admin |
| **POST** | `/api/recipients` | Add a new recipient | ✅ Hospital/Admin |
| **GET**  | `/api/matching/:recipientId` | Find compatible donors | ✅ Hospital/Admin |

---

## 🙌 Acknowledgments  

- [Node.js](https://nodejs.org/)  
- [Express.js](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [JWT](https://jwt.io/)  

---

<div align="center">
  Built with ❤️ by Kartik 
</div>
