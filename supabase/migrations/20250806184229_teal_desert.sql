-- SAMAFOOT Database Schema for MySQL
-- Version: 1.0
-- Database: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS samafoot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE samafoot;

-- Teams table
CREATE TABLE teams (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100) NOT NULL,
    logo_url TEXT,
    founded_year INT,
    stadium VARCHAR(255),
    coach VARCHAR(255),
    location VARCHAR(255),
    colors VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Players table
CREATE TABLE players (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    team_id CHAR(36),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    birthdate DATE,
    nationality VARCHAR(100),
    height INT, -- in cm
    weight INT, -- in kg
    jersey_number INT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Competitions table
CREATE TABLE competitions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    season VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE,
    type ENUM('league', 'cup') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE matches (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    competition_id CHAR(36),
    home_team_id CHAR(36),
    away_team_id CHAR(36),
    match_date DATETIME NOT NULL,
    venue VARCHAR(255),
    status ENUM('scheduled', 'live', 'completed', 'postponed') NOT NULL DEFAULT 'scheduled',
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    attendance INT,
    referee VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Match events table
CREATE TABLE match_events (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    match_id CHAR(36),
    player_id CHAR(36),
    event_type ENUM('goal', 'yellow_card', 'red_card', 'substitution') NOT NULL,
    minute INT NOT NULL,
    additional_info JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

-- Competition standings table
CREATE TABLE competition_standings (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    competition_id CHAR(36),
    team_id CHAR(36),
    position INT NOT NULL,
    played INT DEFAULT 0,
    won INT DEFAULT 0,
    drawn INT DEFAULT 0,
    lost INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    points INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    UNIQUE KEY unique_competition_team (competition_id, team_id)
);

-- Users table for authentication
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role ENUM('admin', 'editor', 'user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE articles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(500) NOT NULL,
    content LONGTEXT NOT NULL,
    image_url TEXT,
    author_id CHAR(36),
    status ENUM('draft', 'published') DEFAULT 'draft',
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Article tags table
CREATE TABLE article_tags (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    article_id CHAR(36),
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_article_tag (article_id, name)
);

-- Player statistics table
CREATE TABLE player_statistics (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    player_id CHAR(36),
    competition_id CHAR(36),
    appearances INT DEFAULT 0,
    goals INT DEFAULT 0,
    assists INT DEFAULT 0,
    yellow_cards INT DEFAULT 0,
    red_cards INT DEFAULT 0,
    minutes_played INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
    FOREIGN KEY (competition_id) REFERENCES competitions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_player_competition (player_id, competition_id)
);

-- Create indexes for better performance
CREATE INDEX idx_players_team ON players(team_id);
CREATE INDEX idx_matches_competition ON matches(competition_id);
CREATE INDEX idx_matches_home_team ON matches(home_team_id);
CREATE INDEX idx_matches_away_team ON matches(away_team_id);
CREATE INDEX idx_matches_date ON matches(match_date);
CREATE INDEX idx_match_events_match ON match_events(match_id);
CREATE INDEX idx_match_events_player ON match_events(player_id);
CREATE INDEX idx_standings_competition ON competition_standings(competition_id);
CREATE INDEX idx_standings_team ON competition_standings(team_id);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_article_tags_article ON article_tags(article_id);
CREATE INDEX idx_player_stats_player ON player_statistics(player_id);
CREATE INDEX idx_player_stats_competition ON player_statistics(competition_id);

-- Insert sample data for testing
INSERT INTO teams (id, name, short_name, logo_url, founded_year, stadium, coach, location, colors) VALUES
(UUID(), 'ASC Jaraaf', 'Jaraaf', 'https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&w=100', 1969, 'Stade Demba Diop', 'Malick Daf', 'Dakar', 'Green and White'),
(UUID(), 'Casa Sports', 'Casa', 'https://images.pexels.com/photos/1005697/pexels-photo-1005697.jpeg?auto=compress&cs=tinysrgb&w=100', 1960, 'Stade Aline Sitoe Diatta', 'Ansou Diadhiou', 'Ziguinchor', 'Yellow and Green'),
(UUID(), 'AS Douanes', 'Douanes', 'https://images.pexels.com/photos/1146278/pexels-photo-1146278.jpeg?auto=compress&cs=tinysrgb&w=100', 1980, 'Stade Amadou Barry', 'Mamadou Guèye', 'Dakar', 'Blue and White'),
(UUID(), 'Génération Foot', 'GF', 'https://images.pexels.com/photos/3775708/pexels-photo-3775708.jpeg?auto=compress&cs=tinysrgb&w=100', 2000, 'Stade Déni Biram Ndao', 'Balla Djiba', 'Dakar', 'Red and White'),
(UUID(), 'Teungueth FC', 'TFC', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100', 2010, 'Stade Ngalandou Diouf', 'Ndiambour Pape', 'Rufisque', 'Red and Black'),
(UUID(), 'US Gorée', 'Gorée', 'https://images.pexels.com/photos/18685188/pexels-photo-18685188/free-photo-of-circular-emblem-of-a-professional-football-team.jpeg?auto=compress&cs=tinysrgb&w=100', 1933, 'Stade Demba Diop', 'Mbaye Badji', 'Gorée Island', 'Red and Yellow');

-- Insert sample competition
INSERT INTO competitions (id, name, season, start_date, end_date, type) VALUES
(UUID(), 'Ligue 1 Sénégalaise', '2023-2024', '2023-09-01', '2024-06-30', 'league');

-- Insert default admin user (password: admin123)
INSERT INTO users (id, email, password_hash, first_name, last_name, role) VALUES
(UUID(), 'admin@samafoot.sn', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'SAMAFOOT', 'admin');