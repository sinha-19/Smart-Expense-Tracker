# Smart Expense Tracker (React + Firebase + TypeScript)

A **Smart Expense Tracker** built with **React.js + TypeScript**, **Firebase** (Authentication & Firestore), **Tailwind CSS**, and **Recharts**. Track your income and expenses with real-time data, beautiful analytics, and a simple, modern UI. Designed for Indian users with ₹ currency formatting.

---

![Dashboard Screenshot](./public/screenshot.png)

---

## 🛠️ Tech Stack

- **React.js** + **TypeScript** (for type safety and better editor support)
- **Firebase** (Authentication & Firestore)
- **Tailwind CSS** for styles
- **Recharts** for data visualization
- **React Router** for page navigation

> **Note:**  
> This project uses TypeScript, but all code is beginner-friendly and well-commented.  
> If you are new to TypeScript, don’t worry—just follow along!

---

## 🏗️ Folder Structure

```
src/
│
├── components/
│   ├── auth/               # Login/Register forms (.tsx)
│   ├── dashboard/          # Summary cards, charts (.tsx)
│   ├── layout/             # Navbar, Footer (.tsx)
│   ├── transactions/       # Transaction form & list (.tsx)
│   ├── ui/                 # Reusable UI elements (.tsx)
│   └── utils/              # ProtectedRoute, helpers (.tsx)
│
├── contexts/               # Auth, Theme, Transaction Contexts (.tsx)
├── firebase/               # Firebase config (.ts)
├── pages/                  # Main app pages (Dashboard, Profile, etc) (.tsx)
├── types/                  # Shared TypeScript types (.ts)
├── utils/                  # Formatters, helpers (.ts)
├── App.tsx                 # App routes & context providers
└── main.tsx                # Entry point
```

---

## 🚀 Features

- **User Authentication**: Sign Up, Login, and Logout using Firebase Auth
- **Dashboard**: View current month's income, expenses, and balance
- **Visual Analytics**: Category-wise expense distribution with Pie/Bar charts (Recharts)
- **Transaction Management**:
  - Add, edit, delete income or expenses
  - Each transaction includes amount, type, category, note, and timestamp
  - All data stored securely in Firestore per user
- **Responsive Design**: Fully mobile-friendly with Tailwind CSS
- **Dark Mode Toggle**: Switch between light and dark themes
- **Export Options**: Download your transactions as CSV (and PDF soon)
- **Indian Rupee (₹)**: All currency shown as ₹ with Indian number formatting
- **Modern UI/UX**: Built with Poppins font, clean cards, and easy navigation
- **Author Credits**: Made by Saket Sinha, 2025. Author info in Profile.

---

## 🛠️ Setup & Installation

1. **Clone this repo**

```bash
git clone https://github.com/sinha-19/smart-expense-tracker.git
cd smart-expense-tracker
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

- Go to [Firebase Console](https://console.firebase.google.com/), create a new project.
- Enable **Authentication** (Email/Password) and **Firestore Database**.
- Copy your Firebase config and paste it inside `src/firebase/config.ts`:

```typescript
// src/firebase/config.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
```

4. **Run the app**

```bash
npm run dev
```

---

## 📋 Firestore Structure

- **Collection:** `users`
  - **Document:** `{userId}`
    - **Subcollection:** `transactions`
      - **Document:** `{transactionId}`
        - `amount`: number
        - `type`: "income" | "expense"
        - `category`: string
        - `note`: string (optional)
        - `timestamp`: Firestore timestamp

---

## 🎨 UI/UX

- **Font:** [Poppins](https://fonts.google.com/specimen/Poppins)
- **Colors:** Primary Blue (`#3B82F6`), Accent Green (`#10B981`), Neutral tones
- **Modern Indian localization:** ₹ currency, Indian date & number formats
- **Clean, card-based layouts with proper spacing**
- **Footer includes author credits and copyright**

---

## 👨‍💻 Author & Credits

Made with ❤️ by **Saket Sinha**  
**Email:** saketsinha19@gmail.com  
**GitHub:** [sinha-19](https://github.com/sinha-19)  
**Year:** © 2025

---

## 📱 Screenshots

| Dashboard | Add Transaction | Analytics |
|-----------|----------------|-----------|
| ![](./public/dashboard.png) | ![](./public/add-transaction.png) | ![](./public/analytics.png) |

---

## 📝 License

This project is open source and free to use for learning purposes.  
**© 2025 Saket Sinha. All rights reserved.**

---

## ✨ Notable Content & Learning

- **Firebase Auth & Firestore**: No backend server needed—everything is serverless!
- **React Context**: Clean state management for users, transactions, and theme
- **Recharts**: Instant, beautiful visuals for your expenses
- **Tailwind CSS**: Fully responsive and easy to customize
- **Beginner-Friendly**: 
  - Simple folder structure
  - Clear code comments and documentation
  - Modern look, but easy to understand and extend

---

## 🤝 Contributing

Beginners welcome!  
Feel free to fork, open issues, or suggest improvements.

---

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [React Router](https://reactrouter.com/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)

---

**If you like this project, please ⭐️ the repo and share with your friends!**
