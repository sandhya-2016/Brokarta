# Brokarta - B2B Real Estate Ecosystem & Dynamic CMS
Brokarta is a high-performance B2B real estate platform designed to streamline co-broking, property inventory sharing, and client lead acquisition for verified real estate brokers, agencies, and enterprises. 

The application combines a visually interactive marketing website built with 3D WebGL graphics and smooth animations, with a dynamic content-managed admin back-office and lead pipeline management system.

---

## Overview

Brokarta addresses the fragmented nature of modern real estate co-broking by providing:
- **Interactive Marketing Portal**: Rich visual experience showcasing platform capabilities, broker workflows, testimonials, and dynamic inquiry forms.
- **Dynamic Content Management System (CMS)**: Admin tools to configure on-page copy, SEO metadata, story panels, dynamic URLs, and customer testimonials without code redeployments.
- **Lead Capture & CRM Pipeline**: Inbound lead capturing system supporting custom inquiry classifications (`BROKER`, `AGENCY`, `OTHERS`), lead statuses (`PENDING`, `CONTACTED`, `QUALIFIED`, `CLOSED`, `REJECTED`), and lead auditing.
- **Comprehensive Security & Audit System**: Secure JWT-based authentication via NextAuth.js and structured audit logs for all administrative modifications.

---

## Features

### 🌐 Public Marketing Portal
- **Hero & Interactive 3D Canvas**: Powered by Three.js (`@react-three/fiber`), `@firecms/neat` fluid gradient shaders, and custom WebGL packet flow animations.
- **Smooth Physics & Scrolling**: Integrated Lenis smooth scroll and GSAP scroll-triggered animations.
- **Dynamic Lead Acquisition**: Interactive "Connect Now" inquiry flow with form validation (`React Hook Form` + `Zod`).
- **Dynamic CMS Copy & SEO**: Server/Client context providers render live database-stored page text and SEO tags.

### 🛡️ Admin Dashboard (Back-Office)
- **Role-Based Authentication**: Protected `/admin/*` routes powered by NextAuth.js JWT session strategy.
- **Lead Pipeline Management**: View, filter, update statuses, and audit inbound leads from prospective clients.
- **Testimonial Management**: Drag-and-drop / sortable community feedback cards with active toggles.
- **Story Panel & Workflow Builder**: Manage interactive storytelling cards, bullet points, accent colors, and background gradients.
- **SEO & Text Content Manager**: Live edit meta titles, canonical URLs, OG images, and site-wide copy strings.
- **URL Directory Management**: Configurable dynamic application links across navigation and CTA buttons.
- **Audit Logging**: Immutably records admin activities (login, create, update, delete) with IP address tracking.

---

## Tech Stack

### **Frontend**
- **Framework**: Next.js 16 (App Router, React 19, React Compiler enabled)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), Custom CSS
- **Animation & 3D**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `@firecms/neat`, GSAP (`@gsap/react`), Framer Motion, Lenis Smooth Scroll
- **Icons**: Lucide React, Phosphor Icons, React Icons
- **Form Handling & Validation**: React Hook Form, Zod

### **Backend & Database**
- **API Runtime**: Next.js App Router API Route Handlers
- **Authentication**: NextAuth.js v4 (Credentials Provider with `bcryptjs` password hashing)
- **Database ORM**: Prisma ORM v5
- **Database Engine**: PostgreSQL

---

## Architecture

```
                                +---------------------------+
                                |      Browser Client       |
                                +-------------+-------------+
                                              |
                        +---------------------+---------------------+
                        |                                           |
                        v                                           v
       +---------------------------------+         +---------------------------------+
       |    Public Marketing Portal      |         |     Protected Admin Portal      |
       |  (Next.js App Router / RSC)     |         |  (NextAuth JWT & Middleware)    |
       +----------------+----------------+         +----------------+----------------+
                        |                                           |
                        +---------------------+---------------------+
                                              |
                                              v
                               +-----------------------------+
                               | Next.js API Route Handlers  |
                               +--------------+--------------+
                                              |
                                              v
                               +-----------------------------+
                               |     Prisma ORM Layer        |
                               +--------------+--------------+
                                              |
                                              v
                               +-----------------------------+
                               |     PostgreSQL Database     |
                               +-----------------------------+
```

---

## Folder Structure

```
Brokarta/
├── prisma/
│   ├── schema.prisma              # PostgreSQL database models & enums
│   └── seed.js                    # Database seed script for initial data
├── public/                        # Static public assets and media
├── src/
│   ├── app/                       # Next.js App Router pages and API routes
│   │   ├── (marketing)/           # Public marketing pages group
│   │   │   ├── about-us/          # About page
│   │   │   ├── become-a-user/     # Broker onboarding page
│   │   │   ├── connect-now/       # Lead intake form page
│   │   │   ├── what-we-offer/     # Platform feature breakdown
│   │   │   ├── privacy-policy/    # Legal privacy policy
│   │   │   ├── terms-of-service/  # Legal terms
│   │   │   └── cookie-policy/     # Cookie policy
│   │   ├── admin/                 # Protected CMS admin management pages
│   │   │   ├── dashboard/         # Metrics overview
│   │   │   ├── leads/             # Lead management CRM table
│   │   │   ├── community/         # Testimonials editor
│   │   │   ├── pages-management/  # Page text editor
│   │   │   ├── seo/               # SEO metadata manager
│   │   │   ├── url-management/    # Dynamic URL manager
│   │   │   └── audit-logs/        # System audit logs
│   │   └── api/                   # REST API route handlers
│   ├── components/                # Reusable React components
│   │   ├── about-us/              # Component section modules
│   │   ├── become-a-user/         # Onboarding timeline components
│   │   ├── connect-now/           # Form step components
│   │   ├── layout/                # Navigation, Header, Footer, Providers
│   │   ├── ui/                    # Base UI buttons, inputs, modals
│   │   └── welcome/               # 3D WebGL Canvas & Hero story section
│   ├── config/                    # Site metadata and constants
│   ├── lib/                       # Utilities (Prisma client, audit, helpers)
│   └── proxy.js                   # Middleware proxy handler for NextAuth
├── .env                           # Environment configuration
├── next.config.mjs                # Next.js compiler configuration
├── package.json                   # Project metadata & dependency manifest
└── README.md                      # Documentation
```

