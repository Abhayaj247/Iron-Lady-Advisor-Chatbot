# 🚀 Iron Lady AI Advisor Chatbot – Quick Setup Guide

This guide helps you run the **Iron Lady AI Advisor Chatbot** locally in just a few minutes.

---

## 🔧 Prerequisites

Make sure the following are installed:

* **Node.js** v18+
* **MongoDB** (local or MongoDB Atlas)
* **Git**

Check versions:

```bash
node --version
mongod --version
git --version
```

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Abhayaj247/iron-lady-advisor-chatbot.git
cd iron-lady-advisor-chatbot
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/iron-lady-chatbot
GROQ_API_KEY=your_groq_api_key_here

FRONTEND_URL=http://localhost:3000
```

### Run Backend

```bash
npm run dev
```

Backend will run at:

* **[http://localhost:5000](http://localhost:5000)**
* Health Check: **[http://localhost:5000/api/health](http://localhost:5000/api/health)**

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
```

### Create `.env` file

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run Frontend

```bash
npm start
```

Frontend will run at:

* **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ MongoDB

### Local MongoDB

Ensure MongoDB is running:

```bash
mongod
```

OR use **MongoDB Atlas** and update `MONGODB_URI` in `backend/.env`.

---

## ✅ Verify Setup

1. Open **[http://localhost:3000](http://localhost:3000)**
2. Send a message in the chat
3. AI should respond
4. Leads should be stored in MongoDB

---

## 🛑 Common Issues

* **MongoDB connection error** → Check MongoDB is running and URI is correct
* **CORS error** → Ensure `FRONTEND_URL=http://localhost:3000`
* **Env variables not loading** → Restart backend & frontend

---

## 📦 Production Build (Optional)

```bash
cd frontend
npm run build
```

Deploy frontend using **Netlify/Vercel** and backend on **AWS/Heroku**.

---

✅ **Done!**

Clone
