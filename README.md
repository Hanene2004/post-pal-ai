# 🚀 Post Advisor AI

> **Advanced AI-Powered Social Media Content Optimizer & Analytics Platform**

Create high-engagement social media posts with platform-specific guidance, AI-driven content analysis, and performance prediction.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)

---

## ✨ Features

### 🎯 AI Creation Suite
- 🤖 **Full Advisor**: Get detailed advice, structure, and algorithm tips for any post topic.
- 🤖 **Engagement Explainer**: Detailed breakdown of predicted performance with actionable "Quick Wins".
- 🪝 **Hook Generator**: Generate 5 attention-grabbing hooks ranked by AI performance prediction.
- ✍️ **Post Rewriter**: AI-powered content improvement with side-by-side comparison and confidence scoring.
- 🎭 **Tone Transformer**: Effortlessly switch between Professional, Casual, Inspiring, and Humorous tones.
- ⚖️ **Post Comparator**: Compare two post drafts to see which one is predicted to win.

### 📊 Smart Analytics & History
- 📈 **Engagement Trends**: Track your predicted performance over time.
- 📊 **Platform Breakdown**: See which platforms are dominating your strategy.
- 💡 **AI Insights**: Personalized recommendations based on your posting history.
- 💾 **Drafts Manager**: Save and manage your AI-optimized content for future use.
- 🔍 **Advanced Filtering**: Find any past post with powerful search and filters.

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Recharts** - Data visualization
- **React Hook Form + Zod** - Form management and validation
- **React Query** - Server state management

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Edge Functions (Deno runtime)
  - Built-in authentication
- **Lovable AI Gateway** - AI integration (Gemini 2.5 Flash)

---

## 📸 Screenshots

### Advanced Creation Tools
![Advisor](./screenshots/advisor.png)

### Engagement Deep Dive
![Engagement Explainer](./screenshots/explainer.png)

### Dashboard Performance
![Dashboard](./screenshots/dashboard.png)

---

## 🧠 Technical Highlights

### 1. Platform Rules Engine
Each platform has specific best practices integrated into the AI prompts:
- **Instagram**: Focus on hooks, carousels, and optimal hashtag count.
- **TikTok**: Immediate impact rules (3-second hook).
- **LinkedIn**: Professional storytelling, Tuesday-Thursday optimization.
- **Twitter/X**: Brevity and thread-first thinking.

### 2. Multi-Model Edge Functions
Individual specialized edge functions handle different AI tasks:
- `generate-post-advice`: The core engine.
- `generate-hooks`: specialized hook variation logic.
- `improve-post`: Before/After comparison and scoring.
- `transform-tone`: Stylistic rewriting.
- `compare-posts`: Metric-based head-to-head comparison.

### 3. Security-First Architecture
Using **Supabase Row Level Security (RLS)** to ensure data privacy:
- Users only access their own results.
- Profiles and drafts linked via Auth UID.

---

## 🚀 Getting Started

1. **Clone & Install**
```bash
git clone <your-repo-url>
npm install
```

2. **Environment Setup**
Create `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

3. **Run Dev Server**
```bash
npm run dev
```

---

## 📈 Roadmap

- [x] **Phase 1: Foundation** (Auth, DB, Basic AI)
- [x] **Phase 2: AI Creation Tools** (Hooks, Rewriter, Tone, Comparator)
- [x] **Phase 3: Storage & Management** (Drafts System, History Search)
- [ ] **Phase 4: Intelligence** (Brand Voice Memory, Content Calendar)

---

## 💡 Why This Project?

**Portfolio Highlights**:
- ✨ Modern full-stack architecture (React + TypeScript + Supabase)
- 🤖 Practical AI integration (structured JSON outputs, specialized prompts)
- 📊 Advanced Data Visualization
- 🎨 Premium UI/UX with glassmorphism and animations
- 🔒 Security-first design (RLS, Auth)
- 🧠 Explainable AI components

---

## 👨‍💻 Author

Built with ❤️ to demonstrate mastery of full-stack AI development.

**⭐ If you found this project useful or inspiring, please give it a star!**
