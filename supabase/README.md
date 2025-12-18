# ELITE Club - Supabase Database

This directory contains the database schema and configuration for the ELITE Club website.

## Directory Structure

```
supabase/
├── migrations/
│   ├── 001_initial_schema.sql    # Tables, enums, indexes
│   ├── 002_functions.sql         # Database functions & triggers
│   └── 003_rls_policies.sql      # Row Level Security policies
└── README.md
```

## Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your project URL and anon key

### 2. Run Migrations
In the Supabase Dashboard → SQL Editor, run the migrations in order:
1. `001_initial_schema.sql`
2. `002_functions.sql`
3. `003_rls_policies.sql`

### 3. Configure Microsoft OAuth
1. Go to Dashboard → Authentication → Providers
2. Enable Azure (Microsoft)
3. Configure:
   - **Azure Tenant URL**: Your university's Azure AD tenant
   - **Client ID**: From Azure Portal
   - **Client Secret**: From Azure Portal
4. Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`

### 4. Environment Variables
Create `.env.local` in your Next.js project:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Roll Number Format

Format: `cb.sc.u4cse24111`

| Part | Example | Meaning |
|------|---------|---------|
| Branch | `cb` | Coimbatore |
| School | `sc` | School of Computing |
| Program | `u4` | UG 4-year (or `p2` for PG 2-year) |
| Dept | `cse` | Department (CSE, ECE, etc.) |
| Year | `24` | Admission year (2024) |
| Section | `1` | 0=A, 1=B, 2=C, 3=D... |
| Roll | `11` | Roll number in section |

## Schema Overview

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (linked to auth.users) |
| `events` | Event details |
| `event_form_fields` | Dynamic form fields per event |
| `event_registrations` | User registrations |
| `registration_responses` | Form field responses |
| `teams` | Team info for team events |
| `event_announcements` | Event updates |

## Key Features

- **Auto-parse roll number**: Updates branch, school, department, year, section automatically
- **Profile auto-creation**: On Microsoft OAuth signup
- **Dynamic forms**: Create custom form fields per event
- **RLS**: Row Level Security for data protection
