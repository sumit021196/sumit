# Sumit - Full Stack Developer Portfolio

A modern, responsive portfolio website showcasing my work as a Full Stack Developer. Built with React 18, Material-UI, and Supabase, featuring authentication, blog system, and admin dashboard.

![Portfolio Preview](https://img.shields.io/badge/React-18-blue) ![Material-UI](https://img.shields.io/badge/Material--UI-5.15.10-blue) ![Supabase](https://img.shields.io/badge/Supabase-2.76.1-green) ![Vite](https://img.shields.io/badge/Vite-4.5.0-purple)

## Features

### Frontend
- **Modern UI/UX** - Built with Material-UI v5 components
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for engaging interactions
- **Performance Optimized** - Code splitting, lazy loading, and image optimization
- **SEO Ready** - React Helmet for meta tags and structured data
- **PWA Support** - Service workers for offline functionality

### Authentication & User Management
- **Multi-provider Auth** - Email/password and Google OAuth via Supabase
- **User Profiles** - Automatic profile creation with role-based access
- **Protected Routes** - Role-based access control (User/Admin)
- **Session Management** - Persistent authentication with auto-refresh

### Content Management
- **Blog System** - Dynamic blog with infinite scroll and lazy loading
- **Admin Dashboard** - Content management for administrators
- **Contact Forms** - Integrated contact system with Supabase backend

### Developer Experience
- **Vite Build Tool** - Fast development and optimized production builds
- **TypeScript Ready** - Modern ES6+ with proper TypeScript setup
- **ESLint** - Code quality and consistency
- **Sitemap Generation** - SEO-optimized sitemap creation
- **Bundle Analysis** - Performance monitoring and optimization

## Tech Stack

### Frontend
- **React 18** - Latest React with hooks and concurrent features
- **React Router v6** - Client-side routing with lazy loading
- **Material-UI v5** - Modern component library
- **Framer Motion** - Animation library
- **React Helmet Async** - SEO and meta management

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
  - PostgreSQL Database
  - Authentication & Authorization
  - Real-time subscriptions
  - File storage

### Build & Dev Tools
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing and optimization
- **Workbox** - PWA and service worker management

### APIs & Services
- **News API** - Real-time news integration
- **Stock API** - Financial data integration
- **QR Code Generation** - Dynamic QR code creation

## Prerequisites

- **Node.js** (v18 or later)
- **npm** (v9 or later)
- **Supabase Account** (for backend services)
- **Google Cloud Console** (for OAuth setup)

## Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd sumit
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase
1. Create a project at [Supabase](https://app.supabase.com/)
2. Go to **Settings > API** and copy your project details
3. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Configure Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. In Supabase Dashboard:
   - Go to **Authentication > Providers**
   - Enable **Google** provider
   - Add your Client ID and Client Secret

### 5. Set Up Database Tables
Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create trigger for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'user'
  ) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### 6. Start Development Server
```bash
npm run dev
```

The app will be available at **http://localhost:3000**

## Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run test         # Run tests with Vitest
```

### SEO & Deployment
```bash
npm run generate-sitemap    # Generate sitemap
npm run submit-sitemap      # Submit sitemap to search engines
npm run deploy              # Build and deploy with sitemap
```

### Analysis
```bash
npm run analyze             # Bundle size analysis
npm run build:sitemap       # Build with sitemap generation
```

## Project Structure

```bash
src/
├── components/          # Reusable UI components
│   ├── HeroSection.jsx  # Landing page hero
│   ├── Navbar.jsx       # Navigation component
│   └── ...
├── pages/              # Route components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── Projects.jsx    # Portfolio projects
│   ├── Blog.jsx        # Blog listing
│   ├── Profile.jsx     # User profile
│   └── admin/          # Admin dashboard
├── contexts/           # React contexts
│   └── AuthProvider.jsx # Authentication context
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

## Configuration

### Environment Variables
```env
# Supabase
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# APIs (Optional)
VITE_WORLD_NEWS_API_KEY=your-news-api-key
VITE_RAPIDAPI_KEY=your-rapid-api-key
VITE_RAPIDAPI_HOST=your-api-host
```

### Vite Configuration
- **Port**: 3000 (development)
- **HMR**: Hot module replacement enabled
- **Build**: Optimized for production

## Key Features Explained

### Authentication Flow
- Users can sign up/login with email or Google OAuth
- Automatic profile creation on signup
- Role-based access control (User/Admin)
- Protected routes for authenticated users

### Performance Optimizations
- **Code Splitting**: Routes are lazy-loaded
- **Image Optimization**: Lazy loading with intersection observer
- **Bundle Analysis**: Regular performance monitoring
- **Caching**: Service worker implementation

### SEO Features
- **Meta Tags**: Dynamic meta descriptions
- **Structured Data**: Schema markup for search engines
- **Sitemap**: Automatic sitemap generation
- **Performance**: Core Web Vitals monitoring

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Set environment variables in your hosting dashboard
4. Enable automatic deployments for continuous integration

### Environment Setup for Production
Make sure to update your environment variables:
- `VITE_SUPABASE_URL` - Your production Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Your production anon key

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is private and proprietary.

## Contact

**Sumit** - Full Stack Developer
- Email: sumitmeshram.ece@gmail.com
- LinkedIn: [Your LinkedIn Profile]
- Portfolio: [Your Portfolio URL]

---

Built with ❤️ using React, Material-UI, and Supabase
