/*
  # Initial Schema for SAMAFOOT

  1. New Tables
    - users (authentication and admin users)
    - teams (football clubs)
    - players (football players)
    - matches (football matches)
    - match_events (goals, cards, substitutions)
    - competitions (leagues and cups)
    - competition_standings (team rankings)
    - articles (news and updates)
    - article_tags (categorization)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public access where appropriate

  3. Changes
    - Initial schema creation
    - Set up foreign key relationships
    - Add indexes for performance
*/

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_name text NOT NULL,
  logo_url text,
  founded_year integer,
  stadium text,
  coach text,
  location text,
  colors text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Players table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES teams(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  position text NOT NULL,
  birthdate date,
  nationality text,
  height integer, -- in cm
  weight integer, -- in kg
  jersey_number integer,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  season text NOT NULL,
  start_date date,
  end_date date,
  type text NOT NULL, -- 'league' or 'cup'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions(id),
  home_team_id uuid REFERENCES teams(id),
  away_team_id uuid REFERENCES teams(id),
  match_date timestamptz NOT NULL,
  venue text,
  status text NOT NULL, -- 'scheduled', 'live', 'completed', 'postponed'
  home_score integer DEFAULT 0,
  away_score integer DEFAULT 0,
  attendance integer,
  referee text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Match events table (goals, cards, substitutions)
CREATE TABLE IF NOT EXISTS match_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id),
  player_id uuid REFERENCES players(id),
  event_type text NOT NULL, -- 'goal', 'yellow_card', 'red_card', 'substitution'
  minute integer NOT NULL,
  additional_info jsonb, -- For substitutions: who came off, assist for goals, etc.
  created_at timestamptz DEFAULT now()
);

-- Competition standings table
CREATE TABLE IF NOT EXISTS competition_standings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid REFERENCES competitions(id),
  team_id uuid REFERENCES teams(id),
  position integer NOT NULL,
  played integer DEFAULT 0,
  won integer DEFAULT 0,
  drawn integer DEFAULT 0,
  lost integer DEFAULT 0,
  goals_for integer DEFAULT 0,
  goals_against integer DEFAULT 0,
  points integer DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(competition_id, team_id)
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  author_id uuid REFERENCES auth.users(id),
  status text DEFAULT 'draft', -- 'draft', 'published'
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Article tags table
CREATE TABLE IF NOT EXISTS article_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES articles(id),
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(article_id, name)
);

-- Player statistics table
CREATE TABLE IF NOT EXISTS player_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id),
  competition_id uuid REFERENCES competitions(id),
  appearances integer DEFAULT 0,
  goals integer DEFAULT 0,
  assists integer DEFAULT 0,
  yellow_cards integer DEFAULT 0,
  red_cards integer DEFAULT 0,
  minutes_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(player_id, competition_id)
);

-- Enable Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE competition_standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public can view teams" ON teams FOR SELECT USING (true);
CREATE POLICY "Public can view players" ON players FOR SELECT USING (true);
CREATE POLICY "Public can view competitions" ON competitions FOR SELECT USING (true);
CREATE POLICY "Public can view matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public can view match events" ON match_events FOR SELECT USING (true);
CREATE POLICY "Public can view competition standings" ON competition_standings FOR SELECT USING (true);
CREATE POLICY "Public can view published articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view article tags" ON article_tags FOR SELECT USING (true);
CREATE POLICY "Public can view player statistics" ON player_statistics FOR SELECT USING (true);

-- Create policies for authenticated users (admins)
CREATE POLICY "Admins can manage teams" ON teams FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage players" ON players FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage competitions" ON competitions FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage matches" ON matches FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage match events" ON match_events FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage competition standings" ON competition_standings FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage articles" ON articles FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage article tags" ON article_tags FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY "Admins can manage player statistics" ON player_statistics FOR ALL USING (
  auth.jwt() ->> 'role' = 'admin'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team_id);
CREATE INDEX IF NOT EXISTS idx_matches_competition ON matches(competition_id);
CREATE INDEX IF NOT EXISTS idx_matches_teams ON matches(home_team_id, away_team_id);
CREATE INDEX IF NOT EXISTS idx_match_events_match ON match_events(match_id);
CREATE INDEX IF NOT EXISTS idx_standings_competition ON competition_standings(competition_id);
CREATE INDEX IF NOT EXISTS idx_articles_author ON articles(author_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_article ON article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_player ON player_statistics(player_id);
CREATE INDEX IF NOT EXISTS idx_player_stats_competition ON player_statistics(competition_id);