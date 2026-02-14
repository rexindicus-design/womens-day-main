-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2026 at 07:13 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql8817052`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password_hash` varchar(191) NOT NULL,
  `role` enum('admin','reviewer','viewer') DEFAULT 'viewer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nominations`
--

CREATE TABLE `nominations` (
  `id` int(11) NOT NULL,
  `category` varchar(191) NOT NULL,
  `nominee_name` varchar(191) NOT NULL,
  `gender` enum('Male','Female','Others') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `email_id` varchar(191) NOT NULL,
  `city_district` varchar(100) NOT NULL,
  `designation` varchar(191) NOT NULL,
  `organization` varchar(191) NOT NULL,
  `office_address` text DEFAULT NULL,
  `years_in_org` int(11) DEFAULT NULL,
  `years_in_designation` int(11) DEFAULT NULL,
  `year_of_incorporation` year(4) DEFAULT NULL,
  `revenue` varchar(100) DEFAULT NULL,
  `website_url` varchar(500) DEFAULT NULL,
  `social_media_links` text DEFAULT NULL,
  `sector` varchar(191) NOT NULL,
  `other_sector` varchar(191) DEFAULT NULL,
  `initiative_title` varchar(500) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `innovation_description` text NOT NULL,
  `outcomes_achieved` text NOT NULL,
  `execution_leadership` text NOT NULL,
  `sustain_scale` text DEFAULT NULL,
  `declaration_accepted` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('pending','under_review','shortlisted','selected','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nominations`
--

INSERT INTO `nominations` (`id`, `category`, `nominee_name`, `gender`, `date_of_birth`, `mobile_number`, `email_id`, `city_district`, `designation`, `organization`, `office_address`, `years_in_org`, `years_in_designation`, `year_of_incorporation`, `revenue`, `website_url`, `social_media_links`, `sector`, `other_sector`, `initiative_title`, `start_date`, `end_date`, `innovation_description`, `outcomes_achieved`, `execution_leadership`, `sustain_scale`, `declaration_accepted`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Healthcare Excellence', 'Test After Fix', NULL, NULL, '9876543210', 'test2@example.com', 'Chennai', 'Doctor', 'Test Hospital', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Healthcare', NULL, 'Test Initiative', '2025-01-01', '2025-12-31', 'This is test.', 'Test outcomes.', 'Test leadership.', NULL, 1, 'pending', '2026-02-14 03:15:02', '2026-02-14 03:15:02'),
(2, 'Healthcare Excellence', 'Dr. Priya Sharma', 'Female', '1985-03-15', '9876543210', 'priya.sharma@healthcare.com', 'Chennai', 'Chief Medical Officer', 'Apollo Hospitals', '21 Greams Lane, Chennai 600006', 12, 5, '1983', '500+ Crores', 'https://www.apollohospitals.com', 'https://linkedin.com/in/priyasharma, https://twitter.com/drpriya', 'Healthcare & Hospitals / Public Health', NULL, 'Rural Healthcare Access Initiative - Bringing Quality Healthcare to Underserved Communities', '2023-01-01', '2025-12-31', 'Developed a mobile healthcare unit network covering 50 villages in Tamil Nadu, providing free medical consultations, diagnostic services, and essential medicines to over 100,000 rural residents annually. Implemented telemedicine solutions connecting rural patients with specialists in urban centers.', 'Reduced infant mortality rate by 40% in covered areas. Increased vaccination coverage to 95%. Early detection of chronic diseases improved by 60%. Generated employment for 200 local health workers. Received National Health Award 2024 for excellence in rural healthcare.', 'Led a team of 50 healthcare professionals and 200 community health workers. Secured partnerships with state government and NGOs. Personally supervised training programs and quality audits. Mobilized CSR funding of Rs 10 crores for sustainable operations.', 'Planning expansion to 100 villages by 2027. Developing AI-based diagnostic tools for community health workers. Creating a replicable model for other states.', 1, 'pending', '2026-02-14 03:16:47', '2026-02-14 03:16:47');

-- --------------------------------------------------------

--
-- Table structure for table `nomination_attachments`
--

CREATE TABLE `nomination_attachments` (
  `id` int(11) NOT NULL,
  `nomination_id` int(11) NOT NULL,
  `attachment_number` tinyint(4) NOT NULL,
  `document_name` varchar(191) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `link_url` varchar(500) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nomination_attachments`
--

INSERT INTO `nomination_attachments` (`id`, `nomination_id`, `attachment_number`, `document_name`, `file_path`, `file_url`, `link_url`, `uploaded_at`) VALUES
(1, 2, 1, 'Impact Report 2024', NULL, NULL, 'https://drive.google.com/healthcare-impact-report', '2026-02-14 03:16:47'),
(2, 2, 2, 'Award Certificate', NULL, NULL, 'https://drive.google.com/national-health-award', '2026-02-14 03:16:47'),
(3, 2, 3, 'Media Coverage', NULL, NULL, 'https://timesofindia.com/rural-healthcare-initiative', '2026-02-14 03:16:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `nominations`
--
ALTER TABLE `nominations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_email` (`email_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `nomination_attachments`
--
ALTER TABLE `nomination_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_nomination_id` (`nomination_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nominations`
--
ALTER TABLE `nominations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `nomination_attachments`
--
ALTER TABLE `nomination_attachments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nomination_attachments`
--
ALTER TABLE `nomination_attachments`
  ADD CONSTRAINT `nomination_attachments_ibfk_1` FOREIGN KEY (`nomination_id`) REFERENCES `nominations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
