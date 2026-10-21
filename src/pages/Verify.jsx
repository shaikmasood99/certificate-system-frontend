import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'https://smart-certificate-system.onrender.com';

function Verify() {
  const { certificateId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const API_URL = `http://${window.location.hostname}:5000`;
  console.log('Calling API:', `${API_URL}/api/certificates/verify/${certificateId}`);
  
  fetch(`${API_URL}/api/certificates/verify/${certificateId}`)
   .then(res => res.json())
   .then(d => {
      console.log('Verify response:', d);
      setData(d);
      setLoading(false);
    })
   .catch(err => {
      console.error(err);
      setData({ valid: false, message: 'Backend not reachable - check backend is running' });
      setLoading(false);
    });
}, [certificateId]);
  // LOADING - Same premium loader as Studio
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', fontFamily: 'Inter, Poppins' }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ width: '60px', height: '60px', border: '4px solid #334155', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <h3 style={{ margin: 0 }}>Verifying Certificate...</h3>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px' }}>ID: {certificateId}</p>
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // FAKE CERTIFICATE - PREMIUM RED DESIGN
  if (!data.valid) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', padding: '20px', fontFamily: 'Inter, Poppins' }}>
        <div style={{ background: 'white', maxWidth: '480px', width: '100%', borderRadius: '20px', padding: '35px', textAlign: 'center', boxShadow: '0 25px 50px rgba(220,38,38,0.15)', border: '1px solid #fecaca' }}>
          <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #fee2e2, #fecaca)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '45px', boxShadow: '0 10px 20px rgba(220,38,38,0.15)' }}>🚨</div>
          <h1 style={{ color: '#dc2626', fontSize: '26px', margin: '0 0 8px', fontWeight: 800, letterSpacing: '-0.5px' }}>FAKE CERTIFICATE</h1>
          <p style={{ color: '#991b1b', fontSize: '14px', background: '#fef2f2', padding: '10px 14px', borderRadius: '10px', margin: '0 0 15px' }}>{data.message || 'This certificate does not exist in college records'}</p>
          <div style={{ background: '#0f172a', color: 'white', padding: '12px', borderRadius: '10px', fontSize: '12px', fontFamily: 'monospace' }}>ID: {certificateId}</div>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '15px' }}>If you received this from someone, it may be forged. Please contact college admin.</p>
          <Link to="/" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 24px', background: '#0f172a', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  // VALID CERTIFICATE - PREMIUM GREEN + GOLD DESIGN (Same as Midnight Gold theme)
  const cert = data.certificate;
  const studentName = cert.student?.name || cert.studentName || 'Student Name';
  const rollNo = cert.student?.rollNo || cert.rollNo || 'N/A';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #eef2ff 100%)', padding: '20px', fontFamily: 'Inter, Poppins' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Top Secure Badge */}
        <div style={{ textAlign: 'center', marginBottom: '25px', marginTop: '10px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', padding: '8px 16px', borderRadius: '50px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', fontSize: '12px', color: '#065f46', fontWeight: 600, border: '1px solid #bbf7d0' }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 0 3px #bbf7d0' }}></span> Blockchain Secured • College Verified
          </div>
        </div>

        {/* VALID Card */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '30px', textAlign: 'center', boxShadow: '0 20px 60px rgba(16,185,129,0.12)', marginBottom: '20px', border: '1px solid #bbf7d0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #065f46, #10b981, #fbbf24)' }}></div>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '40px', boxShadow: '0 10px 25px rgba(16,185,129,0.2)' }}>✅</div>
          <h1 style={{ color: '#065f46', margin: '0', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>CERTIFICATE VERIFIED</h1>
          <p style={{ color: '#16a34a', fontWeight: 600, margin: '6px 0 0', fontSize: '15px' }}>Authentic • Issued by College Authority</p>
          <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', display: 'inline-block', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', marginTop: '14px', color: '#065f46', fontWeight: 700, border: '1px solid #bbf7d0', fontFamily: 'monospace' }}>{cert.certificateId}</div>
        </div>

        {/* Details Grid - Same card style as Studio */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', border: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ fontSize: '11px', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 15px', fontWeight: 700 }}>Student Details</h3>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '15px', fontSize: '14px', lineHeight: '2.2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Name</span> <b style={{ color: '#0f172a' }}>{studentName}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Roll No</span> <b style={{ color: '#0f172a' }}>{rollNo}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Course</span> <b style={{ color: '#0f172a' }}>{cert.course}</b></div>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '11px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 15px', fontWeight: 700 }}>Verification</h3>
            <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '15px', fontSize: '14px', lineHeight: '2.2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Issue Date</span> <b style={{ color: '#065f46' }}>{new Date(cert.issueDate).toLocaleDateString()}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Status</span> <span style={{ background: '#dcfce7', color: '#065f46', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700 }}>VALID ✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#64748b' }}>Verified By</span> <b style={{ color: '#065f46' }}>College DB</b></div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '22px' }}>
          <Link to="/certificates" style={{ display: 'inline-block', padding: '13px 26px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontSize: '14px', fontWeight: 700, boxShadow: '0 8px 20px rgba(15,23,42,0.2)' }}>Generate Another →</Link>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '16px', maxWidth: '500px', margin: '16px auto 0', lineHeight: '1.5' }}>This certificate is cryptographically verified from college database. QR code ensures authenticity. If you suspect misuse, contact admin office.</p>
        </div>
      </div>
    </div>
  );
}

export default Verify;

