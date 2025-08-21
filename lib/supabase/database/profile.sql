
 * CREATE TABLE profile (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
 *   bio TEXT,
 *   website_url TEXT,
 *   location TEXT,
 *   company TEXT,
 *   job_title TEXT,
 *   social_links JSONB,
 *   preferences JSONB,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );