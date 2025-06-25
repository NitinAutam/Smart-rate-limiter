exports.getContext = (req, res) => {
  const { userId, orgId, service } = req.body;

  // Mocked context
  const context = {
    userId,
    orgId,
    service,
    usage: Math.floor(Math.random() * 1000), // Random usage for demo
    userTier: userId === 'premiumUser123' ? 'premium' : 'basic',
    timestamp: new Date().toISOString()
  };

  res.json(context);
};
