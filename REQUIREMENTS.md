# InFynd Web - Requirements Document

## Project Overview

**Project Name:** InFynd Data Product Platform  
**Type:** B2B Data Products E-Commerce & Discovery Platform  
**Tech Stack:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui  
**Repository:** infynd-web

---

## Executive Summary

InFynd is a comprehensive B2B data product platform that enables businesses to discover, compare, and acquire various types of business intelligence data products. The platform specializes in providing enterprise-grade contact data, company intelligence, and market research data across multiple categories including postal, telemarketing, email, healthcare, and more.

---

## 1. System Architecture

### 1.1 Frontend Architecture
- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite 5.4.19
- **UI Library:** shadcn/ui (Radix UI components)
- **Styling:** Tailwind CSS 3.4.17
- **Routing:** React Router DOM 6.30.1
- **State Management:** TanStack React Query 5.83.0
- **Animations:** Framer Motion 12.33.0
- **Data Visualization:** Recharts 2.15.4

### 1.2 Backend Architecture
- **Runtime:** Node.js with Express 4.19.2
- **Database:** MySQL
- **ORM:** Prisma 5.14.0
- **Authentication:** CORS enabled
- **API Style:** RESTful

### 1.3 Development Environment
- **Package Manager:** npm (with bun.lockb present)
- **Testing:** Vitest 3.2.4 + Testing Library
- **Linting:** ESLint 9.32.0
- **TypeScript:** 5.8.3

---

## 2. Core Features & Functionality

### 2.1 Home Page (Index)

#### Features:
1. **AI-Powered Search Experience**
   - Multi-stage search flow with visual animations
   - Stages: Initial → Scanning → Module Selection → Results
   - Keyword-based product matching
   - Country/region detection from queries
   - Real-time search visualization with world map

2. **Prompt-Based Discovery**
   - Pre-defined prompt chips for quick searches
   - Examples:
     - "Show me UK email data for retail"
     - "What telemarketing data is TPS screened?"
     - "Compare postal vs email coverage"
   - Natural language query processing

3. **Product Comparison Intent Detection**
   - Detects comparison keywords ("compare", "differentiate")
   - Auto-navigates to Compare page with pre-selected products
   - URL query parameter support for product initialization

4. **Visual Elements**
   - Animated world map showing global coverage
   - Country-specific data point visualization
   - Stage-based progress indicators
   - Smooth transitions and micro-animations

#### Technical Implementation:
```typescript
- Keyword mapping for products and countries
- Product matching algorithm
- Multi-stage state management
- Map coordinate system for country visualization
- Framer Motion animations
```

---

### 2.2 Data Products Catalog

#### Features:
1. **Product Grid Display**
   - 3-column responsive grid
   - Product cards with:
     - Icon and name
     - Tagline and description
     - Total records count
     - Country coverage
     - Compliance standards (GDPR, PECR, etc.)
   
2. **Product Selection & Comparison**
   - Select up to 3 products for comparison
   - Checkbox-based selection
   - Visual feedback for selected products
   - Sticky comparison bar at bottom

3. **Inline Comparison Table**
   - Side-by-side product comparison
   - Attributes compared:
     - Total Records
     - Countries
     - Category
     - Compliance Standards
     - Use Cases
     - Fields Available

4. **Custom Data CTA**
   - Dedicated section for custom dataset requests
   - Contact form integration

#### Product Categories:
1. **Postal** (Direct Mail Data)
2. **Tele** (Telemarketing Data - TPS Screened)
3. **Email** (B2B Email Data)
4. **Healthcare** (HCP & Pharma Data)
5. **New Business** (New Company Registrations)
6. **SOHO** (Micro-business Data)
7. **POI** (Points of Interest)
8. **Enrichment** (Data Enhancement Services)

---

### 2.3 Individual Product Pages

#### Features:
1. **Product Header**
   - Product name, icon, and tagline
   - Breadcrumb navigation
   - Category badge
   - Total records and country count

2. **Tabbed Content Sections**
   - **Overview Tab:**
     - Product description
     - "Why InFynd?" key differentiators
     - Use cases with icons
     - Related products carousel

   - **Coverage Tab:**
     - Region selector (UK, US, Europe, Global, etc.)
     - Coverage breakdown by country
     - Industry distribution
     - Interactive country list

   - **Sample Data Tab:**
     - Company data samples
     - Contact data samples
     - Add-on field previews
     - Real data examples

   - **Data Dictionary Tab:**
     - Complete field listing
     - Field descriptions
     - Source type information
     - Update frequency
     - Confidence scores
     - Data grouping

   - **Build Process Tab:**
     - Step-by-step data building process
     - Quality assurance steps
     - Compliance verification

   - **Filled Rates Tab:**
     - Data completeness metrics
     - Company vs. People data comparison
     - Field-by-field completion rates
     - SDM vs. Non-SDM breakdown

