const cache = {}; // In-memory cache

const TTL = 60 * 1000; // 1 min TTL

exports.getCachedRules = (service) => {
  const entry = cache[service];
  if (!entry || Date.now() > entry.expiresAt) {
    return null;
  }
  return entry.rules;
};

exports.setCachedRules = (service, rules) => {
  cache[service] = {
    rules,
    expiresAt: Date.now() + TTL,
  };
};
