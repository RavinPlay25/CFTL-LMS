import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ParentDashboard() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/parent-login');

    const fetchStudents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/parents/children', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        setError('Could not fetch child records.');
      }
    };

    fetchStudents();
  }, [navigate]);

  if (error) return <p>{error}</p>;
  if (!students.length) return <p>No child records found.</p>;

  return (
    <div>
      <h2>My Children</h2>
      {students.map((s) => (
        <div key={s.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Name:</strong> {s.nameFull}</p>
          <p><strong>Registration No:</strong> {s.registrationNo}</p>
          <p><strong>DOB:</strong> {new Date(s.dob).toLocaleDateString()}</p>
          <p><strong>Religion:</strong> {s.religion}</p>
        </div>
      ))}
    </div>
  );
}