---

## Installation

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` or `v24.x`
- **npm**: `v9.x` or higher
- **PostgreSQL**: `v14` or higher running locally or hosted (e.g. Supabase, Neon)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/brokarta.git
   cd brokarta
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy or create `.env` in the root directory:
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database & Run Migration**:
   ```bash
   npx prisma db push
   ```

5. **Seed Initial Database Data**:
   ```bash
   npx prisma db seed
   ```

---

## Environment Variables

Configure the following key-value pairs in your `.env` file:

```env
# PostgreSQL Database Connection String
DATABASE_URL="postgresql://postgres:password@localhost:5432/brokarta?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-super-secret-key-32-chars-min"
NEXTAUTH_URL="http://localhost:3000"

# Initial Admin Credentials (used by seed script)
ADMINEMAIL="admin@brokarta.com"
ADMINPASSWORD="8989"
```

---

## Configuration

- **Next.js**: Defined in `next.config.mjs` with React Compiler enabled and unoptimized image support.
- **Tailwind CSS**: PostCSS integration via `@tailwindcss/postcss`.
- **Prisma**: Database client generation and model migrations in `prisma/schema.prisma`.

---

## Running Locally

Start the Next.js development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Build

To compile a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

---

## Development

- Run linter checks:
  ```bash
  npm run lint
  ```
- Inspect Prisma DB GUI:
  ```bash
  npx prisma studio
  ```

---

## Usage

### Public Portal
- Navigate to `/` to view the 3D interactive landing experience.
- Visit `/connect-now` to submit inquiry requests.

### Admin Portal
- Navigate to `/admin/login`.
- Login using seeded credentials:
  - **Email**: `admin@brokarta.com`
  - **Password**: `8989`
- Manage inbound leads, update dynamic text, adjust SEO settings, and inspect audit logs.

---

## API Documentation

### Public Endpoints
- `POST /api/connect-now` - Submit a new lead inquiry.
- `GET /api/testimonials` - Retrieve active community testimonials.
- `GET /api/story-panels` - Fetch story panel content.
- `GET /api/workflow-items` - Fetch workflow item cards.

### Admin Endpoints (Requires NextAuth Session)
- `POST /api/admin/login` - Authenticate admin credentials.
- `GET /api/admin/me` - Fetch authenticated admin profile.
- `GET / POST / PUT / DELETE /api/admin/leads` - Manage lead status and details.
- `GET / POST / PUT / DELETE /api/admin/testimonials` - Manage community testimonials.
- `GET / PUT /api/admin/page-texts` - Manage page copy keys.
- `GET / PUT /api/admin/seo` - Update page meta title and SEO tags.
- `GET /api/admin/audit-logs` - Retrieve system action logs.

---

## Database

### Schema Overview

| Model | Purpose |
| :--- | :--- |
| `AdminUser` | Admin user accounts with role authorization |
| `AuditLog` | Comprehensive record of administrative modifications |
| `Lead` | Customer leads captured from the Connect Now flow |
| `CommunityTestimonial` | Customer reviews & testimonials |
| `StoryPanel` & `StoryBullet` | Interactive story cards on marketing pages |
| `WorkflowItem` | Product workflow steps |
| `SEOPage` | Meta titles, descriptions, OG images, canonical links |
| `PageText` | Editable copy keys across website pages |
| `AppUrl` | Managed dynamic URLs across buttons and navigation |

---

## Authentication

Authentication is built using **NextAuth.js v4**:
- **Strategy**: JSON Web Tokens (JWT)
- **Protection**: Secured via server route guards in Next.js middleware / proxy handler (`src/proxy.js`)
- **Password Security**: Passwords hashed with `bcryptjs` (salt rounds: 10)

---

## Deployment

Deployable to standard Node.js environments or serverless platforms supporting Next.js (e.g. Vercel, AWS Amplify, Railway, DigitalOcean App Platform):

1. Provision a PostgreSQL instance.
2. Set environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
3. Run `npx prisma db push` during build phase.
4. Run `npm run build` and `npm run start`.

---
## Troubleshooting

### Issue: `401 Unauthorized` on Admin Login
- Verify that `npx prisma db seed` has been run.
- Check that `ADMINEMAIL` in `.env` matches the record in your database (`admin@brokarta.com`).

### Issue: Prisma Database Connection Failed
- Ensure your local or remote PostgreSQL instance is running.
- Verify `DATABASE_URL` format in `.env`.
