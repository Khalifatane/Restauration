# Progress Tracker

## Step 1: Data Authorities ✅
- Created /docs/data-authority.md
- Documented all domains and their single source of truth.

## Step 2: Kill Saleor 🔄
- Removed Saleor env vars from .env.local.
- Left Saleor GraphQL/auth/checkout code in place for now to avoid breaking the app; next step is to replace remaining imports with new services and then safely delete deprecated code.

