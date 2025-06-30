import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';

export default function TeacherCompleteProfile() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    type: 'PERMANENT',
    salary: '',
    qualifications: '',
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/teachers/profile',
        {
          name: form.name,
          phone: form.phone,
          type: form.type,
          salary: parseFloat(form.salary),
          qualifications: form.qualifications.split(',').map(q => q.trim()),
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/teacher-dashboard');
    } catch (err) {
      setError('Failed to save profile');
    }
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required /><br />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="PERMANENT">Permanent</option>
          <option value="VISITING">Visiting</option>
        </select><br />
        <input type="number" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required /><br />
        <input type="text" name="qualifications" placeholder="Qualifications (comma separated)" value={form.qualifications} onChange={handleChange} /><br />
        <input type="email" name="email" value={form.email} readOnly /><br />
        <button type="submit">Save Profile</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
