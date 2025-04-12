import React, { useState, useEffect } from 'react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-7htc.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Login request failed');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetch('https://backend-7htc.onrender.com/api/wallet-summary')
        .then((res) => res.json())
        .then(setWalletData)
        .catch((err) => console.error('Error fetching wallet summary:', err));
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Login to Dashboard</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-2 p-2 border rounded"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exit Babylon Dashboard</h1>
      {walletData ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">Market Value</h2>
            <p>${walletData.marketValue}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">Profit</h2>
            <p>${walletData.profit}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">Trading Fees</h2>
            <p>${walletData.tradingFees}</p>
          </div>
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-semibold">Net Principal</h2>
            <p>${walletData.netPrincipal}</p>
          </div>
        </div>
      ) : (
        <p>Loading wallet data...</p>
      )}
    </div>
  );
}
