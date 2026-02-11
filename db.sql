-- Create the Database
CREATE DATABASE IF NOT EXISTS infynd_data_product;
USE infynd_data_product;

-- 1. Companies Table (Core Info)
-- Category: Company
CREATE TABLE companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    website VARCHAR(255),
    phone VARCHAR(50),
    name VARCHAR(255) NOT NULL,
    company_type VARCHAR(100),
    address_line_1 VARCHAR(255),
    city VARCHAR(100),
    region VARCHAR(100),
    postcode VARCHAR(50),
    country VARCHAR(100),
    main_industry VARCHAR(150),
    main_sector VARCHAR(150),
    employees VARCHAR(50),
    revenue VARCHAR(100),
    naics_code INT,
    sic_code INT,
    year_founded INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Company Contacts Table
-- Category: Contact
CREATE TABLE company_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT,
    full_name VARCHAR(255),
    job_title VARCHAR(255),
    email VARCHAR(255),
    title_level VARCHAR(100),
    title_function VARCHAR(100),
    contact_company_name VARCHAR(255), -- 'Company' field under Contact category
    contact_address VARCHAR(255),      -- 'Address' field under Contact category
    contact_postcode VARCHAR(50),     -- 'Postcode' field under Contact category
    linkedin VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 3. Investment & Financial Controls
-- Categories: Capital & Investment History, Financial & Workforce Controls
CREATE TABLE financial_intelligence (
    company_id INT PRIMARY KEY,
    funding_amount VARCHAR(100),
    funding_type VARCHAR(100),
    lead_investor_name VARCHAR(255),
    lead_investor_industry VARCHAR(150),
    no_of_investors VARCHAR(50),
    funding_announced_date DATE,
    director_changes_12m INT,
    senior_hiring_trend VARCHAR(100),
    attrition_rate_estimated VARCHAR(100),
    control_risk_score VARCHAR(50),
    critical_role_vacancies VARCHAR(100),
    key_person_dependency VARCHAR(100),
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 4. Technology & Market Intelligence
-- Categories: Technology Stack Intelligence, Market Positioning & Competitive Intelligence
CREATE TABLE technology_and_market (
    company_id INT PRIMARY KEY,
    technology_product_name VARCHAR(255),
    technology_category VARCHAR(255),
    technology_version VARCHAR(100),
    technology_vendor VARCHAR(255),
    technology_domain VARCHAR(255),
    target_markets TEXT,
    customer_type VARCHAR(100),
    go_to_market_model VARCHAR(255),
    competitive_density VARCHAR(100),
    market_growth_rate VARCHAR(100),
    moat_type VARCHAR(255),
    strategic_position TEXT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 5. Risk, Reputation & Web Visibility
-- Categories: Governance & Risk Posture, Reputation & Trust Signals, Web Authority & Visibility
CREATE TABLE risk_and_web_metrics (
    company_id INT PRIMARY KEY,
    core_product_type VARCHAR(255),
    regulatory_dependency VARCHAR(255),
    compliance_readiness VARCHAR(255),
    ai_act_exposure VARCHAR(255),
    data_privacy_risk VARCHAR(255),
    vendor_lock_in_risk VARCHAR(255),
    glassdoor_rating DECIMAL(3, 2),
    trustpilot_rating DECIMAL(3, 2),
    google_rating DECIMAL(3, 2),
    controversy_flag VARCHAR(100),
    sentiment_score VARCHAR(100),
    thought_leadership_score INT,
    domain_authority INT,
    ranking_keywords VARCHAR(100),
    domain_organic_traffic VARCHAR(100),
    traffic_value VARCHAR(100),
    spam_score DECIMAL(5, 2),
    domain_age_days INT,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 6. Ownership & Corporate Structure
-- Category: Ownership & Corporate Structure
CREATE TABLE corporate_hierarchy (
    company_id INT PRIMARY KEY,
    ultimate_parent_name VARCHAR(255),
    immediate_parent_name VARCHAR(255),
    corporate_group_l1 VARCHAR(255),
    corporate_group_l2 VARCHAR(255),
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);