---
name: testing-nexatech-website
description: Test the NexaTech Solutions website end-to-end. Use when verifying UI sections, navigation, contact form, or responsive design.
---

# Testing NexaTech Solutions Website

## Local Setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default (port may increment if occupied).

## Build & Lint

```bash
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
```

## Key Sections to Test

The website is a single-page app with anchor-based navigation. All sections are on one page:

| Section | Anchor | What to verify |
|---------|--------|----------------|
| Hero | `#hero` | Badge text, title with gradient, 2 CTA buttons, 4 stat boxes |
| About | `#about` | Heading, 4 value cards (Innovation, Partnership, Quality, Agile) |
| Services | `#services` | 6 service cards in grid with icons and tech tags |
| Portfolio | `#portfolio` | 6 project cards with colored banners and category labels |
| Team | `#team` | 4 team member cards with avatars, roles, bios |
| Testimonials | `#testimonials` | 3 testimonial cards with 5-star ratings |
| Contact | `#contact` | Form with validation; submitting shows "Message Sent!" success |
| Footer | bottom | 3 link columns, social icons, dynamic copyright year |

## Interactive Features to Test

1. **Navbar smooth scroll** — Click any navbar link; page should scroll to the correct section and URL hash should update.
2. **Navbar scroll effect** — After scrolling >50px, navbar should get white background with shadow (`navbar--scrolled` class).
3. **Contact form** — Fill required fields (name, email, message), click "Send Message". Form should be replaced by success message. If required fields are empty, browser validation should prevent submission.
4. **Mobile hamburger menu** — At viewport width ≤900px, navbar links collapse into a hamburger menu that opens a side drawer.

## Responsive Breakpoints

- `900px` — Navbar becomes hamburger; grids go from 3-col to 2-col
- `768px` — About/Contact go single-column; hero stats go 2x2
- `600px` — Service/Portfolio/Team cards go single-column
- `480px` — Footer goes single-column

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Pure CSS with CSS custom properties (no UI libraries)
- ESLint for linting

## Devin Secrets Needed

No secrets required — this is a static frontend website with no backend or API dependencies.
