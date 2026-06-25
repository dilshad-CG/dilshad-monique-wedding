# Dilshad Saifi & Monique Julius · Wedding Invitation

A luxurious, cinematic, mobile-first digital wedding invitation.

**18 July 2026 · 2:00 PM · The Monarch Hotel, Johannesburg**

## Stack
React · Vite · TypeScript · Tailwind CSS · Framer Motion · React Hook Form · Supabase · Lucide Icons

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (default http://localhost:5173).

## RSVP storage (Supabase)

The site runs in **demo mode** out of the box — RSVPs are simulated locally so
you can preview the full experience. To persist responses:

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) to create
   the `rsvp_guests` table (with insert-only RLS for the public).
3. Copy `.env.example` to `.env.local` and fill in:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
4. Restart the dev server.

## Personalised guest links

Share unique links and the invitation greets each guest by name:

```
/invite/abdul     ->  "Dear Abdul,"
/invite/fatima    ->  "Dear Fatima,"
/invite/guest123  ->  "Dear Guest123,"
```

Hyphens/underscores become spaces (`/invite/fatima-bibi` → "Fatima Bibi") and the
name pre-fills the RSVP form.

## Build

```bash
npm run build
npm run preview
```

## Customising

All wedding details live in [`src/config.ts`](src/config.ts).
Colours, fonts and animations live in `src/styles/` and `tailwind.config.js`.
