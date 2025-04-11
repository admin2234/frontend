import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://backend-7htc.onrender.com/api/wallet-summary')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>dYdX v4 Wallet Dashboard</h1>
      <p><strong>Market Value:</strong> ${data.marketValue}</p>
      <p><strong>Profit:</strong> ${data.profit}</p>
      <p><strong>Trading Fees:</strong> ${data.tradingFees}</p>
      <p><strong>Net Principal:</strong> ${data.netPrincipal}</p>
    </div>
  );
}

export default App
