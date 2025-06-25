const axios = require('axios');
const { decodeToken } = require('./utils');
const { getCachedRules, setCachedRules } = require('./cache');
const { fetchContext } = require('./context');
const { evaluateRules } = require('./evaluator');

const BACKEND_BASE = 'http://localhost:5000';

// This is the actual rate limiting middleware used inside services
module.exports = async function rateLimiterMiddleware(req, res, next) {
  // Step 1: Extract the JWT from headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const userInfo = decodeToken(token);

  if (!userInfo) {
    return res.status(401).json({ error: 'Invalid token payload' });
  }

  // Step 2: Identify which service is being accessed (e.g., /payment-service)
  const service = req.path.split('/')[1];

  // Step 3: Try to get cached rules for this service
  let rules = getCachedRules(service);
  if (!rules) {
    try {
      const ruleResponse = await axios.get(`${BACKEND_BASE}/rules/${service}`);
      rules = ruleResponse.data;
      setCachedRules(service, rules); // Cache for next time
    } catch (err) {
      console.error('Failed to fetch rules from backend:', err.message);
      return res.status(503).json({ error: 'Rule server unavailable' });
    }
  }

  // Step 4: Fetch fresh context (real-time usage, user info)
  let context;
  try {
    context = await fetchContext({ ...userInfo, service });
  } catch (err) {
    console.error('Failed to fetch context:', err.message);
    return res.status(503).json({ error: 'Context service unavailable' });
  }

  // Step 5: Run the rules engine with current context
  const result = evaluateRules(rules, context);

  //Print evaluation for debugging
  console.log('Rule Evaluation', {
    user: userInfo,
    service,
    context,
    rules,
    result
  });

  // Step 6: If blocked, responding with 429 + reason
  if (!result.allow) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      rule: result.reason
    });
  }

  // Step 7: metadata headers for transparency
  res.setHeader('X-RateLimit-Service', service);
  res.setHeader('X-RateLimit-User', userInfo.userId);
  res.setHeader('X-RateLimit-Org', userInfo.orgId);
  res.setHeader('X-RateLimit-Context', JSON.stringify(context));

  res.setHeader('X-RateLimit-Limit', 500); // Could be dynamic
  res.setHeader('X-RateLimit-Remaining', 500 - (context.usage || 0));

  //Allow the request to go to actual route
  next();
};
