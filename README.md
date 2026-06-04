# The House Of Overflow

Marketing website for **The House Of Overflow** — a church community focused on faith, purpose, and transformation. Built with Next.js and deployed on [Vercel](https://vercel.com).

## Features

- **Home** — Hero, about, ministries, events, and contact sections
- **Sermons** (`/sermons`) — Browse sermon messages
- **Donate** (`/donate`) — Giving and support information
- Responsive layout with light/dark theme support
- Links to YouTube and external resources

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- [pnpm](https://pnpm.io/) for package management

## Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or newer (20+ recommended)
- [pnpm](https://pnpm.io/installation) 9 or 10

This repo uses `pnpm-lock.yaml`. Use **pnpm**, not `npm ci` (there is no `package-lock.json`).

## Getting started

```bash
git clone https://github.com/Ubaidd1/church_01.git
cd church_01
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start the development server         |
| `pnpm build`  | Create a production build            |
| `pnpm start`  | Serve the production build locally   |
| `pnpm lint`   | Run ESLint via Next.js               |

## Project structure

```
church_01/
├── app/                 # App Router pages and layout
│   ├── page.tsx         # Home
│   ├── sermons/         # Sermons page
│   └── donate/          # Donate page
├── components/          # UI and layout components
│   ├── layout/          # Header, footer
│   └── ui/              # shadcn/ui components
├── public/              # Static images and assets
├── lib/                 # Utilities
└── hooks/               # React hooks
```

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Vercel detects Next.js and uses **pnpm** automatically from `pnpm-lock.yaml`.
4. Build command: `pnpm build` (default). Output: Next.js.

No environment variables are required for the current static site.

## Security note

The project pins `next@15.2.4`, which has known security advisories. When you are ready to upgrade, use a patched release in the 15.2 line (for example `15.2.8` or newer). See the [Next.js security advisories](https://nextjs.org/blog).

## License

Private project. All rights reserved unless otherwise specified by the repository owner.
