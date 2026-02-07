

# InFynd – Unified Product Experience Platform

## Vision
A conversation-first, interactive data marketplace that replaces your website, sales decks, and PDFs — letting prospects explore, compare, and understand every data product without speaking to sales.

---

## Design Direction
- **Style**: Clean & professional — light backgrounds, modern typography, subtle shadows, generous whitespace
- **Color Palette**: Professional blue-based palette as default (you can share your exact brand colors anytime and we'll update)
- **Feel**: Premium B2B SaaS — think Linear meets Stripe's product pages

---

## Site Structure & Pages

### 1. Global Layout
- **Top Navigation**: InFynd logo, central search/ask bar, CTAs (Explore Products, Request Sample, Talk to Sales)
- **Side Product Rail**: Sticky vertical nav with product categories, always accessible
- **Floating Chat**: Persistent AI chat icon (bottom-right), expandable to full panel
- **Minimal Footer**: Compliance links, company info, no clutter

### 2. Home Page — Conversational Command Centre
- **Hero Chat Block**: Large embedded chat interface with headline *"Explore data by asking, not browsing"*
- **Prompt Starter Chips**: Pre-written prompts users can click (e.g. "Show me UK email data for retail")
- **Product Universe Grid**: All 8+ products displayed as interactive cards with coverage badges, volume indicators, and compliance icons
- **Trust Banner**: Key stats (records, countries, compliance standards)

### 3. Product Experience Pages (×8, fully built)
Each product gets a dedicated page with **6 interactive tabbed sections**:

**Products covered:**
1. Postal Marketing Data
2. Tele Marketing Data
3. Email Marketing Data
4. New Business Data
5. SOHO Data
6. POI / Analytics Data
7. Global Healthcare Data
8. Data Match & Append / Enrichment

**Each page includes:**

| Tab | What it shows |
|-----|--------------|
| **Overview** | What the data is, who it's for, typical buyers, use cases, why InFynd |
| **Coverage & Volumes** | Interactive filters (country, industry, company size, job level) with live-updating volume numbers |
| **Sample Data** | 5-10 anonymised rows with company/contact toggle and inline field explanations on hover |
| **Data Dictionary** | Structured table: field name, description, source type, update frequency, confidence score |
| **How We Build It** | Visual step-by-step: sourcing → crawling → enrichment → validation → compliance → refresh |
| **Related Products** | Smart cross-sell cards + recommended add-ons |

### 4. Add-Ons System
- Global add-on selector attachable to any product page
- 8 toggleable add-ons: Funding & Investments, Hiring Companies, Tech Stack, Intent Signals, Job Changes, Firmographics, Mobile Numbers, Social Handles
- Live preview showing additional fields when toggled on

### 5. Product Comparison Page
- Side-by-side comparison of 2-3 products
- Accessible via chat suggestion or manual selection
- Compares coverage, volumes, fields, compliance, and use cases

### 6. Use Case Navigator
- "I want to do X" → system recommends products
- Industry-led exploration cards
- Links directly to relevant product pages

### 7. Compliance & Trust Page
- GDPR, PECR, Legitimate Interest explained
- Suppression logic & audit readiness
- Reusable compliance badges appear across all product pages

---

## Chat System (UI Only)
- Floating chat with docked/expanded states
- Pre-scripted responses for common prompts
- Responses highlight product cards, link to product pages, suggest add-ons
- Chat available on every page
- Designed so real AI can be plugged in later

---

## Sales Demo Flow Support
- Guided demo paths built into the chat (Discovery, Technical, Healthcare, Cross-sell, Self-serve)
- Each flow is a sequence of chat prompts that navigate the user through product pages
- Shareable demo links for sales reps

---

## Data Approach
- Realistic mock data for all products (volumes, sample rows, data dictionaries)
- Structured so real data can be swapped in by updating data files
- All 8 products fully populated with mock content across all 6 tabs

---

## Key Interactions
- Product cards → click to open full product experience
- Coverage filters → live volume updates
- Sample data → hover for field explanations, toggle company/contact view
- Add-ons → toggle on/off with instant field preview
- Chat → click prompts or type, responses link to products
- Related products → one-click navigation

