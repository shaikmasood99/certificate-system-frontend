import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [certs, setCerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCerts = async () => {
      const API_URL = `http://${window.location.hostname}:5000`;
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/certificates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCerts(Array.isArray(data) ? data : []);
    };
    fetchCerts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header with Logout */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <button onClick={handleLogout} style={{ padding: '6px 12px', background: 'white', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
        </div>

        {/* 2 Big Buttons like before */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
          <Link to="/students" style={{ background: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #ddd', textDecoration: 'none', color: 'black', textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>👨‍🎓</div>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>Add Student</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Add new students</div>
          </Link>
          
          <Link to="/certificates" style={{ background: 'black', padding: '25px', borderRadius: '10px', textDecoration: 'none', color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>📜</div>
            <div style={{ fontWeight: 700, fontSize: '16px' }}>Generate Certificate</div>
            <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{certs.length} already issued</div>
          </Link>
        </div>

        {/* Simple Certificate List with View + Delete */}
        <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Recent Certificates</h3>
        <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
          {certs.length === 0 ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#999' }}>No certificates yet</div>
          ) : (
            certs.slice(0, 5).map((c) => (
              <div key={c.id} style={{ padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{c.student?.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{c.certificateId}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Link to={`/verify/${c.certificateId}`} style={{ padding: '5px 10px', background: '#e0f2fe', color: '#0369a1', borderRadius: '5px', textDecoration: 'none', fontSize: '12px' }}>View</Link>
                  <button onClick={async () => {
                    if (!confirm('Delete?')) return;
                    const API_URL = `http://${window.location.hostname}:5000`;
                    const token = localStorage.getItem('token');
                    await fetch(`${API_URL}/api/certificates/${c.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
                    setCerts(certs.filter(x => x.id !== c.id));
                  }} style={{ padding: '5px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '5px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>

        {certs.length > 5 && <Link to="/dashboard" style={{ display: 'block', textAlign: 'center', marginTop: '10px', fontSize: '13px', color: '#666' }}>View all {certs.length} certificates →</Link>}
      </div>
    </div>
  );
}

export default Dashboard;