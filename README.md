# Lil' Andy: AI Creator Matchmaker Take-home

A lightweight version of OWM.ai's AI-powered creator matching experience, Andy. Founders describe their startup and _Lil'_ Andy suggests 3 to 5 fictional but realistic creator partners who would be a strong fit.

**[Live Demo →](https://creator-brand-match-app.vercel.app/)**

**[Loom Walkthrough → (TODO)](https://www.loom.com/)**

## Overview

Founders often know they need creator partnerships but have no idea where to start looking. Lil' Andy closes that gap: you describe your company, audience, and what you're looking for, and Andy returns a shortlist of creator personas tailored to your brand. Each match comes with a specific rationale so you can immediately evaluate fit and take action. I had a great time building this, especially when designing the calm and bright UI/UX.

## Tech Stack

| Layer      | Tech                                             |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 16 (App Router, React Server Components) |
| Language   | TypeScript                                       |
| Styling    | Tailwind CSS v4                                  |
| Database   | PostgreSQL via Supabase                          |
| ORM        | Prisma v6                                        |
| AI         | OpenAI GPT-4o-mini                               |
| Validation | Zod                                              |
| Deployment | Vercel                                           |

## Getting Started

### Prerequisites

1. Node.js v20+
2. A Supabase project (free tier works well)
3. An OpenAI API key

### Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/nikdunna/creator-brand-match-app.git
cd creator-brand-match-app
npm install
```

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Run database migrations against your Supabase instance:

```bash
npx prisma migrate dev --name init
```

Start the development server:

```bash
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) to use the app.

## Architecture

### Data Model

Sessions hold the founder's startup description. Each session has 3 to 5 AI-generated creator matches stored as related rows with cascaded deletion.

```
Session
├── companyName, industry, targetAudience, creatorCriteria
└── CreatorMatch[] (name, platform, handle, niche, audienceSize, oneLiner, matchReason, avatarUrl)
```

Note: Avatar URLs are generated using the creator's name as a seed for a [DiceBear avatar](https://www.dicebear.com/).

### API Design

| Endpoint             | Method | Purpose                                         |
| -------------------- | ------ | ----------------------------------------------- |
| `/api/sessions`      | GET    | List all sessions with match counts             |
| `/api/sessions`      | POST   | Create session, call OpenAI, persist matches    |
| `/api/sessions/[id]` | GET    | Fetch a single session with all creator matches |
| `/api/sessions/[id]` | DELETE | Delete a session and its matches                |

### AI Integration

Andy's system prompt is designed to behave like a "sharp, opinionated matchmaker" rather than a generic assistant. It has explicit understanding of creator ecosystems across YouTube, TikTok, Instagram, X/Twitter, LinkedIn, and podcasts, and is instructed to optimize for audience overlap, authenticity of fit, and commercial usefulness. The prompt includes platform selection guidance so the model picks platforms that actually make sense for the founder's product type (e.g., LinkedIn for a B2B SaaS, TikTok for a DTC consumer brands) rather than defaulting every creator to Instagram or TikTok.

To keep output structured and reliable, the expected shape is defined in the system prompt. To enforce this, the API call uses OpenAI's `response_format: { type: "json_object" }` to force valid JSON on OpenAI's side, combined with a Zod schema (`aiResponseSchema`) that validates the shape of every response. If the model returns malformed output, the system retries up to 2 attempts before surfacing an error. This ensures that the frontend never has to handle partial or broken data.

I chose `gpt-4o-mini` for the balance of speed, cost, and output quality. The creative task here (generating fictional creator personas) doesn't require the reasoning depth of a full GPT-4o call, and the faster response time makes the UX feel snappier. Temperature is set to `0.8` to encourage variety across creator suggestions without sacrificing coherence.

<!-- LOOM: walk through system-prompt.ts, mention the "refrain from" rules, the example output block, and how the prompt prevents repetitive suggestions -->

## Design Decisions

My design goal was a clean, trustworthy interface that feels like a real tool while staying fresh and bright.

**Information hierarchy**. The UI is structured around fast scanning. Users should be able to glance at a session and immediately understand whether the suggested creators are worth exploring. Each card prioritizes important fields while pushing deeper reasoning into a secondary layer. This keeps the interface lightweight without hiding important context. **A key goal was avoiding visual noise**. Instead of relying on heavy gradients, shadows, or animation, the interface uses spacing, typography, and subtle coloring to create a decision-focused hierarchy.

**Color and typography.** The palette is built on slate and beige tones with blue as the primary accent. I chose blue as it signals trust and clarity without competing with the creator card content. _(It's also just a nice color)._ Font-wise, I went with: Satoshi for headings, IBM Plex Mono for structured UI. Perfect combo of warmth and easy-to-read technical info.

**Token system.** All colors are defined as CSS custom properties in `globals.css` and exposed to Tailwind via the `@theme` directive. This means every color in the app references a **single source of truth**, making it straightforward to adjust the palette or add dark mode without touching component files.

**AI output structure**. The system prompt is designed to prioritize specificity, differentiation, and commercial relevance over generic influencer suggestions. Each creator is generated with structured fields (platform, handle, niche, audience size, and reasoning) so the frontend can render consistent, trustworthy cards. The goal was to make the output feel like actionable recommendations rather than AI-generated filler.

**Empty and error states**. The app avoids dead ends. Empty states guide the user toward creating their first match, while error states are explicit and actionable instead of generic failures. This ensures the experience remains usable even when something goes wrong.

**Interactivity.** UI clarity and user intention is key in designing a good UX. Bloating an app with animations and interactivity reduces clarity and makes it difficult for the developer to estimate the user's intent. So, any animations and interactivity applied to cards/buttons are minimal, unobtrusive, and calm.

**Creator cards.** Each card is designed to feel like a real profile: DiceBear avatar, platform handle, niche label, audience size badge, and a one-liner. The "Why this creator?" section is collapsed by default to keep the initial scan clean while letting founders drill into the reasoning on demand. Click on anywhere in the card to open.

**Loading state.** Instead of a generic spinner, I used an animated hand-tapping illustration while Andy generates matches or other session states are loading. Shoutout to [Pradeep Saran](https://uiverse.io/Pradeepsaranbishnoi/tall-fish-38) for creating the cool CSS-only animation (open-sourced)

<!-- LOOM: show the token system in globals.css, talk about spacing and hierarchy choices -->

## Trade-offs and Scope Decisions

1. Pagination: Instead of building pagination into the data flow, I opted for simplicity since the expected session count for a user is low.
2. Authentication: I defined authentication as out of scope as the assignment focuses on the product design, user experience, and AI matching. I think my time was better spent refining the UI/UX and the system prompt.
3. Dark mode: I opted to create a single "light mode" to prioritize a warm and fleshed-out core UX over theme switching.
4. Regenerate matches: One "fork in the road" decision I ran into early-on was the issue of regeneraton. To focus on the core product, I opted to auto-generate matches within the session creation endpoint rather than a separate generation endpoint, removing potential for user-invoked regeneration. The natural next step would be to enable regeneration/matching for creator(s) within a session, essentially refreshing one or all of the creators.

## What I'd Improve With More Time

1. **Dark mode.** The design system is already tokenized, so supporting dark mode is mostly a matter of tuning color values and validating contrast across components. I chose to prioritize a polished light theme first.
2. **Dashboard scalability (search + pagination).** As the number of sessions grows, adding search and pagination would make it easier for founders to revisit and compare past match runs efficiently.
3. **User feedback (toasts).** Lightweight toast notifications for actions like deleting a session or handling errors would improve clarity and reinforce system responsiveness.
4. **Regenerate matches** to allow founders to regenerate creator matches from an existing session would better support exploration and refinement without spawning redundant sessions. This would involve separating generation from the current persistence at the API level.
5. Adding **rate limiting** to the match generation endpoint would help protect the OpenAI API key and prevent abuse, especially in a production setting.
6. **Output quality tuning.** Further iteration on the system prompt and evaluation of generated outputs could improve consistency and differentiation between creator matches. This could include lightweight validation, scoring, or reranking of results.
7. **Landing Page.** A simple landing page would improve first-time user onboarding and better communicate the value of the product before entering the app.
8. **Multi-step refinement.** Introducing a guided refinement loop (e.g., “make these creators more niche” or “focus on smaller audiences”) would allow founders to iteratively shape regeneration results instead of starting from scratch.

## Project Structure

```
app/
├── api/sessions/          REST API routes
├── dashboard/             Session list (server component)
├── new/                   New match form
├── sessions/[sessionId]/  Match detail page + delete
├── layout.tsx             Root layout with header
├── page.tsx               Redirect / to /dashboard.
└── globals.css            Design tokens + Tailwind theme
components/                Shared UI (creator card, session card, modals, etc.)
lib/
├── ai/                    System prompt + OpenAI integration
├── prisma/                Prisma client singleton
└── validation/            Zod schemas and types
prisma/
├── schema.prisma          Data model
└── migrations/            SQL migration history
```
