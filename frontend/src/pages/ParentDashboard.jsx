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
        setStudents(res.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Could not fetch child records.');
      }
    };

    fetchStudents();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/parent-login');
  };

  if (error) return <p>{error}</p>;
  if (!students.length) return (
    <div>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <p>No child records found.</p>
    </div>
  );

  return (
    <div>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <h2>My Children</h2>
      {students.map((s) => {
        const dobFormatted = s.dob
          ? new Date(s.dob._seconds * 1000).toLocaleDateString()
          : 'N/A';

        return (
          <div key={s.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Name:</strong> {s.nameFull}</p>
            <p><strong>Registration No:</strong> {s.registrationNo}</p>
            <p><strong>DOB:</strong> {dobFormatted}</p>
            <p><strong>Religion:</strong> {s.religion}</p>
            <p><strong>Address:</strong> {s.address}</p>
            <p><strong>Telephone:</strong> {s.telephone}</p>
            <p><strong>Previous School:</strong> {s.previousSchool}</p>
            <p><strong>Subjects:</strong> {Array.isArray(s.subjects) ? s.subjects.join(', ') : ''}</p>
            <p><strong>Medical Info:</strong> {s.medical || 'None'}</p>
          </div>
        );
      })}
    </div>
  );
}
