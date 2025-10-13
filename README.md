JasstejTrace.exe — Developer + Cybersecurity Portfolio
======================================================

An immersive cyberpunk portfolio for Jasstej Singh Marwaha. Built with Next.js 14 (App Router) + TypeScript, Tailwind CSS v4, Framer Motion, GSAP/Three.js, and shadcn/ui.

Features
- Boot sequence with typed terminal lines
- Neon cyberpunk theme with scanlines, CRT flicker, glassmorphism
- Interactive background (React Three Fiber point field)
- Terminal overlay (Ctrl+K) with commands: about, skills, projects, achievements, blog, contact, trace, theme
- Sections: Hero, About, Skills, Projects (modal typed logs), Achievements, Blog/Logs, Contact
- Hidden route: /trace (update panel)

Tech Stack
- Next.js 14 + TypeScript
- Tailwind CSS v4
- Framer Motion, react-typed
- React Three Fiber + Drei + Three.js
- shadcn/ui components

Getting Started
1. Install dependencies
	```bash
	npm install
	```
2. Run the dev server
	```bash
	npm run dev
	```
3. Open http://localhost:3000

Hidden Update Panel (/trace)
- Navigate to /trace to open the hidden update panel.
- Click Unlock and enter the access key. Default: `jasstej`.
- Optional: set NEXT_PUBLIC_TRACE_KEY in your environment to change the key.
- The panel lets you:
	- Add/remove achievements with image URLs, issuers, verify links, and notes.
	- Update social links (GitHub, LinkedIn, Instagram, etc.).

Storage Notes
- Content updates are saved to localStorage on your device under key `jasstejtrace.content.v1`.
- To reset to defaults, use the Reset button in the panel or clear localStorage for this site.

Keyboard Shortcuts
- Ctrl+K: Open terminal overlay

Project Structure
- app/: Next.js app router pages
- components/: Reusable UI, sections, background, terminal
- public/: Static assets

Customization
- Edit theme colors and effects in app/globals.css
- Update skills, projects, and achievements in their respective components
- Replace links and social handles in Contact section

Deployment
- Vercel recommended: connect repo and deploy
- Or build locally
  ```bash
  npm run build
  npm start
  ```

License
This project is provided as-is for personal portfolio use.
