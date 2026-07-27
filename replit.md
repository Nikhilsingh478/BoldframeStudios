# BoldFrame Studios

A production-grade React + Vite + TypeScript single-page website for BoldFrame Studios.

## Stack
- React 18, TypeScript, Vite 6
- Motion (Framer Motion-compatible API)
- Radix UI primitives
- GSAP + Lenis for animations/smooth scroll
- react-helmet-async for SEO

## Running the app
```
npm run dev
```
Runs on port 5000. The workflow "Start application" handles this automatically.

## Build
```
npm run build
```
Outputs to `dist/`.

## Environment variables
The contact form uses EmailJS. Add these to Replit Secrets if needed:
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_ADMIN_TEMPLATE_ID`

## User preferences
- User will give direct commands; just execute them without asking for confirmation on routine changes.
