import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Certificates() {
  const [certs, setCerts] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://smart-certificate-system.onrender.com';
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API_URL}/api/certificates`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setCerts(Array.isArray(d) ? d : d.certificates || []))
      .catch(e => console.log(e));
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>All Certificates ({certs.length})</h1>
        {certs.length === 0 && <p>No certificates yet. Go to Students → Generate Certificate</p>}
        {certs.map(c => (
          <div key={c.id} style={{ background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <b>{c.student?.name || c.studentName || 'Student'}</b> - {c.course || c.student?.course}
              <div style={{ fontSize: '12px', color: '#666' }}>ID: {c.id}</div>
            </div>
            <button onClick={() => setSelected(c)} style={{ padding: '8px 14px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>👀 View Certificate</button>
          </div>
        ))}

        {/* Certificate Preview Popup */}
        {selected && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', maxWidth: '600px', width: '90%', textAlign: 'center', border: '3px solid #facc15' }}>
              <img src="/logo.png" style={{ width: '60px' }} />
              <h2 style={{ margin: '10px 0' }}>🎓 Certificate Studio Pro</h2>
              <p style={{ color: '#666' }}>Certificate of Completion</p>
              <h1>{selected.student?.name || selected.studentName}</h1>
              <p>Has successfully completed <b>{selected.course || selected.student?.course}</b></p>
              <p style={{ fontSize: '12px' }}>Certificate ID: {selected.id}</p>
              {selected.qrCode && <img src={selected.qrCode} style={{ width: '120px', margin: '10px auto' }} />}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 16px', background: '#1677ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Go to Dashboard →</button>
                <button onClick={() => setSelected(null)} style={{ padding: '10px 16px', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Certificates;