// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ParentLogin from './pages/ParentLogin';
import TeacherLogin from './pages/TeacherLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherRegister from './pages/TeacherRegister';
import TeacherCompleteProfile from './pages/TeacherCompleteProfile';
import ParentRegister from './pages/ParentRegistration';
import ParentDashboard from './pages/ParentDashboard';
import StudentRegister from './pages/StudentRegister';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-register" element={<TeacherRegister />} />
          <Route path="/teacher-complete-profile" element={<TeacherCompleteProfile />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/parent-register" element={<ParentRegister />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/student-register" element={<StudentRegister />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
}