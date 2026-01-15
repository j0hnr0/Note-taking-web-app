# Note-Taking Web App

## Features

- **Authentication** - Email/password and Google OAuth sign-in
- **Notes Management** - Create, edit, delete, and archive notes
- **Tags** - Organize notes with tags and filter by tag
- **Search** - Full-text search across titles, content, and tags
- **Themes** - Light, dark, and system theme options
- **Fonts** - Choose between sans-serif, serif, or monospace
- **Responsive** - Works on desktop, tablet, and mobile

## Tech Stack

- Next.js 15 (App Router)
- PostgreSQL + Prisma ORM
- NextAuth.js v4
- Redux Toolkit + TanStack Query
- Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/j0hnr0/Note-taking-web-app.git
cd note-taking-web-app

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/notes_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Database Setup

```bash
# Generate Prisma client and apply migrations
npx prisma migrate dev
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
