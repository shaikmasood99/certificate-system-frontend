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

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '16px', paddingTop: '12px', fontSize: '12px', opacity: 0.6 }}>
        © 2026 Certificate Studio Pro • Built by Shaik Masood • All Rights Reserved
      </div>
    </div>
  );
}