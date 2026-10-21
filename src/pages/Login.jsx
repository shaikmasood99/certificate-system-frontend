import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('admin@college.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://smart-certificate-system.onrender.com';

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login Success!');
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      alert('Login Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5'}}>
      <div style={{background:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 4px 10px rgba(0,0,0,0.1)', width:'350px'}}>
        <h2 style={{textAlign:'center'}}>🔐 Admin Login</h2>
        <input 
          style={{width:'100%', padding:'10px', margin:'10px 0'}} 
          value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input 
          style={{width:'100%', padding:'10px', margin:'10px 0'}} 
          type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button 
          style={{width:'100%', padding:'10px', background:'#1677ff', color:'white', border:'none', borderRadius:'5px', cursor:'pointer'}} 
          onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
export default Login;