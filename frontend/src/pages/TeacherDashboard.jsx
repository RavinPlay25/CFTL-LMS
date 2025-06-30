import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/teacher-login');
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/teachers/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        navigate('/teacher-complete-profile');
      } else {
        setError('Failed to fetch profile');
      }
    }
  };

  fetchProfile();
}, [navigate]);


  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Type:</strong> {profile.type}
      </p>
      <p>
        <strong>Salary:</strong> {profile.salary}
      </p>
      <p>
        <strong>Qualifications:</strong> {profile.qualifications?.join(", ")}
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/teacher-login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
