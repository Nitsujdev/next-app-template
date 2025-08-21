# Next.js App Template

Ein modernes, produktionsreifes Next.js Template mit Supabase, TypeScript und shadcn/ui.

## 🚀 Features

- **Next.js 15** mit App Router
- **React 19** mit neuesten Features
- **TypeScript** für bessere Developer Experience
- **Tailwind CSS 4** mit shadcn/ui Components
- **Supabase** für Backend-as-a-Service
- **Authentifizierung** mit Google OAuth & Magic Links
- **Responsive Design** mit Mobile-First Approach
- **Form Validation** mit Zod
- **Error Handling** mit Toast Notifications
- **Infinite Scrolling** für bessere UX
- **Theme Support** (Light/Dark/System)
- **SEO Optimized** mit Metadata

## 📋 Voraussetzungen

- Node.js 18+
- npm, yarn oder pnpm
- Supabase Account

## 🛠️ Installation

### 1. Template klonen

```bash
git clone <template-repo-url> my-new-app
cd my-new-app
```

### 2. Dependencies installieren

```bash
npm install
# oder
yarn install
# oder
pnpm install
```

### 3. Environment Variables

Erstelle eine `.env.local` Datei:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase Setup

1. **Projekt erstellen** auf [supabase.com](https://supabase.com)
2. **Database Schema** einrichten (siehe unten)
3. **RPC Functions** einrichten:
   - Öffne den SQL Editor in Supabase
   - Führe den SQL-Code aus `database/rpc-functions.sql` aus
4. **Authentication** konfigurieren:
   - Google OAuth Provider hinzufügen
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 5. Development starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

## 🗄️ Database Schema

### Profile Table

```sql
-- Profile table für zusätzliche User-Daten (keine Duplikate von auth.users)
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  -- Nur zusätzliche Felder, die nicht in auth.users sind
  bio TEXT,
  website_url TEXT,
  location TEXT,
  company TEXT,
  job_title TEXT,
  social_links JSONB,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

-- RLS (Row Level Security) aktivieren
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Policies für Profile
CREATE POLICY "Users can view own profile" ON profile
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profile
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profile
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;

$$
language 'plpgsql';

CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RPC Functions for Profile Management
-- Execute the SQL from database/rpc-functions.sql in your Supabase SQL Editor

### Beispiel Profile Data

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "auth-user-id-here",
  "bio": "Full-stack developer passionate about building great user experiences.",
  "website_url": "https://johndoe.dev",
  "location": "Berlin, Germany",
  "company": "Tech Corp",
  "job_title": "Senior Software Engineer",
  "social_links": {
    "twitter": "https://twitter.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  },
  "preferences": {
    "theme": "system",
    "language": "en",
    "timezone": "Europe/Berlin",
    "email_notifications": true,
    "push_notifications": false,
    "marketing_emails": false
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z"
}
```

### Daten aus auth.users (automatisch verfügbar)

```json
{
  "id": "auth-user-id-here",
  "email": "john.doe@example.com",
  "user_metadata": {
    "name": "John Doe",
    "avatar_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z"
}
```

## 🏗️ Projektstruktur

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth Routes (Login, Register)
│   ├── (dashboard)/       # Protected Routes
│   ├── api/               # API Routes
│   ├── globals.css        # Global Styles
│   └── layout.tsx         # Root Layout
├── components/            # React Components
│   ├── ui/               # shadcn/ui Components
│   └── shared/           # Shared Components
├── hooks/                # Custom React Hooks
│   ├── useUser.ts        # User Management
│   ├── use-mobile.ts     # Mobile Detection
│   └── useInfiniteScroll.ts # Infinite Scrolling
├── lib/                  # Utilities & Config
│   ├── supabase/         # Supabase Client
│   ├── utils/            # Utility Functions
│   ├── types/            # TypeScript Types
│   ├── constants/        # App Constants
│   └── validations/      # Zod Schemas
└── public/               # Static Assets
```

## 🎯 Verwendung

### User Management

```tsx
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const {
    user,
    profile,
    loading,
    updateProfile,
    getUserDisplayName,
    getUserAvatar
  } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div>
      <h1>Welcome, {getUserDisplayName()}</h1>
      <img src={getUserAvatar()} alt="Avatar" />
      <p>Email: {user.email}</p>
      <p>Bio: {profile?.bio}</p>
      {/* Profile content */}
    </div>
  );
}
```

### Form Validation

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileForm } from "@/lib/validations";

export default function ProfileForm() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileForm) => {
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{/* Form fields */}</form>
    </Form>
  );
}
```

### Error Handling

```tsx
import { handleError, handleSuccess } from "@/lib/utils/result-handler";

try {
  // API call
  handleSuccess("Erfolgreich gespeichert");
} catch (error) {
  handleError("Fehler beim Speichern", error);
}
```

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Repository** zu GitHub pushen
2. **Vercel Projekt** erstellen
3. **Environment Variables** setzen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Production URL)
4. **Deploy**

### Andere Platforms

Das Template funktioniert auch mit:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

## 🎨 Customization

### Theme anpassen

```tsx
// app/globals.css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Weitere CSS Variables */
  }
}
```

### Neue UI Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
# Weitere Components...
```

### Supabase Functions

```typescript
// lib/supabase/functions.ts
export async function customFunction() {
  const supabase = createClient();
  // Custom logic
}
```

## 📚 Nützliche Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Changes committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📄 License

Dieses Template ist unter der MIT License lizenziert.

## 🆘 Support

Bei Fragen oder Problemen:

1. **Issues** auf GitHub erstellen
2. **Documentation** durchsuchen
3. **Community** um Hilfe bitten

---

**Viel Erfolg mit deiner neuen App! 🚀**
$$
