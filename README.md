# VisionAid AI - Web Accessibility Tools

VisionAid AI is a comprehensive web accessibility solution that helps people with color vision deficiency and dyslexia access digital content effortlessly. Built during the Bolt Hackathon, this project demonstrates the power of modern web technologies in creating inclusive digital experiences.

[![Built with Bolt](https://bolt.new/badge.svg)](https://bolt.new)

## Project Links

- **Live Demo**: [https://vision-aid-ai.netlify.app](https://vision-aid-ai.netlify.app)
- **Bolt Project**: [https://bolt.new/~/vision-aid-ai](https://bolt.new/~/vision-aid-ai)
- **Demo Video**: [Watch on YouTube](https://youtu.be/demo)

## Features

### 🔐 Complete Authentication System
- **User Registration**: Secure sign-up with email validation and strong password requirements
- **User Login**: Email/password and Google OAuth authentication
- **Profile Management**: Comprehensive user profile with personal information
- **Security Features**: Password strength validation, secure logout, and session management
- **Protected Routes**: Route-level authentication protection

### 🎨 Color Vision Support
- Real-time color correction for multiple types of color blindness
- Interactive vision simulations
- System-wide color correction via Chrome extension
- Customizable correction settings

### 📖 Dyslexia Support
- Multiple dyslexia-friendly fonts
- Adjustable text spacing and sizing
- Reading ruler for line tracking
- Bionic reading mode
- Text-to-speech with customizable voices

### 🎯 Vision Training
- Interactive exercises for vision improvement
- Progress tracking and high scores
- Multiple exercise types for different vision conditions
- Customizable difficulty levels

## Authentication Setup

### Supabase Configuration

1. **Create a Supabase Project**
   ```bash
   # Visit https://supabase.com and create a new project
   ```

2. **Set Environment Variables**
   ```bash
   # Copy .env.example to .env and fill in your Supabase credentials
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Configure Email Settings (Important for Email Confirmation)**
   
   In your Supabase Dashboard:
   - Go to **Authentication > Settings**
   - **Disable "Enable email confirmations"** for development
   - Or configure SMTP settings for production:
     - Go to **Settings > Auth**
     - Configure SMTP settings with your email provider
     - Set up email templates for confirmation and password reset

4. **Run Database Migrations**
   ```sql
   -- The migration file will automatically create:
   -- - user_profiles table with RLS policies
   -- - Automatic profile creation trigger
   -- - Update timestamp triggers
   ```

5. **Configure Authentication Providers**
   - Enable Email authentication in Supabase Dashboard
   - Configure Google OAuth (optional):
     - Go to **Authentication > Providers**
     - Enable Google provider
     - Add your Google OAuth credentials

### Email Confirmation Issues

If you're not receiving confirmation emails, here are the solutions:

#### Option 1: Disable Email Confirmation (Development)
1. Go to Supabase Dashboard → **Authentication → Settings**
2. Turn OFF "Enable email confirmations"
3. Users can sign up and sign in immediately without email verification

#### Option 2: Configure SMTP (Production)
1. Go to Supabase Dashboard → **Settings → Auth**
2. Configure SMTP settings:
   ```
   SMTP Host: your-smtp-host.com
   SMTP Port: 587 (or 465 for SSL)
   SMTP User: your-email@domain.com
   SMTP Pass: your-app-password
   ```
3. Popular SMTP providers:
   - **Gmail**: smtp.gmail.com (use App Password)
   - **SendGrid**: smtp.sendgrid.net
   - **Mailgun**: smtp.mailgun.org
   - **AWS SES**: email-smtp.region.amazonaws.com

#### Option 3: Use Supabase's Built-in Email (Limited)
- Supabase provides limited email sending for development
- Check your spam folder
- Ensure the email address is valid

### Database Schema

The authentication system uses the following database structure:

```sql
-- User profiles table
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  date_of_birth date,
  phone text,
  website text,
  location text,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Authentication Features

#### Sign Up
- Email validation with regex pattern
- Strong password requirements (8+ chars, uppercase, lowercase, number)
- Password confirmation matching
- Real-time password strength indicator
- Full name collection
- Automatic profile creation via database trigger
- **Email confirmation disabled for development**

#### Sign In
- Email/password authentication
- Google OAuth integration
- Form validation with error handling
- Loading states and user feedback
- Automatic redirect after successful login
- Helpful error messages for common issues

#### Profile Management
- Complete profile form with validation
- Personal information fields (name, bio, phone, website, location)
- Date of birth selection
- Profile update with optimistic UI
- Creation and update timestamps

#### Security
- Row Level Security (RLS) policies
- Protected routes with authentication guards
- Secure session management
- Password strength validation
- Account deletion (placeholder for full implementation)

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for blazing fast development
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Supabase Auth with RLS
- **Database**: PostgreSQL via Supabase
- **State Management**: Zustand for global state
- **Routing**: React Router with protected routes
- **Forms**: Custom form validation and error handling
- **Notifications**: Sonner for toast notifications
- **Icons**: Lucide React for consistent iconography

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vision-aid-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Configure Supabase Authentication**
   - Create a Supabase project
   - Disable email confirmation for development OR configure SMTP
   - Enable email authentication
   - Set up OAuth providers (optional)

5. **Run database migrations**
   ```bash
   # Apply the migration file in your Supabase dashboard
   # or use the Supabase CLI
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## Troubleshooting Email Issues

### Common Problems and Solutions

1. **No confirmation email received**
   - Check spam/junk folder
   - Disable email confirmation in Supabase settings
   - Configure SMTP settings properly

2. **"Email not confirmed" error**
   - Disable email confirmation in Supabase Dashboard
   - Or ensure SMTP is configured correctly

3. **Invalid email format**
   - Ensure email follows standard format
   - Check for typos in email address

4. **SMTP configuration issues**
   - Verify SMTP credentials
   - Check firewall/network restrictions
   - Use app-specific passwords for Gmail

## Authentication Flow

### User Registration
1. User fills out registration form with validation
2. Form validates email format and password strength
3. Supabase creates user account
4. Database trigger automatically creates user profile
5. Email confirmation sent (if enabled) or immediate access (if disabled)
6. User redirected to profile page

### User Login
1. User enters credentials or uses Google OAuth
2. Supabase authenticates user
3. Auth state updated globally via Zustand
4. User redirected to intended page or profile
5. Protected routes become accessible

### Profile Management
1. User accesses account page with tabbed interface
2. Profile form loads existing data from database
3. Real-time validation on form inputs
4. Optimistic updates with error handling
5. Success feedback and data refresh

## Security Considerations

- **Row Level Security**: All database operations are protected by RLS policies
- **Input Validation**: Client and server-side validation for all forms
- **Password Security**: Strong password requirements and secure hashing
- **Session Management**: Automatic token refresh and secure logout
- **Protected Routes**: Authentication guards prevent unauthorized access
- **Error Handling**: Secure error messages that don't leak sensitive information

## Deployment

The application is configured for deployment on Netlify with:
- Automatic builds from Git
- Environment variable configuration
- SPA routing support
- PWA capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the Supabase authentication guides

---

Built with ❤️ for digital accessibility and inclusion.