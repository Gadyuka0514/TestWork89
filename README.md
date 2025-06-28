# DummyShop

A simple e-commerce shop built with Next.js, TypeScript, and DummyJSON API.

## Features

- User authentication with JWT
- Product listing
- Responsive design
- Modern UI/UX

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Zustand (State Management)
- SCSS Modules
- Axios
- ESLint & Prettier
- Stylelint

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:style` - Run Stylelint
- `npm run format` - Format code with Prettier

## Test Account

Choose account in this site https://dummyjson.com/users

## Project Structure

```
src/
  ├── app/              # Next.js app router pages
  ├── components/       # React components
  ├── store/           # Zustand store
  ├── api/             # API services
  ├── types/           # TypeScript types
  └── styles/          # Global styles and variables
```