3. **Add-Ons Section**
   - Expandable add-on cards
   - Additional field categories:
     - Firmographics
     - Financial Intelligence
     - Technology Stack
     - Market Positioning
     - Governance & Risk
     - Web Authority

4. **Related Products Carousel**
   - Smart product recommendations
   - Quick navigation to similar products

5. **Call-to-Action Section**
   - Contact form integration
   - Pricing inquiry

---

### 2.4 Product Comparison Page

#### Features:
1. **Product Selection**
   - Dropdown selectors for up to 3 products
   - Add/remove product slots dynamically
   - URL query parameter support (`?ids=product1,product2`)

2. **Comparison Table**
   - Side-by-side attribute comparison
   - Attributes:
     - Total Records
     - Countries
     - Category
     - Compliance
     - Use Cases
     - Fields Available

3. **Dynamic Product Switching**
   - Real-time table updates
   - Persistent comparison via URL

---

### 2.5 Use Cases Page

#### Features:
1. **Use Case Categories:**
   - Run outbound sales campaigns
   - Target new business registrations
   - Market to healthcare professionals
   - Enrich and cleanse CRM
   - Reach micro-businesses and sole traders
   - Plan retail store locations

2. **Product Recommendations**
   - Context-aware product suggestions
   - Direct links to recommended products
   - Icon-based visual identification

---

### 2.6 Compliance & Trust Page

#### Features:
1. **Compliance Sections:**
   - **GDPR Compliance**
     - Article 6(1)(f) processing basis
     - LIA assessments
     - Data subject rights
     - ICO registration

   - **PECR & ePrivacy**
     - TPS/CTPS/MPS screening
     - Monthly suppression updates
     - Consent management

   - **Suppression & DNC**
     - Preference service integration
     - Gone-away/deceased suppression
     - Custom suppression lists

   - **Data Sourcing Transparency**
     - Provenance tracking
     - Source documentation
     - Quality audits

   - **Security & Audit**
     - ISO 27001 alignment
     - SOC 2 Type II compliance
     - Encryption standards
     - Penetration testing

   - **Documentation**
     - DPA availability
     - Privacy Impact Assessments
     - ROPA maintenance
     - Breach notification procedures

---

### 2.7 About Page

#### Features:
- Company information
- Mission and values
- Team presentation
- Contact details

---

## 3. Data Model

### 3.1 Product Data Structure


### 3.2 Database Schema (MySQL via Prisma)
**File:** `server/prisma/schema.prisma`

#### Tables:

1. **companies**
   - Core company information
   - Fields: name, website, phone, address, industry, sector, employees, revenue, NAICS/SIC codes

2. **company_contacts**
   - Contact person details
   - Fields: full_name, job_title, email, title_level, title_function, LinkedIn

3. **financial_intelligence**
   - Investment and financial data
   - Fields: funding details, investor information, director changes, hiring trends

4. **technology_and_market**
   - Tech stack and market positioning
   - Fields: technology products, target markets, competitive analysis

5. **risk_and_web_metrics**
   - Risk assessment and web presence
   - Fields: compliance data, reputation ratings, domain authority, traffic metrics

6. **corporate_hierarchy**
   - Ownership structure
   - Fields: parent companies, corporate groups



#### Relations Included:
- contacts
- financial
- technology
- risk_and_web
- corporate

---

## 5. UI Components

### 5.1 Layout Components
**Directory:** `src/components/layout/`

1. **AppLayout** - Main application wrapper
2. **TopNav** - Navigation header
3. **Footer** - Site footer
4. **FloatingChat** - Customer support chat widget
5. **SideProductRail** - Side navigation for products
6. **ScrollToTop** - Auto-scroll on route change

### 5.2 Product Components
**Directory:** `src/components/product/`

1. **FilledRatesSection** - Data completeness visualization
2. Additional product-specific components (9 total)

### 5.3 About Components
**Directory:** `src/components/about/`

1. **AboutSlideshow** - Company presentation
2. Additional about-page components (9 total)

