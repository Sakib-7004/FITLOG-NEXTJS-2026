# FitLog — Workout Library

FitLog is a beginner-friendly Next.js workout library and daily workout planner built for the Programming Hero B14-A6 Fit Log assignment.

## Short Description

Browse workouts from the assignment API, open dynamic workout details, add up to five lifts to today's plan, save workouts for later, and manage the plan from one responsive interface.

## Technologies Used

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- React Context API
- localStorage
- REST API / fetch
- Lucide React icons

## Key Features

1. API-powered workout library with loading and error states.
2. Dynamic workout detail pages using App Router.
3. Today's Plan and Saved lists with Context API and localStorage.
4. Search, sorting, five-workout plan limit, remove and mark-as-done actions.
5. Responsive layout for mobile, tablet and desktop.
6. Toast notifications for plan, saved and completed actions.
7. Custom 404 page and route loading states.
8. Vercel-friendly Next.js deployment structure.

## API

All workouts:
`https://api.abcz.workers.dev/api/fitlog`

Single workout:
`https://api.abcz.workers.dev/api/fitlog/:id`

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Suggested Git Commit Plan

Use at least these 8 meaningful commits when adding the project to your repository:

1. `setup nextjs fitlog project`
2. `added navbar and hero section`
3. `added workout api and library cards`
4. `added dynamic workout details page`
5. `added today's plan card component`
6. `added saved list and context state`
7. `added search sorting localstorage and toast`
8. `added responsive design 404 page and readme`

## Deployment

The project is structured for Vercel deployment. Add the repository to Vercel and deploy with the default Next.js settings.
