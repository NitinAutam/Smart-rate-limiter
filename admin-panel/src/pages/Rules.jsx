import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Rules() {
  const [rules, setRules] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
  const fetchRules = async () => {
    try {
      const res = await axios.get("http://localhost:5000/rules/payment-service");
      setRules(res.data);
      setUsingFallback(false);
    } catch (error) {
      console.error("Using fallback rules:", error);
      setRules([
        {
          id: "demo-1",
          service: "payment-service",
          conditions: ["usage < 500", "userTier == 'premium'"],
          action: "ALLOW",
        },
      ]);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  fetchRules();
}, []);


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Rule Library</h1>
        <p className="text-sm text-gray-400">
          These rules are evaluated by the SDK for each incoming request.
        </p>
      </div>

      {loading ? (
        <p className="text-gray-500 italic">Loading rules...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full bg-gray-900 text-sm text-left">
              <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Service</th>
                  <th className="p-3">Conditions</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule, index) => (
                  <tr
                    key={rule.id || index}
                    className="border-t border-gray-800"
                  >
                    <td className="p-3 font-mono text-gray-300">{rule.id || `0${index + 1}`}</td>
                    <td className="p-3">{rule.service}</td>
                    <td className="p-3">
                      <ul className="list-disc list-inside space-y-1">
                        {rule.conditions.map((cond, i) => (
                          <li key={i}>{cond.if}</li>
                        ))}
                      </ul>
                    </td>
                    <td
                      className={`p-3 font-bold ${
                        rule.action === "ALLOW"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {rule.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {usingFallback && (
            <p className="text-xs text-red-400 italic mt-2">
              Using fallback demo data. Backend might be offline.
            </p>
          )}
        </>
      )}
    </div>
  );
}