### 5.4 UI Primitives
**Directory:** `src/components/ui/`

49 shadcn/ui components including:
- Accordion, Alert Dialog, Avatar
- Badge, Button, Card, Checkbox
- Dialog, Dropdown, Form elements
- Navigation, Popover, Progress
- Select, Slider, Switch, Tabs
- Table, Toast, Tooltip
- And more...

---

## 6. Design System

### 6.1 Typography
- **Sans-serif:** Inter
- **Display:** Space Grotesk

### 6.2 Color Palette
**Custom InFynd Colors:**
- `infynd-red` - Brand primary
- `infynd-dark` - Dark backgrounds
- `infynd-slate` - Muted text
- `infynd-light` - Light backgrounds
- `infynd-success` - Success states
- `infynd-surface` - Surface backgrounds
- `infynd-surface-raised` - Elevated surfaces

**System Colors:**
- Primary, Secondary, Accent
- Muted, Destructive
- Border, Input, Ring
- Card, Popover, Sidebar

### 6.3 Animations
- **accordion-down/up** - Collapsible animations
- **fade-up** - Element entrance animation
- Framer Motion for complex transitions

### 6.4 Design Principles
- Mobile-first responsive design
- Accessible component patterns (ARIA labels)
- Consistent spacing and typography
- Smooth micro-interactions
- Premium visual aesthetics

---

## 7. User Flows

### 7.1 Product Discovery Flow
```
Home Page (Search)
    ↓
Type Query → Scanning Stage → Module Selection → Results
    ↓
Product Page → Learn More → Contact/Purchase
```

### 7.2 Comparison Flow
```
Data Products Page
    ↓
Select Products (up to 3)
    ↓
View Inline Comparison OR Navigate to Compare Page
    ↓
Detailed Side-by-Side Analysis
```

### 7.3 Use Case Navigation Flow
```
Use Cases Page
    ↓
Select Business Objective
    ↓
View Recommended Products
    ↓
Navigate to Product Page
```

---


## 10. Integration Points

### 10.1 External Services (Potential)
- Email service providers
- Payment processing
- CRM integration
- Analytics platforms
- Customer support chat

### 10.2 Data Sources
- Public business registries
- Verified directories
- Consented web forms
- Official preference services (TPS, CTPS, MPS)

---

## 11. Compliance Requirements

### 11.1 Data Protection
- GDPR Article 6(1)(f) compliance
- Legitimate Interest Assessments (LIA)
- Data subject rights portal
- ICO registration

### 11.2 Marketing Regulations
- PECR compliance
- TPS/CTPS/MPS screening
- Consent management
- Unsubscribe mechanisms

### 11.3 Data Quality
- Regular source audits
- Suppression list updates (monthly)
- Gone-away/deceased suppression (quarterly)
- Quality scoring system

---

## 12. Future Enhancements (Proposed)

### 12.1 Platform Features
- User authentication and account management
- Shopping cart and checkout flow
- Order history and tracking
- API access for enterprise clients
- Data preview before purchase
- Advanced filtering and search
- Saved searches and alerts

### 12.2 Analytics & Insights
- Usage analytics dashboard
- Data quality reports
- Coverage heat maps
- Trend analysis tools

### 12.3 Integration Capabilities
- CRM direct integrations (Salesforce, HubSpot)
- Marketing automation platforms
- Data enrichment APIs
- Webhook notifications




### 15.1 User Documentation
- Product guides
- Use case tutorials
- Compliance information
- FAQ section

### 15.2 Developer Documentation
- API documentation
- Component library documentation
- Setup and installation guide
- Contribution guidelines

---

## 16. Success Metrics

### 16.1 User Engagement
- Time on site
- Product page views
- Comparison feature usage
- Search query volume

### 16.2 Business Metrics
- Lead generation
- Quote requests
- Customer acquisition
- Product catalog growth

### 16.3 Technical Metrics
- Page load times
- API response times
- Error rates
- Uptime availability

---

## 17. Maintenance & Support

### 17.1 Regular Updates
- Product data updates
- Compliance standard changes
- Suppression list refreshes
- Feature enhancements

### 17.2 Monitoring
- Error tracking
- Performance monitoring
- User behavior analytics
- API usage tracking

---

## Document Version
- **Version:** 1.0
- **Date:** February 11, 2026
- **Author:** InFynd Development Team
- **Status:** Active Development

---




*This document serves as the comprehensive requirements specification for the InFynd Web platform. It should be updated as new features are added or requirements change.*
