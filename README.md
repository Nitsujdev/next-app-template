# Next.js App Template

Ein modernes, produktionsreifes Next.js Template mit Supabase, TypeScript und shadcn/ui.

## 🚀 Features

- **Next.js 16** mit App Router & Turbopack (default)
- **React 19** mit neuesten Features
- **TypeScript** für bessere Developer Experience
- **Tailwind CSS 4** mit shadcn/ui Components
- **Supabase** für Backend-as-a-Service
- **Authentifizierung** mit Google OAuth & Magic Links
- **Responsive Design** mit Mobile-First Approach
- **Form Validation** mit Zod 4
- **Error Handling** mit Toast Notifications (Sonner)
- **Infinite Scrolling** für bessere UX
- **Theme Support** (Light/Dark/System)
- **SEO Optimized** mit Metadata API

## 📋 Voraussetzungen

- Node.js 20.9.0+ (LTS)
- npm, yarn, pnpm oder bun
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
# oder
bun install
```

### 3. Environment Variables

Erstelle eine `.env.local` Datei (kopiere von `env.example`):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Supabase Setup

1. **Projekt erstellen** auf [supabase.com](https://supabase.com)
2. **Database Schema** einrichten (siehe `lib/supabase/database/`)
3. **RPC Functions** einrichten:
   - Öffne den SQL Editor in Supabase
   - Führe die SQL-Dateien aus `lib/supabase/database/` aus
4. **Authentication** konfigurieren:
   - Google OAuth Provider hinzufügen
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`

### 5. Development starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

> **Hinweis:** Turbopack ist in Next.js 16 standardmäßig aktiviert - kein `--turbopack` Flag mehr nötig!

## 🗄️ Database Schema

### Profile Table

```sql
-- Profile table für zusätzliche User-Daten
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE,
  bio TEXT,
  settings JSONB,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

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
$$ language 'plpgsql';

CREATE TRIGGER update_profile_updated_at
  BEFORE UPDATE ON profile
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 🏗️ Projektstruktur

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth Routes (Login, Register)
│   ├── (profile)/         # Protected Routes
│   ├── (public)/          # Public Routes
│   ├── api/               # API Routes
│   ├── globals.css        # Global Styles (Tailwind CSS 4)
│   └── layout.tsx         # Root Layout mit Metadata
├── components/            # React Components
│   ├── ui/               # shadcn/ui Components
│   ├── shared/           # Shared Components
│   ├── public/           # Public Page Components
│   └── theme/            # Theme Provider & Toggle
├── hooks/                # Custom React Hooks
│   ├── useUser.ts        # User Management Hook
│   ├── use-mobile.ts     # Mobile Detection
│   ├── useInfiniteScroll.ts # Infinite Scrolling
│   └── useKeyboardShortcuts.ts # Keyboard Shortcuts
├── lib/                  # Utilities & Config
│   ├── supabase/         # Supabase Client & Functions
│   ├── utils/            # Utility Functions
│   ├── types/            # TypeScript Types
│   ├── constants/        # App Constants
│   └── validations/      # Zod Schemas
├── proxy.ts              # Next.js Middleware (Supabase Auth)
└── public/               # Static Assets
```

## 🎯 Verwendung

### User Management (useUser Hook)

```tsx
import { useUser } from "@/hooks/useUser";

export default function ProfilePage() {
  const {
    user,
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile,
    getDisplayName,
    getAvatarUrl
  } = useUser();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div>
      <h1>Welcome, {getDisplayName()}</h1>
      <img src={getAvatarUrl()} alt="Avatar" />
      <p>Email: {user.email}</p>
      <p>Bio: {profile?.bio}</p>
    </div>
  );
}
```

### Form Validation (Zod + React Hook Form)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const profileSchema = z.object({
  username: z.string().min(3).max(50),
  bio: z.string().max(500).optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileForm) => {
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### Error Handling

```tsx
import { handleError, handleSuccess, handleWarning } from "@/lib/utils/result-handler";

try {
  await someApiCall();
  handleSuccess("Erfolgreich", "Daten wurden gespeichert");
} catch (error) {
  handleError("Fehler", error);
}
```

## 🚀 Deployment

### Vercel (Empfohlen)

1. **Repository** zu GitHub pushen
2. **Vercel Projekt** erstellen und Repository verbinden
3. **Environment Variables** setzen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` (Production URL)
4. **Deploy**

### Andere Plattformen

Das Template funktioniert auch mit:

- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**
- **Cloudflare Pages**

## 🎨 Customization

### Theme anpassen (globals.css)

Das Template verwendet Tailwind CSS 4 mit CSS-first Konfiguration. Passe die Farben in `app/globals.css` an:

```css
@theme static {
  --color-primary: oklch(0.5795 0.233 277);
  --color-secondary: oklch(0.65 0.2406 354.4);
  /* Weitere Farben... */
}
```

### Neue UI Components hinzufügen

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

## 📚 Nützliche Links

- [Next.js 16 Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React 19](https://react.dev)
- [Zod](https://zod.dev)

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
