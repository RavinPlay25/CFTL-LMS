import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ParentLogin() {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/parents', {
        nic,
        password,
      });

      const { token } = res.data;
      localStorage.setItem('token', token);
      alert('Parent login successful!');
      navigate('/parent-dashboard'); // we'll create this page next
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Parent Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
