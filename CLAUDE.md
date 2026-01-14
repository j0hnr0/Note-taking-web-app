# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Build for production (includes Prisma client generation)
npm run build

# Production server
npm start

# Linting
npm run lint

# Generate Prisma client manually
npx prisma generate

# Create and apply database migrations
npx prisma migrate dev --name <migration_name>

# Open Prisma Studio (database GUI)
npx prisma studio

# Push schema changes without creating migration
npx prisma db push

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.2.8 (App Router)
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: NextAuth.js v4 with dual providers (Credentials + Google OAuth)
- **State Management**: Redux Toolkit (UI state), React Context (auth/preferences), TanStack Query (server state)
- **Styling**: Tailwind CSS v4
- **Email**: Nodemailer

### Project Structure

```
/app
  /api                      # Backend API routes (REST endpoints)
  /all-notes               # Main notes page + Redux store
  /archived-notes          # Archive management pages
  /contexts                # React Context providers (auth, fonts)
  /provider                # Provider wrappers (Redux, Query, NextAuth, themes)
  /lib                     # Service layer (business logic)
    ├── user-service.js    # User CRUD, auth validation, password management
    ├── note-service.js    # Note CRUD, archive, search, tags
    ├── prisma.js          # Prisma client singleton
    └── email.js           # Nodemailer email service
  /_universal-components   # Shared UI components
  /tags                    # Tag-based filtering pages
  /settings                # User preferences
  middleware.js            # Route protection (session validation)
/prisma
  schema.prisma            # Database models (User, Note)
```

### State Management Strategy

Three-layer approach:
1. **Redux Toolkit** (`/app/all-notes/store/notes-slice.js`): UI state only (note editor open/closed, current note title)
2. **React Context**: Authentication state (wraps NextAuth) and user preferences (fonts, themes)
3. **TanStack Query**: Server state caching, automatic refetching

Provider hierarchy: `ThemesProvider > FontProvider > NextAuthSessionProvider > AuthProvider > TanstackProvider > ReduxProvider`

### Database Models

**User**:
- Dual authentication: `password` (credentials) + `googleId` (OAuth)
- `provider` field differentiates auth method
- `resetToken` + `resetTokenExpiry` for password reset flow
- One-to-many relationship with Notes

**Note**:
- `tags` stored as `String[]` (array, not separate relation)
- `isArchive` boolean flag for soft archival
- Cascade delete with User (notes deleted when user deleted)

### Authentication Flow

NextAuth configuration at `/app/api/auth/[...nextauth]/route.js`:
- **CredentialsProvider**: Validates email/password via `validateCredentials()` (bcryptjs)
- **GoogleProvider**: Auto-creates users via `createGoogleUser()` on first login
- JWT strategy with 30-day expiration
- Session object includes: `{ id, email, provider, name, image }`

Middleware protects routes: `/all-notes/*`, `/archived-notes/*`, `/tags/*`, `/settings/*`

### API Route Pattern

All API routes follow this structure:
```javascript
// 1. Validate session
const session = await getServerSession(authOptions);
if (!session?.user?.id) return 401 Unauthorized

// 2. Extract userId
const userId = session.user.id;

// 3. Call service function
const result = await serviceFunction({ userId, ...data });

// 4. Return appropriate status
```

Key endpoints:
- `/api/note/create` - POST new note
- `/api/note/fetch` - GET all user notes
- `/api/note/update?id=<noteId>` - PATCH note
- `/api/note/delete` - DELETE note
- `/api/note/search?query=<q>&archive=<bool>` - GET search results
- `/api/note/archive-note` - POST archive
- `/api/note/restore-note` - POST restore
- `/api/note/get-tags` - GET unique tags
- `/api/note/get-tag-note` - GET notes by tag

### Service Layer Architecture

Business logic is separated from API routes in `/app/lib/`:

