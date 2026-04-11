# Student Engineer Design Portfolio

An interactive 3D portfolio built with Next.js, React Three Fiber, GSAP, and Zustand. The home scene acts as a spatial navigation layer with two main portals:

- `projects`: CTMF cards and stakeholder-mapping style case-study links
- `work`: a scroll-driven project timeline with focus zones and invisible tuned hitboxes

## Stack

- Next.js 15
- React 19
- React Three Fiber / Drei / Three.js
- GSAP
- Zustand
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

The default dev server runs at `http://localhost:3000`.

Other useful commands:

```bash
npm run lint
npm run build
npm run start
```

## Project Structure

- [`app/page.tsx`](./app/page.tsx): main 3D portfolio entry
- [`app/components/common`](./app/components/common): canvas shell, debug HUD, shared modal and portal helpers
- [`app/components/experience`](./app/components/experience): portal scenes for projects and work timeline
- [`app/projects`](./app/projects): routed project detail pages
- [`app/ctmfs`](./app/ctmfs): routed CTMF detail pages
- [`app/constants`](./app/constants): project and timeline data, including work focus positions and overlay rectangles
- [`app/stores`](./app/stores): Zustand state for portal transitions and overlay state

## Current Interaction Notes

- Portal return state is preserved so leaving a routed page can restore the matching portal context.
- Work timeline focus is controlled in [`app/constants/work.ts`](./app/constants/work.ts) with `focusProgress`, `focusWidth`, and fixed overlay rectangles.
- The debug HUD can be used to inspect scroll values, cursor position, and active DOM layering while tuning interactions.

## Deployment

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
```

Or:

```bash
docker compose up --build
```
