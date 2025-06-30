import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TeacherRegister() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    type: 'PERMANENT',
    salary: '',
    qualifications: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const token = await userCred.user.getIdToken();

      // Send profile data to backend
      await axios.post(
        'http://localhost:5000/api/teachers/profile',
        {
          name: form.name,
          phone: form.phone,
          type: form.type,
          salary: parseFloat(form.salary),
          qualifications: form.qualifications.split(',').map(q => q.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem('token', token);
      navigate('/teacher-dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Teacher Registration</h2>
      <form onSubmit={handleRegister}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required /><br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required /><br />
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="PERMANENT">Permanent</option>
          <option value="VISITING">Visiting</option>
        </select><br />
        <input type="number" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required /><br />
        <input type="text" name="qualifications" placeholder="Qualifications (comma separated)" value={form.qualifications} onChange={handleChange} /><br />
        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
