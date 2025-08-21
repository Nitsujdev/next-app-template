-- RPC Functions for User Profile Management
-- Execute these in your Supabase SQL Editor

-- Function to get user profile with auth data
CREATE OR REPLACE FUNCTION get_user_profile_with_auth(user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'profile', p,
    'auth_user', json_build_object(
      'id', u.id,
      'email', u.email,
      'user_metadata', u.raw_user_meta_data,
      'created_at', u.created_at,
      'updated_at', u.updated_at
    )
  ) INTO result
  FROM auth.users u
  LEFT JOIN profile p ON u.id = p.user_id
  WHERE u.id = user_id;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user profile
CREATE OR REPLACE FUNCTION update_user_profile(
  user_id UUID,
  profile_updates JSONB
)
RETURNS JSON AS $$
DECLARE
  updated_profile JSON;
BEGIN
  -- Update profile with provided data
  UPDATE profile 
  SET 
    bio = COALESCE(profile_updates->>'bio', bio),
    website_url = COALESCE(profile_updates->>'website_url', website_url),
    location = COALESCE(profile_updates->>'location', location),
    company = COALESCE(profile_updates->>'company', company),
    job_title = COALESCE(profile_updates->>'job_title', job_title),
    social_links = COALESCE(profile_updates->'social_links', social_links),
    preferences = COALESCE(profile_updates->'preferences', preferences),
    updated_at = NOW()
  WHERE profile.user_id = update_user_profile.user_id
  RETURNING to_json(profile.*) INTO updated_profile;
  
  -- If profile doesn't exist, create it
  IF updated_profile IS NULL THEN
    INSERT INTO profile (
      user_id,
      bio,
      website_url,
      location,
      company,
      job_title,
      social_links,
      preferences
    ) VALUES (
      user_id,
      profile_updates->>'bio',
      profile_updates->>'website_url',
      profile_updates->>'location',
      profile_updates->>'company',
      profile_updates->>'job_title',
      profile_updates->'social_links',
      profile_updates->'preferences'
    )
    RETURNING to_json(profile.*) INTO updated_profile;
  END IF;
  
  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create user profile if it doesn't exist
CREATE OR REPLACE FUNCTION create_user_profile_if_not_exists(
  user_id UUID,
  profile_data JSONB DEFAULT '{}'::jsonb
)
RETURNS JSON AS $$
DECLARE
  existing_profile JSON;
  new_profile JSON;
BEGIN
  -- Check if profile already exists
  SELECT to_json(profile.*) INTO existing_profile
  FROM profile
  WHERE profile.user_id = create_user_profile_if_not_exists.user_id;
  
  -- If profile exists, return it
  IF existing_profile IS NOT NULL THEN
    RETURN existing_profile;
  END IF;
  
  -- Create new profile
  INSERT INTO profile (
    user_id,
    bio,
    website_url,
    location,
    company,
    job_title,
    social_links,
    preferences
  ) VALUES (
    user_id,
    profile_data->>'bio',
    profile_data->>'website_url',
    profile_data->>'location',
    profile_data->>'company',
    profile_data->>'job_title',
    profile_data->'social_links',
    profile_data->'preferences'
  )
  RETURNING to_json(profile.*) INTO new_profile;
  
  RETURN new_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_user_profile_with_auth(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_user_profile(UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_profile_if_not_exists(UUID, JSONB) TO authenticated;
