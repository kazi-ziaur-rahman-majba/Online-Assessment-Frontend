Online Assessment Platform Frontend
Live Demo: https://akij-online-assessment.vercel.app/

Tech Stack

Next.js 14 (App Router)
Tailwind CSS
TanStack Query
React Hook Form + Zod
Axios
lucide-react

Getting Started
Prerequisites

Node.js 18+

Setup
```bash
npm install
npm run dev
```
Open http://localhost:3000
Environment Variables
Create a .env.local file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Test Credentials
Employer
```
Email: employer@example.com
Password: 123456
```
Candidate 1
```
Email: candidate@example.com
Password: 123456
```
Candidate 2
```
Email: candidatetwo@example.com
Password: 123456
```
Additional Questions
MCP Integration
I have not worked with MCP (Model Context Protocol) directly. However in this project MCP could be used in the following ways:

Figma MCP: Automatically convert Figma designs into React components
Supabase MCP: Directly interact with the database using natural language
Chrome DevTools MCP: Debug and inspect the frontend in real-time using AI assistance

AI Tools Used

Claude Code: Used for generating boilerplate code, fixing bugs, and writing logic
GitHub Copilot: Used for code completion and suggestions during development

Offline Mode
If a candidate loses internet during an exam:

Store all exam questions in localStorage when the exam starts
Save answers in localStorage as the candidate progresses
Use a service worker to detect when connection is restored
Automatically sync and submit saved answers when back online
Show a clear offline indicator so the candidate knows progress is saved locally"**