const express = require('express');
const { rateLimiterMiddleware } = require('../sdk');

const app = express();
const PORT = 3000;

app.use(rateLimiterMiddleware);  // Apply SDK middleware globally

// Mock service route
app.get('/payment-service', (req, res) => {
  res.json({
    message: 'Request allowed by rate limiter',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Demo service running at http://localhost:3000`);
});
