import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://backend-7htc.onrender.com/api/wallet-summary')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error('Error fetching wallet summary:', err);
      });
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Exit Babylon Dashboard</h1>
      {data ? (
        <div>
          <p><strong>Market Value:</strong> ${data.marketValue}</p>
          <p><strong>Profit:</strong> ${data.profit}</p>
          <p><strong>Trading Fees:</strong> ${data.tradingFees}</p>
          <p><strong>Net Principal:</strong> ${data.netPrincipal}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
