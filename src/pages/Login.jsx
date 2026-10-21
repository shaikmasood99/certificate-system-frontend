import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('admin@college.com');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login Success!');
      navigate('/dashboard');
    } catch (err) {
      alert('Login Failed: ' + err.response?.data?.message);
    }
  };

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5'}}>
      <div style={{background:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 4px 10px rgba(0,0,0,0.1)', width:'350px'}}>
        <h2 style={{textAlign:'center'}}>🔐 Admin Login</h2>
        <input style={input} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={input} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button style={btn} onClick={handleLogin}>Login</button>
        <p style={{fontSize:'12px', marginTop:'15px', color:'#666'}}>Default: admin@college.com / admin123</p>
      </div>
    </div>
  );
}
const input = {width:'100%', padding:'12px', margin:'10px 0', borderRadius:'5px', border:'1px solid #ddd'};
const btn = {width:'100%', padding:'12px', background:'#007bff', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontWeight:'bold'};
export default Login;