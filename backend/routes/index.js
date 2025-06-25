const express = require('express');
const router = express.Router();

const { getRules, createRule } = require('../controllers/ruleController');
const { getContext } = require('../controllers/contextController');

router.get('/rules/:service', getRules);
router.post('/rules', createRule);           // admin panel
router.post('/context', getContext);
//For Testing
router.get('/', (req, res) => {
  res.send('Smart Rate Limiter Backend is Running');
});

module.exports = router;
