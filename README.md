# Smart Rate Limiting SDK + Admin Panel (POC)

A proof-of-concept demonstrating a flexible, rule-based rate limiter using:
- Context-aware SDK middleware
- Express.js backend for rule/context APIs
- React + Tailwind Admin Panel for rule creation and visibility

---

## Goal

To prove that request-level access decisions can be made dynamically using:
- Cached service-specific rules (TTL-based)
- Fresh runtime context (usage, user tier, org ID)
- Simple rule engine (`if usage < 500 && userTier == 'premium' then allow`)

## Architecture

Client Request
↓
[ SDK Middleware ]
↙ ↘
[ Rules Cache ] ← if missing, fetch from backend
↓
[ Context API ] ← always fetch fresh data
↓
[ Rule Engine ]
↓
Allow or Block (429) → Forward to Target Service

## 📂 Folder Structure

/smart-rate-limiter
├── backend/ ← Express backend with /rules & /context endpoints
├── sdk/ ← Middleware SDK to rate-limit requests
├── admin/ ← React + Tailwind admin panel for rule management

---

## 🚀 How to Run Locally

### 1. Backend
```bash
cd backend
npm install
npm run dev
POST /rules — Add a rule

GET /rules — Fetch all rules

POST /context — Simulate usage + user tier context

2. SDK Demo
Inside /sdk, use the SDK as middleware:

cd sdk
npm install
node demoApp.js
Sample request:

bash
curl http://localhost:3000/payment-service \
  -H "Authorization: Bearer <your-jwt-token>"

Response:
{ "message": "Request allowed by rate limiter" }

Blocked:
{ "error": "Rate limit exceeded", "rule": "usage > 500" }

3. Admin Panel
bash
cd admin
npm install
npm run dev
Features:

View all rules

Create new rules

Preview recent activity (simulated)

Visual structure ready for simulation/edit/delete

 What’s Implemented

Request-level rate limiter middleware

Rule + Context APIs

Condition evaluator engine

Rule caching (TTL-based)

React Admin UI with Tailwind

Simulated rule evaluation with context