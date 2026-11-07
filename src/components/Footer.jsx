export default function Footer() {
  return (
    <div style={{
      background: '#0f172a',
      color: 'white',
      padding: '24px 20px 16px',
      marginTop: '40px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '20px', fontWeight: '800', fontFamily: "'Poppins', 'Segoe UI', sans-serif" }}>
        🎓 Certificate <span style={{ color: '#facc15' }}>Studio Pro</span>
      </div>
      <div style={{ fontSize: '12px', opacity: 0.7, letterSpacing: '1px', marginTop: '4px' }}>
        SMART CERTIFICATE VERIFICATION SYSTEM • VERIFY • TRUST • SECURE
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginTop: '14px', fontSize: '13px', flexWrap: 'wrap' }}>
        <a href="/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Dashboard</a>
        <a href="/students" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Students</a>
        <a href="/certificates" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Certificates</a>
        <a href="/verify" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Verify Certificate</a>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '16px', paddingTop: '12px', fontSize: '12px', opacity: 0.6 }}>
        © 2026 Certificate Studio Pro • Built by Shaik Masood • All Rights Reserved
      </div>
    </div>
  );
}