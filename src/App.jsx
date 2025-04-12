import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletSummary, setWalletSummary] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('https://backend-7htc.onrender.com/api/wallet-summary')
        .then((res) => res.json())
        .then((data) => setWalletSummary(data))
        .catch((err) => console.error('Error fetching wallet summary:', err));
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with real authentication logic
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Login to Exit Babylon</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Exit Babylon Dashboard</h1>
      {walletSummary ? (
        <div className="wallet-summary">
          <p><strong>Market Value:</strong> ${walletSummary.marketValue}</p>
          <p><strong>Profit:</strong> ${walletSummary.profit}</p>
          <p><strong>Trading Fees:</strong> ${walletSummary.tradingFees}</p>
          <p><strong>Net Principal:</strong> ${walletSummary.netPrincipal}</p>
        </div>
      ) : (
        <p>Loading wallet summary...</p>
      )}
    </div>
  );
}

export default App;
