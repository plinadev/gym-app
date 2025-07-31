# Gym App 

A full-featured fitness web application built with modern web technologies. Users can register, log in, and manage their fitness journey. Includes authentication, subscriptions, form handling, and admin access.

## Tech Stack

- **Next.js 15**
- **React 19**
- **Tailwind CSS 4**
- **Clerk** – Authentication
- **Supabase** – Database and storage
- **Stripe** – Payment processing
- **Zod** – Schema validation
- **React Hook Form** – Form state management
- **Shadcn UI** – UI primitives
- **Zustand** – Global state management
- **Lucide React** – Icon set
- **Day.js** – Date utilities

## Functionality

### Users
- Register and sign in using Clerk authentication
- View available subscription plans
- Purchase and manage their subscriptions via Stripe
- Access user-specific content

### Admins
- Create, edit, and delete subscription plans
- Manage registered users and Stripe customers
- View user statistics in a dedicated admin dashboard

  
## Environment Variables

To run the app, create a `.env.local` file in the project root with the following:

```env
# Clerk (Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/?form=sign-up

# Supabase (DB/Storage)
SUPABASE_PROJECT_URL=
SUPABASE_API_KEY=

# Stripe (Payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- Stripe & Clerk accounts
- Supabase project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/plinadev/gym-app.git
   cd gym-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your `.env.local` file with the required credentials.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Visit [http://localhost:3000](http://localhost:3000) to start using the app.

