# IvyBek Lead Form Website

Professional single-page lead capture site for ivybek.com.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** (Navy + Gold brand theme)
- **Supabase** (Postgres database for leads)
- **Vercel** (deployment)

## Local Setup

### 1. Install Node.js
Download from https://nodejs.org (LTS version recommended)

### 2. Install dependencies
```bash
cd ivybek-leads
npm install
```

### 3. Set environment variables
```bash
cp .env.local.example .env.local
```
Edit `.env.local` and add your Supabase credentials.

### 4. Set up Supabase
1. Create a project at https://supabase.com
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Copy your Project URL and Anon Key from Settings → API
4. Paste them into `.env.local`

### 5. Run locally
```bash
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to https://vercel.com → New Project → Import the repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — every push to `main` will auto-deploy

## Form Fields Collected

| Field | Type | Required |
|-------|------|----------|
| student_name | text | Yes |
| grade | select | Yes |
| school | text | No |
| target_universities | multi-select | Yes |
| intended_major | text | No |
| timeline | select | Yes |
| parent_name | text | Yes |
| email | email | Yes |
| phone | tel | Yes |
| how_heard | select | No |
