import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div style={{
      background: 'linear-gradient(90deg, #0f172a, #1e3a8a, #0f172a)',
      color: 'white',
      padding: '14px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
     <div onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
  <img src="/logo.png" alt="Logo" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', background: 'white' }} />
  <div>
    <div style={{ fontSize: '22px', fontWeight: '800' }}>Certificate <span style={{ color: '#facc15' }}>Studio Pro</span></div>
  </div>
</div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Dashboard</button>
        <button onClick={() => navigate('/students')} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Students</button>
        <button onClick={() => navigate('/certificates')} style={{ padding: '8px 14px', background: '#facc15', color: 'black', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Certificates</button>
      </div>
    </div>
  );
}