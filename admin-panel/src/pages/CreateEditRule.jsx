import React, { useState } from 'react';
import axios from 'axios';

export default function CreateEditRule() {
  const [service, setService] = useState('');
  const [conditions, setConditions] = useState(['']);
  const [action, setAction] = useState('ALLOW');
  const [submitting, setSubmitting] = useState(false);
  
  const handleConditionChange = (index, value) => {
    const updated = [...conditions];
    updated[index] = value;
    setConditions(updated);
  };

  const addCondition = () => setConditions([...conditions, '']);
  const removeCondition = (index) => {
    const updated = conditions.filter((_, i) => i !== index);
    setConditions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const rule = {
      service,
      conditions: conditions.filter(Boolean),
      action,
    };

    try {
      await axios.post('http://localhost:5000/rules', rule);
      alert(' Rule created!');
      setService('');
      setConditions(['']);
      setAction('ALLOW');
    } catch (err) {
      alert(' Backend not reachable. Using fallback.');
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-white">Create Rule</h1>
        <p className="flex items-center text-black text-sm ">
          These will be evaluated by the SDK.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow">
        {/* Service Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Target Service</label>
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="e.g. payment-service"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Conditions Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Rule Conditions</label>
          <div className="space-y-3">
            {conditions.map((cond, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={cond}
                  onChange={(e) => handleConditionChange(i, e.target.value)}
                  placeholder="e.g. usage < 500"
                  className="flex-1 px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
                  required
                />
                {conditions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCondition(i)}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCondition}
              className="text-blue-400 hover:underline text-sm mt-1"
            >
              + Add another condition
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 italic">
            Supported operators: <code>{`<, <=, >, >=, ==, !=`}</code>
          </p>
        </div>

        {/* Action Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="ALLOW">ALLOW</option>
            <option value="BLOCK">BLOCK</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded font-semibold transition ${
              submitting
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {submitting ? 'Saving Rule...' : 'Save Rule'}
          </button>
        </div>
      </form>
    </div>
  );
}
