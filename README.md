
# 🩺 HSA Optimizer — HackPrinceton Fall 2025

_By Samuel Ilyayev, Josh Niyazov, Avraham Uvaydov & Stephen Sulimani_

---

## 🚀 Overview

**HSA Optimizer** helps users take control of their healthcare spending and make smarter use of their **Health Savings Accounts (HSAs).**

By integrating with **Knot’s TransactionLink API**, our platform analyzes a user’s purchase history down to the SKU level — identifying HSA-eligible expenses, generating financial insights, and even helping users invest their unused HSA balance intelligently.

We built this project for **HackPrinceton Fall 2025** to make healthcare finance transparent, efficient, and accessible.

---

## 💡 Core Features

### 🧾 Transaction Intelligence
- Integrates with **Knot’s TransactionLink API** to pull detailed, SKU-level purchase data.
- Automatically detects **HSA-eligible purchases** using merchant codes, product data, and eligibility heuristics.
- Displays a clear dashboard of eligible vs. ineligible items.

### 💰 Reimbursement Form Generator
- Lets users select their verified HSA-eligible purchases.
- Auto-fills an **HSA reimbursement request form**.
- Exports a ready-to-send PDF for submission to their HSA administrator.

### 💹 Personalized Portfolio Allocation
- Uses a user’s **age**, **monthly income**, and **average HSA-eligible spending** to generate a tailored portfolio:
  - Calculates ideal **stocks / bonds / cash** ratios.
  - Suggests real ETFs (e.g. VTI, VXUS, BND, TIP, SGOV) with plain-English explanations.
- Adjusts automatically for liquidity needs — higher spending means more cash, lower spending means more investment.

### 💊 Drug Price Search
- Search for **prescription drugs** and find the **lowest available cash prices** using public drug pricing data (e.g. Cost Plus Drugs).
- Compare pharmacies side by side and identify savings opportunities.

### 🏥 Procedure Price Lookup
- Search for **medical procedures** and find **transparent cash prices** from local hospitals and providers.
- Promotes informed, price-aware healthcare decisions.

### 📊 HSA Spending Insights
- Summarizes where a user’s healthcare dollars go.
- Highlights top spending categories and potential areas to save.

---

## ⚙️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React (Vite) • TypeScript • TailwindCSS |
| **Backend** | FastAPI (Python) • SQLite • Uvicorn |
| **APIs & Data** | Knot TransactionLink API • Mark Cuban Cost Plus Drugs • MDSave |
| **Infrastructure** | Docker • Docker Compose |

---

## 🧩 Architecture


Each service runs in its own container:
- **Frontend:** http://localhost:3000  
- **Backend:** http://localhost:8000 (Swagger UI at `/docs`)

Data is stored locally via a **SQLite** database mounted to a Docker volume.

---

## 🧠 How It Works

1. User authenticates and connects spending data through **Knot TransactionLink**.  
2. Backend parses transactions → identifies HSA-eligible purchases.  
3. System generates:
   - Spending insights
   - Recommended HSA contribution amount
   - Portfolio allocation (stocks / bonds / cash)
4. User can:
   - Search prescription or procedure prices
   - Review and download an HSA reimbursement form

---


## 🔐 Environment Variables

### 🧭 Backend — `.env` file (`Backend/.env`)

```bash
# Database connection string; swap with your production database URI.
DATABASE_URL=sqlite+aiosqlite:///./app.db

# Long, random string used to sign JWTs. Generate securely before deployment.
AUTH_SECRET_KEY=

# Token lifetime in minutes (e.g., 30 for half an hour).
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Knot TransactionLink API credentials
KNOT_CLIENT_ID=
KNOT_CLIENT_SECRET=

# Gemini API Key (for AI-powered insights or text generation)
GEMINI_API_KEY=
```

### 🎨 Frontend - `.env` file (`Frontend/.env`)
```bash
# Knot API credentials (used for frontend link flow)
VITE_KNOT_CLIENT_ID=
VITE_KNOT_CLIENT_SECRET=
VITE_KNOT_ENVIRONMENT=development

# Base URL for your backend API
VITE_BASE_URL=http://localhost:8000
```

## 🧪 Running Locally

### Requirements
- Docker & Docker Compose installed.

### Run the app
```bash
docker compose up --build
```
