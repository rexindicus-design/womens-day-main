-- ============================================
-- Women's Day Awards Registration Database Schema
-- Run this script in your MySQL database
-- ============================================

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS womens_day_awards;
USE womens_day_awards;

-- Main nominations table
CREATE TABLE IF NOT EXISTS nominations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Section 0: Category
    category VARCHAR(255) NOT NULL,
    
    -- Section 1: Participant Information
    nominee_name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Others') NULL,
    date_of_birth DATE NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    city_district VARCHAR(100) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    office_address TEXT NULL,
    years_in_org INT NULL,
    years_in_designation INT NULL,
    year_of_incorporation YEAR NULL,
    revenue VARCHAR(100) NULL,
    website_url VARCHAR(500) NULL,
    social_media_links TEXT NULL,
    
    -- Section 2: Case Study
    sector VARCHAR(255) NOT NULL,
    other_sector VARCHAR(255) NULL,
    initiative_title VARCHAR(500) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    innovation_description TEXT NOT NULL,
    outcomes_achieved TEXT NOT NULL,
    execution_leadership TEXT NOT NULL,
    sustain_scale TEXT NULL,
    
    -- Section 4: Declaration
    declaration_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Metadata
    status ENUM('pending', 'under_review', 'shortlisted', 'selected', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_category (category),
    INDEX idx_email (email_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Attachments table (for supporting documents)
CREATE TABLE IF NOT EXISTS nomination_attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomination_id INT NOT NULL,
    attachment_number TINYINT NOT NULL,
    document_name VARCHAR(255) NULL,
    file_path VARCHAR(500) NULL,
    file_url VARCHAR(500) NULL,
    link_url VARCHAR(500) NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (nomination_id) REFERENCES nominations(id) ON DELETE CASCADE,
    INDEX idx_nomination_id (nomination_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Admin users table (for future admin panel)
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'reviewer', 'viewer') DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Sample queries for reference
-- ============================================

-- Get all nominations
-- SELECT * FROM nominations ORDER BY created_at DESC;

-- Get nominations by category
-- SELECT * FROM nominations WHERE category = 'Healthcare Excellence';

-- Get nominations with attachments
-- SELECT n.*, a.document_name, a.file_url, a.link_url 
-- FROM nominations n 
-- LEFT JOIN nomination_attachments a ON n.id = a.nomination_id;

-- Count nominations by status
-- SELECT status, COUNT(*) as count FROM nominations GROUP BY status;

-- Search nominations
-- SELECT * FROM nominations WHERE nominee_name LIKE '%search_term%' OR organization LIKE '%search_term%';
