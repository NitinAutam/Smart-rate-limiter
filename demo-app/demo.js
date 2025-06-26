// demo.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { rateLimiterMiddleware } = require('../sdk'); // Adjust path if needed

// ----------------- JWT Generation -----------------
const payload = {
  userId: 'premiumUser123',
  orgId: 'org42',
  tier: 'premium', // Useful for rule context
  iat: Math.floor(Date.now() / 1000)
};

const token = jwt.sign(payload, 'secret'); // Skipping verification for demo

console.log(`Generated JWT:\nBearer ${token}`);
console.log('Use this token to call the API below:\n');

// ----------------- Express Server -----------------
const app = express();
const PORT = 3000;

app.use(rateLimiterMiddleware); // SDK-based gatekeeper

app.get('/payment-service', (req, res) => {
  res.json({
    message: 'Request allowed by rate limiter',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Demo service running at http://localhost:${PORT}/payment-service`);
  console.log('\nExample cURL:\n');
  console.log(`curl -H "Authorization: Bearer ${token}" http://localhost:${PORT}/payment-service`);
});
