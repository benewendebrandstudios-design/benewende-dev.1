# benewende-dev

Full-stack engineer portfolio with a focus on AI-powered SaaS systems.

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui + Framer Motion
- **Database**: Prisma 5 + SQLite
- **Auth**: NextAuth.js 4
- **AI**: OpenRouter (LLM) + Pixazo (Image)
- **Payments**: CinetPay (Mobile Money Afrique de l'Ouest)
- **Email**: Resend

## Getting Started

```bash
npm install
cp .env.example .env  # Fill in your API keys
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` - SQLite database path
- `NEXTAUTH_SECRET` / `NEXTAUTH_URL`
- `OPENROUTER_API_KEY` - AI suggestions
- `PIXAZO_API_KEY` - Image generation
- `RESEND_API_KEY` - Email notifications
- `CINETPAY_API_KEY` / `CINETPAY_SITE_ID` / `CINETPAY_SECRET_KEY` - Payments
