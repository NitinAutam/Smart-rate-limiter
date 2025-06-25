const jwt = require('jsonwebtoken');

const payload = {
  userId: 'premiumUser123',
  orgId: 'org42',
  iat: Math.floor(Date.now() / 1000)
};

const token = jwt.sign(payload, 'secret'); // You can skip verification in SDK

console.log('Generated JWT:\nBearer ' + token);
