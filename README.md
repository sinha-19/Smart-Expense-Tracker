# Smart Expense Tracker (React + Firebase + TypeScript)

A **Smart Expense Tracker** web app designed for real-world personal finance management with a modern, responsive UI tailored for Indian users. Built using **React.js**, **TypeScript**, **Firebase** (Authentication & Firestore), **Tailwind CSS**, and **Recharts**. Effortlessly track your income and expenses with real-time sync, beautiful analytics, and seamless user experience.

**Live Demo:**  
👉 [expense-tracker-saket.netlify.app](https://expense-tracker-saket.netlify.app)

---

## 🚀 Overview

Smart Expense Tracker empowers users to:
- Securely log in and manage their own expenses and income.
- Instantly see insights and trends with interactive charts.
- Add, edit, and delete transactions, with all data safely stored in the cloud.
- Enjoy a mobile-first, dark-mode enabled, and visually appealing experience.
- Export transaction records for offline analysis.

Designed for simplicity, speed, and clarity, the app is built to be both beginner-friendly and production-ready, with a focus on Indian currency formatting and localized experience.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (with TypeScript)
- **Backend-as-a-Service:** Firebase (Authentication & Firestore)
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Routing:** React Router
- **State Management:** React Context API

---

## 🏗️ Project Structure & Architecture

```
src/
│
├── components/         # Modular UI building blocks
│   ├── auth/           # Login/Register forms
│   ├── dashboard/      # Dashboard cards, charts, analytics
│   ├── layout/         # Navbar, Footer, Layout wrappers
│   ├── transactions/   # Transaction form & transaction list
│   ├── ui/             # Buttons, toggles, dialogs, etc.
│   └── utils/          # Higher-order components, guards
│
├── contexts/           # Auth, Theme, Transaction Contexts
├── firebase/           # Firebase config & integration
├── pages/              # Main app pages (Dashboard, Profile, Analytics)
├── types/              # Shared TypeScript types/interfaces
├── utils/              # Formatters, helpers, data utilities
├── App.tsx             # App entry, routes, global providers
└── main.tsx            # Bootstrap & render root app
```

### Modular & Scalable Architecture

- **Component-Driven:** UI is broken into small, manageable, and reusable pieces.
- **Context-Based State:** Auth, user, and transaction data use React Context for easy and global state sharing.
- **Full Firebase Integration:** Secure, real-time CRUD operations with Firestore for transactions; Auth for user handling.
- **Responsive Design:** Layouts adapt seamlessly from desktop to mobile, and light to dark mode.
- **Data Visualization:** Analytics are instantly updated with every transaction using Recharts.

---

## 🌟 Key Features

### 1. **User Authentication**
- **Sign Up, Login, Logout:** Secure and fast, powered by Firebase Auth (Email/Password)
- **User Data Isolation:** Each user's transactions are private and stored separately

### 2. **Transaction Management**
- **Add Income/Expense:** Simple form for recording transactions with amount, type, category, note, and date
- **Edit/Delete:** Update or remove transactions anytime
- **Cloud Sync:** All data stored in Firestore, instantly synced across devices

### 3. **Dashboard & Analytics**
- **Overview Cards:** Quick view of income, expenses, and balance for the current month
- **Charts:** Category-wise expense visuals (Pie & Bar charts with Recharts)
- **Recent Transactions:** List of latest activity for quick review

### 4. **Export & Utilities**
- **Export as CSV:** Download your transaction history for offline use
- **(Planned) Export as PDF:** Coming soon!

### 5. **Localization & UI**
- **Indian Rupee (₹):** All values formatted with Indian numbering system
- **Modern UI/UX:** Clean, card-based layout with [Poppins](https://fonts.google.com/specimen/Poppins) font
- **Responsive & Accessible:** Works beautifully on all devices
- **Dark Mode:** Toggle between light and dark themes

---

## 🔐 Firestore Database Structure

```
users (collection)
│
└── {userId} (document)
    │
    └── transactions (subcollection)
         │
         └── {transactionId} (document)
              ├── amount: number
              ├── type: "income" | "expense"
              ├── category: string
              ├── note: string (optional)
              └── timestamp: Firestore timestamp
```

- Each user's data is private, secure, and only accessible after authentication.

---

## 🖼️ Screenshots

Below are real screenshots showing different parts and features of the application:

| ![](./public/1.png) | ![](./public/2.png) | ![](./public/3.png) |
|:-------------------:|:-------------------:|:-------------------:|
| ![](./public/4.png) | ![](./public/5.png) | ![](./public/6.png) |
|        **7**        |                     |                     |
| ![](./public/7.png) |                     |                     |

*Images represent login, dashboard, analytics, add/edit transaction, and other major UI sections.*

---

## ✨ User Flow

1. **Authentication:**  
   New users register or existing users log in. Auth state is managed globally.

2. **Dashboard:**  
   Users are greeted with a summary of their monthly financial activity and visual analytics.

3. **Add/Edit Transactions:**  
   Users create or update transactions (income/expense). Data is validated and written to Firestore.

4. **View & Manage Transactions:**  
   All transactions are listed by date, with options to edit or delete. Charts update live.

5. **Analytics:**  
   Explore category-wise breakdowns and trends in income and spending.

6. **Export Data:**  
   Users can download their transactions as CSV for records or tax purposes.

7. **Settings/Profile:**  
   Update personal info, toggle dark mode, and view author credits.

---

## 🛠️ Setup & Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/sinha-19/smart-expense-tracker.git
   cd smart-expense-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a project in [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** (Email/Password) and **Firestore Database**
   - Copy your Firebase config to `src/firebase/config.ts`:

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

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open App**
   - Visit [http://localhost:5173](http://localhost:5173) or the URL shown in your terminal.

---

## 👨‍💻 Author & Credits

Made with ❤️ by **Saket Kumar Sinha**  
**Email:** imsaket123@gmail.com  
**GitHub:** [sinha-19](https://github.com/sinha-19)  
**Year:** © 2025

---

## 📝 License

This project is open source and free to use for learning and personal use.  
**© 2025 Saket Kumar Sinha. All rights reserved.**

---

## 🤝 Contributing

Beginners welcome!  
- Fork the repo, create a feature branch, and submit a pull request.
- Open issues for bugs, ideas, or questions.

---

## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [React Router](https://reactrouter.com/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)

---

## 📚 Why This Project Shines

- **Full-Stack, Real-Time:** Modern React frontend with real-time Firebase backend.
- **Type Safety:** 100% TypeScript for safer, more maintainable code.
- **Indian-first UX:** All currency is ₹, with Indian number formats and date styles.
- **Analytics at a Glance:** Instantly see where your money goes.
- **Modern, Mobile-Ready:** Responsive, beautiful, and dark-mode enabled.
- **Beginner-Friendly:** Clean folder structure, clear code comments, and extensible design.

---

**⭐️ If you like this project, please star the repo and share it!**  
**Live Demo:** [expense-tracker-saket.netlify.app](https://expense-tracker-saket.netlify.app)
