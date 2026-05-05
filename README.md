# Cloud / Security Portfolio

Production-oriented personal site built with **Next.js 15**, **TypeScript**, and **CSS** (global tokens + CSS modules). It includes a markdown blog, project case studies, GitHub integration, and a contact form that can send email through **Resend**.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment template and adjust values:

   ```bash
   cp .env.example .env.local
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

### Environment variables

See `.env.example` for the full list. At minimum, set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_AUTHOR_NAME`, and `NEXT_PUBLIC_GITHUB_USERNAME` before deploying so metadata and the GitHub section resolve correctly.

Contact email delivery is optional until you add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (server-side only).

## Content editing

- **Projects:** `src/data/projects.ts` — update copy, slugs, and GitHub URLs.
- **Experience:** `src/data/experience.ts`.
- **Global identity & links:** `src/data/site.ts` or the `NEXT_PUBLIC_*` variables.
- **Blog posts:** add Markdown files under `src/content/blog/` with frontmatter (`title`, `date`, `description`).

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in [Vercel](https://vercel.com) and choose the default Next.js preset.
3. Add the same environment variables from `.env.example` in the Vercel project settings (mark secrets as **Sensitive**).
4. Deploy. Vercel will run `next build` automatically.

Set `NEXT_PUBLIC_SITE_URL` to your production URL so Open Graph and the sitemap use the correct domain.

## Deploy to Netlify

1. Create a new site from Git in [Netlify](https://www.netlify.com) and connect the repository.
2. Build command: `npm run build`.
3. Publish directory: `.next` is not used directly — for Next.js on Netlify, enable the official **Next.js** runtime (Netlify auto-detects) or set:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (when using the Next.js plugin) — follow Netlify’s Next.js documentation for the current recommended plugin settings.
4. Add the same environment variables under **Site settings → Environment variables**.

## Security notes

- Never commit `.env.local` or API keys.
- The contact endpoint validates input, includes a honeypot field, and applies a simple per-IP rate limit (best-effort on serverless — upgrade to Redis/Upstash for strict limits).
- Blog HTML is sanitized with `rehype-sanitize` before rendering.

## Scripts

- `npm run dev` — local development with Turbopack.
- `npm run build` — production build.
- `npm run start` — serve the production build locally.
- `npm run lint` — ESLint.
