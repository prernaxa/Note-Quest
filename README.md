# NoteQuest

NoteQuest is a gamified note-taking web app that combines productivity with RPG-style elements. Users earn XP for taking notes, maintain streaks by logging in daily, and level up as they grow.

---

## Features

- User registration and login system
- Create, edit, and delete notes
- XP rewards and penalties based on actions
- Leveling system with visual feedback
- Daily streak tracker
- XP history log with timestamps
- Animated, responsive dashboard UI
- Theme switching support

---

## XP & Leveling System

| Action                       | XP Change |
|-----------------------------|-----------|
| Create a note               | +10 XP    |
| Edit a note                 | +3 XP     |
| Delete a note               | -2 XP     |
| Login after 1 day (streak)  | +10 XP    |
| Missed 1 day                | -5 XP     |
| Inactive 3+ days            | -10 XP    |

### Level Calculation Formula

```
level = Math.floor(Math.sqrt(xp / 100)) + 1
```

---

## Tech Stack

- **Frontend**: Next.js 13+, Tailwind CSS, Framer Motion
- **Backend**: MongoDB, Mongoose
- **Deployment**: Vercel

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB connection URI (local or Atlas)

### Installation

1. Clone the repository

```bash
git clone https://github.com/prernaxa/Note-Quest.git
cd Note-Quest
```

2. Install dependencies

```bash
npm install
```

3. Create `.env.local` file and add your MongoDB URI

```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## Roadmap / Future Features

- Flashcard-based note review
- Leaderboards and achievements
- Note sharing with other users
- Markdown support in notes
- Mobile view optimizations
- Dark mode toggle

---

## Author

Made with dedication by [Prerna Prakash](https://github.com/prernaxa)
