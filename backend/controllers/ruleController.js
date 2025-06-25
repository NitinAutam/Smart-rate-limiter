const fs = require('fs');
const path = require('path');

const RULES_FILE = path.join(__dirname, '../data/mockRules.json');

let rules = require(RULES_FILE); // load once into memory

exports.getRules = (req, res) => {
  const { service } = req.params;
  const serviceRules = rules.filter(rule => rule.service === service);
  res.json(serviceRules);
};

exports.createRule = (req, res) => {
  const newRule = req.body;
  rules.push(newRule);

  fs.writeFileSync(RULES_FILE, JSON.stringify(rules, null, 2));
  res.status(201).json({ message: 'Rule added', rule: newRule });
};
