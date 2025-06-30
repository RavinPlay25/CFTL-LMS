import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ParentLogin from './pages/ParentLogin';
import TeacherLogin from './pages/TeacherLogin';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherRegister from './pages/TeacherRegister';
import TeacherCompleteProfile from './pages/TeacherCompleteProfile';
import ParentRegister from './pages/ParentRegistration';
import ParentDashboard from './pages/ParentDashboard';


export default function App() {
  return (
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
    </Routes>
  );
}
