import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const API_URL = import.meta.env.VITE_API_URL || 'https://smart-certificate-system.onrender.com';

const THEMES = {
  royal: { name: 'Royal Blue & Gold', border: '#0b3d91', accent: '#c9a86a', text: '#0b3d91', bg: '#ffffff', btn: '#0b3d91' },
  emerald: { name: 'Emerald Classic', border: '#065f46', accent: '#6ee7b7', text: '#065f46', bg: '#f0fdf4', btn: '#065f46' },
  crimson: { name: 'Crimson Prestige', border: '#991b1b', accent: '#fca5a5', text: '#991b1b', bg: '#fef2f2', btn: '#991b1b' },
  minimal: { name: 'Minimal Black', border: '#111827', accent: '#d1d5db', text: '#111827', bg: '#ffffff', btn: '#111827' },
  midnight: { name: 'Midnight Gold ✨', border: '#1e1b4b', accent: '#fbbf24', text: '#1e1b4b', bg: '#eef2ff', btn: '#1e1b4b' },
  sunset: { name: 'Sunset Luxury 🌅', border: '#7c2d12', accent: '#fb923c', text: '#7c2d12', bg: '#fff7ed', btn: '#ea580c' },
};

function Certificates() {
  const token = localStorage.getItem('token');
  const certRef = useRef(null);
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState(null);
  const [collegeName, setCollegeName] = useState('ANNAMACHARYA INSTITUTE OF TECHNOLOGY');
  const [approvedBy, setApprovedBy] = useState('Autonomous | Approved by AICTE, New Delhi');
  const [location, setLocation] = useState('Rajampet, Andhra Pradesh');
  const [certTitle, setCertTitle] = useState('CERTIFICATE OF COMPLETION');
  const [reason, setReason] = useState('has successfully completed B.Tech in Computer Science and Engineering with distinction');
  const [hodName, setHodName] = useState('Dr. Ramesh Kumar');
  const [hodTitle, setHodTitle] = useState('Head of Department, CSE');
  const [logo, setLogo] = useState(null);
  const [hodSign, setHodSign] = useState(null);
  const [themeKey, setThemeKey] = useState('royal');
  const theme = THEMES[themeKey];

  const generate = async () => {
    try {
      const res = await fetch(`${API_URL}/api/certificates/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ studentId, course: 'B.Tech CSE' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setResult(data);
    } catch (e) { alert(e.message); }
  };

  const toBase64 = (file, setter) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target.result);
    reader.readAsDataURL(file);
  };

  const downloadPDF = async () => {
    const canvas = await html2canvas(certRef.current, { scale: 2, useCORS: true });
    const img = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const w = pdf.internal.pageSize.getWidth();
    const h = (canvas.height * w) / canvas.width;
    pdf.addImage(img, 'PNG', 0, 0, w, h);
    pdf.save(`${result.certificate.certificateId}.pdf`);
  };

  const defaultLogo = "https://cdn-icons-png.flaticon.com/512/3135/3135755.png";

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, Poppins, sans-serif' }}>
      <div style={{ width: '400px', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', color: 'white', padding: '0', overflowY: 'auto', height: '100vh', borderRight: '1px solid #334155' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #334155', background: '#0f172a', position: 'sticky', top: 0, zIndex: 10 }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>🎓 Certificate Studio Pro</h3>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94a3b8' }}>6 themes • No localhost link</p>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 600 }}>1. Student ID (Backend)</label>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
              <input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Paste Student ID" style={{ flex: 1, padding: '9px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '13px' }} />
              <button onClick={generate} style={{ padding: '9px 14px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Gen</button>
            </div>
          </div>
          <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>2. College Details</label>
            <input type="file" accept="image/*" onChange={e => toBase64(e.target.files[0], setLogo)} style={{ width: '100%', marginTop: '8px', fontSize: '11px', color: '#cbd5e1' }} />
            <input value={collegeName} onChange={e => setCollegeName(e.target.value)} placeholder="College Name" style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '13px' }} />
            <input value={approvedBy} onChange={e => setApprovedBy(e.target.value)} placeholder="Approved By" style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '13px' }} />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '13px' }} />
          </div>
          <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: 600 }}>3. Content</label>
            <input value={certTitle} onChange={e => setCertTitle(e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '13px' }} />
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '12px' }} />
          </div>
          <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 600 }}>4. HOD Sign</label>
            <input type="file" accept="image/*" onChange={e => toBase64(e.target.files[0], setHodSign)} style={{ width: '100%', marginTop: '8px', fontSize: '11px' }} />
            <input value={hodName} onChange={e => setHodName(e.target.value)} placeholder="HOD Name" style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
            <input value={hodTitle} onChange={e => setHodTitle(e.target.value)} placeholder="HOD Title" style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
          </div>
          <div style={{ background: '#1e293b', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: '#c4b5fd', fontWeight: 600 }}>5. Themes (6)</label>
            <div style={{ display: 'grid', gap: '6px', marginTop: '8px' }}>
              {Object.entries(THEMES).map(([key, t]) => (
                <button key={key} onClick={() => setThemeKey(key)} style={{ padding: '10px', borderRadius: '8px', border: themeKey === key ? '2px solid white' : '1px solid #334155', background: key === themeKey ? t.border : '#0f172a', color: 'white', fontSize: '12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.name}</span><span style={{ width: '14px', height: '14px', borderRadius: '50%', background: t.accent, display: 'inline-block' }}></span>
                </button>
              ))}
            </div>
          </div>
          {result && <button onClick={downloadPDF} style={{ width: '100%', padding: '13px', background: 'white', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>📥 Download PDF</button>}
        </div>
      </div>
      <div style={{ flex: 1, background: '#f1f5f9', padding: '30px', overflow: 'auto', display: 'flex', justifyContent: 'center' }}>
        {!result ? (
          <div style={{ marginTop: '80px', textAlign: 'center', color: '#64748b' }}><div style={{ fontSize: '48px' }}>🎓</div><h2>Enter ID → Gen</h2><p>6 themes • No localhost</p></div>
        ) : (
          <div ref={certRef} style={{ width: '900px', height: '630px', background: theme.bg, border: `14px double ${theme.border}`, padding: '22px', boxSizing: 'border-box', flexShrink: 0, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
            <div style={{ border: `1.5px solid ${theme.accent}`, width: '100%', height: '100%', padding: '24px', boxSizing: 'border-box', position: 'relative' }}>
              <div style={{ textAlign: 'center' }}><img src={logo || defaultLogo} alt="logo" style={{ height: '64px' }} /></div>
              <h2 style={{ textAlign: 'center', margin: '10px 0 0', color: theme.text, fontFamily: 'serif', fontSize: '18px', fontWeight: 800 }}>{collegeName}</h2>
              <p style={{ textAlign: 'center', margin: '2px 0', fontSize: '11px', color: '#475569' }}>{approvedBy}</p>
              <p style={{ textAlign: 'center', margin: '0', fontSize: '10px', color: '#64748b' }}>{location}</p>
              <div style={{ width: '80px', height: '3px', background: theme.accent, margin: '14px auto' }}></div>
              <h1 style={{ textAlign: 'center', fontFamily: 'serif', fontSize: '30px', margin: '8px 0', color: '#000000', fontWeight: 900,textTransform: 'uppercase',letterSpacing: '1.5px',textShadow: '0 1px 0 rgba(0,0,0,0.1)'}}>{certTitle}</h1>
              <p style={{ textAlign: 'center', fontSize: '11px', letterSpacing: '2px', color: '#64748b' }}>PROUDLY PRESENTED TO</p>
              <h1 style={{ textAlign: 'center', fontFamily: 'serif', fontSize: '36px', margin: '14px 0', color: theme.text, fontStyle: 'italic' }}>{result.certificate.student?.name || 'Student'}</h1>
              <p style={{ textAlign: 'center', fontSize: '13px', maxWidth: '620px', margin: '0 auto', lineHeight: '1.6' }}>Roll No: <b>{result.certificate.student?.rollNo || ''}</b> {reason}</p>
              <div style={{ position: 'absolute', bottom: '22px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '10px', lineHeight: '1.6' }}><b>ID:</b><br/>{result.certificate.certificateId}<br/><b>Date:</b> {new Date(result.certificate.issueDate).toLocaleDateString()}</div>
                <div style={{ textAlign: 'center' }}>{hodSign && <img src={hodSign} alt="sign" style={{ height: '42px' }} />}<div style={{ borderTop: '1.5px solid #0f172a', width: '160px', margin: '0 auto 4px' }}></div><div style={{ fontSize: '12px', fontWeight: 700 }}>{hodName}</div><div style={{ fontSize: '9px', color: '#64748b' }}>{hodTitle}</div></div>
                <div style={{ textAlign: 'center' }}><img src={result.certificate.qrCode} alt="QR" style={{ width: '82px', height: '82px', border: `2px solid ${theme.accent}`, borderRadius: '6px' }} /><div style={{ fontSize: '9px', marginTop: '4px', fontWeight: 600 }}>Scan to Verify<br/><span style={{ color: '#16a34a' }}>✓ VERIFIED</span></div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Certificates;