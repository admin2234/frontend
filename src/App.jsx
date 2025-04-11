import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  
useEffect(() => {
  fetch('https://backend-7htc.onrender.com/api/wallet-summary')
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      console.error("Error fetching wallet summary:", err);
    });
}, []);

  if (!data) return <div>Loading...</div>;

return (
  <div>
    {data ? (
      <div>
        <p>Market Value: ${data.marketValue}</p>
        <p>Profit: ${data.profit}</p>
        <p>Trading Fees: ${data.tradingFees}</p>
        <p>Net Principal: ${data.netPrincipal}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);

export default App
