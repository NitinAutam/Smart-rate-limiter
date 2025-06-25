# Smart Rate Limiting SDK + Admin Panel (Proof of Concept)

**Note**: This POC uses Express.js for rapid development under time constraints. If selected for further work, I plan to refactor the backend using **TypeScript** and the **Godspeed framework** to ensure scalability, type safety, and production-grade maintainability.

A modular, dynamic rate-limiting system that combines:

* Context-aware SDK middleware
* Express.js backend with APIs for rules and context
* React + Tailwind Admin Panel for rule management and visibility

---

##  Objective

To demonstrate a robust mechanism for request-level access control using:

* **TTL-based caching** of service-specific rules
* **Real-time context** from incoming requests (usage, tier, org ID)
* **Declarative rule evaluation**, e.g.:
  `if usage < 500 && userTier == 'premium' then allow`

---

##  Architecture Overview

```
Client Request
       ↓
 [ SDK Middleware ]
     ↙      ↘
[ Rules Cache ] ← (Fetch from backend if missing or stale)
       ↓
[ Context API ] ← (Always fetch fresh)
       ↓
   [ Rule Engine ]
       ↓
 Allow or Block (HTTP 429) → Forward to Target Service
```

---

##  Project Structure

```
/smart-rate-limiter
├── backend/   # Express backend: /rules & /context endpoints
├── sdk/       # Reusable middleware SDK for request evaluation
├── admin/     # React + Tailwind admin interface
```

---

##  Local Setup Instructions

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

**API Endpoints:**

* `POST /rules` — Add a rule
* `GET /rules` — List all rules
* `POST /context` — Simulate context input (usage, tier)

---

### 2. SDK Middleware Demo

```bash
cd sdk
npm install
node demoApp.js
```

**Sample Request:**

```bash
curl http://localhost:3000/payment-service \
  -H "Authorization: Bearer <your-jwt-token>"
```

**Sample Responses:**

```json
{ "message": "Request allowed by rate limiter" }
```

```json
{ "error": "Rate limit exceeded", "rule": "usage > 500" }
```

---

### 3. Admin Panel

```bash
cd admin
npm install
npm run dev
```

**Key Features:**

* View and manage rate limiting rules
* Create new conditional rules
* Visualize simulated activity
* Clean UI for edit/delete operations

---

##  Features Implemented

*  SDK middleware with JWT parsing
*  Rule and context APIs (Express)
*  Lightweight rule evaluation engine
*  Rule caching with TTL refresh
*  Admin Panel built with React + Tailwind
*  Simulated context-based rule enforcement

---

This POC validates that dynamic access control via smart rule engines and context evaluation is feasible, scalable, and developer-friendly.
