# 📘 Syllabus Search App

A simple React + TypeScript application that allows users to:

* Select a semester from a dropdown
* View available courses in that semester
* Fetch and display a 250–300 word course overview using Cohere AI
* Enjoy a smooth animated typing effect for the overview text

---

## 🧩 Tech Stack

* **Frontend**: React + Vite + TypeScript + Tailwind CSS
* **Backend**: Node.js + Express + TypeScript
* **AI API**: Cohere's text generation endpoint

---

## 📦 Project Structure

```
root/
├── frontend/              # Vite + React + TS client
│   └── src/
│       └── components/
│           └── CourseSearch.tsx
├── api/                   # Express + TypeScript backend
│   └── src/
│       └── index.ts
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js >= 18
* NPM or Yarn
* [Cohere API key](https://dashboard.cohere.com/api-keys)

---

## 🔧 Backend Setup (api/)

1. **Install dependencies**

```bash
cd api
npm install
```

2. **Create a `.env` file**

```env
COHERE_API_KEY=your_cohere_api_key_here
```

3. **Run the backend server**

```bash
npm run dev
```

This starts the Express server on `http://localhost:3001`

---

## 💻 Frontend Setup (frontend/)

1. **Install dependencies**

```bash
cd frontend
npm install
```

2. **Start the development server**

```bash
npm run dev
```

3. Visit `http://localhost:5173` in your browser.

---

## 🌐 API Endpoint

### `POST /api/overview`

**Body**:

```json
{
  "course": "Math 101"
}
```

**Response**:

```json
{
  "overview": "Math 101 is an introductory course..."
}
```

---

## 🧠 Features

* Semester and course dropdown UI
* Cohere AI integration for dynamic course overviews
* Typing animation for better UX
* Tailwind CSS styled layout
* Error handling and loading skeleton UI

---

## ✨ Credits

Built with ❤️  using OpenAI + Cohere

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