**user-service.js**:
- `validateCredentials()` - bcryptjs password verification
- `createUser()` - with duplicate email checking
- `updatePassword()` - verifies old password first
- `sendResetPasswordLink()` / `resetPasswordThroughLink()` - email-based password reset
- **Security**: Never returns passwords, blocks password operations for Google users

**note-service.js**:
- Smart update logic: only persists changed fields (compares existing vs. new)
- Tag normalization: trim + capitalize (first letter uppercase)
- `searchAllNotes()` - case-insensitive search via Prisma `contains` mode
- `getUserTags()` - aggregates unique tags across user's notes
- `getTagNotes()` - filters notes by tag

### Environment Variables Required

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
EMAIL_USER=<Gmail address>
EMAIL_PASSWORD=<Gmail app password>
```

## Key Architectural Patterns

1. **Service Layer Separation**: All database operations go through `/app/lib/` service functions, not directly in API routes
2. **Session-Based Authorization**: Every protected route validates `session.user.id` matches the requested resource's `userId`
3. **Smart Updates**: Only changed fields are persisted (prevents unnecessary DB writes and preserves timestamps)
4. **Tag Array Storage**: Tags stored as `String[]` in Note model (simpler than separate relation, faster queries)
5. **Cascade Deletes**: Notes auto-delete when parent user is deleted (`onDelete: Cascade`)
6. **Dual Auth Strategy**: System handles both credentials and OAuth users differently (e.g., Google users can't reset passwords)
7. **Force Dynamic Pages**: Pages use `export const dynamic = 'force-dynamic'` to prevent static generation

## Security Implementation

- **Password Hashing**: bcryptjs with 12 rounds
- **JWT Sessions**: Managed by NextAuth, stored as HTTP-only cookies
- **Reset Tokens**: Crypto-generated with 1-hour expiry, validated server-side
- **Authorization**: Every API route verifies session userId matches resource ownership
- **SQL Injection**: Prevented by Prisma parameterized queries
- **Provider Restrictions**: Google users blocked from password operations

## Development Notes

- **Prisma Client**: Regenerated on `npm install` (postinstall script) and during builds
- **Database Changes**: After modifying `schema.prisma`, run `npx prisma migrate dev` or `npx prisma db push`
- **Local Fonts**: Three custom fonts loaded from `/public/fonts/` (Inter, Noto Serif, Source Code Pro)
- **Responsive Design**: Separate mobile/desktop components, breakpoint at 1024px
- **Search**: Case-insensitive full-text search across title, content, and tags using Prisma's `contains` filter

## Responsive Design Status

### Overall Status: 100% Responsive ✓

All 13 pages and 40 components are now fully responsive across all breakpoints. The app uses custom breakpoints (1025px, 769px, 476px) for responsive behavior with excellent mobile/desktop component separation patterns.

### Components Improved (2026-01)

All components have been updated with responsive max-widths for optimal tablet support (< 769px):

**High-Visibility Components (Tier 1):**
- **CreateNoteForm** - Added `max-custom-md:max-w-full` (line 93)
- **UpdateNoteForm** - Added `max-custom-md:max-w-full` (line 102)
- **Header** - Search container now uses `max-custom-md:w-auto` (line 13)
- **NotesList** - Added `max-custom-md:max-w-full` (line 54)

**Settings Components (Tier 2):**
- **ColorOptions** - Added `max-custom-md:max-w-full` (line 37)
- **Theme** - Added `max-custom-md:max-w-full` (line 25)
- **FontOptions** - Added `max-custom-md:max-w-full` (line 29)
- **ChangePasswordOptions** - Added `max-custom-md:max-w-full` (line 55)
- **Input** - Added `max-custom-md:max-w-full` (line 27)
- **Options** - Added `max-custom-md:max-w-full` (line 15)
- **ApplyChangesBtn** - Added `max-custom-md:max-w-full` to container (line 3) and button (line 6)

**Other Components (Tier 3):**
- **NoteSettings** - Added `max-custom-md:max-w-full` (line 8)
- **Search** - Added `max-custom-md:max-w-full` (line 26)
