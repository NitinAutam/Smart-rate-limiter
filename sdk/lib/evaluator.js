// A very basic rule evaluator

exports.evaluateRules = (rules, context) => {
  for (const rule of rules) {
    const conditions = rule.conditions;
    const isAllowed = conditions.every(cond => {
      const expression = cond.if;
      try {
        return evalWithContext(expression, context);
      } catch (err) {
        return false;
      }
    });

    if (isAllowed) {
      return { allow: rule.action === 'ALLOW', reason: rule };
    }
  }
  return { allow: false, reason: 'No rule matched' };
};

function evalWithContext(expression, context) {
  return Function(...Object.keys(context), `return ${expression};`)(...Object.values(context));
}
