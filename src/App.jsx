import React, { useState } from 'react';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple hardcoded auth for now
    if (email === 'admin@example.com' && password === 'password123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const renderLoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login to Dashboard</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );

  const renderDashboard = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Exit Babylon Dashboard</h1>
      <p>Welcome, {email}!</p>
      {/* TODO: Add dashboard data here */}
    </div>
  );

  return isAuthenticated ? renderDashboard() : renderLoginForm();
};

export default App;
