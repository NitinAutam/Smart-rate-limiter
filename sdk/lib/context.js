const axios = require('axios');

exports.fetchContext = async ({ userId, orgId, service }) => {
  const res = await axios.post('http://localhost:5000/context', {
    userId,
    orgId,
    service,
  });
  return res.data;
};
