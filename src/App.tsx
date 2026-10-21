import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Certificates from './pages/Certificates';
import Verify from './pages/Verify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/verify/:certificateId" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;