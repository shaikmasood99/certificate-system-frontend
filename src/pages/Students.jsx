import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', rollNo: '', course: 'B.Tech CSE' });
  const [copiedId, setCopiedId] = useState(null);
  const [generatedCert, setGeneratedCert] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://smart-certificate-system.onrender.com';
  const token = localStorage.getItem('token');

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : data.students || []);
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Student Added!');
        fetchStudents();
        setForm({ name: '', rollNo: '', course: 'B.Tech CSE' });
      } else alert('Failed: ' + (data.message || 'Server error'));
    } catch (err) { alert('Error: ' + err.message); }
  };

  // NEW: Generate Certificate
  const handleGenerate = async (student) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/certificates/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ studentId: student.id, course: student.course })
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedCert({ ...data, student });
      } else {
        alert('Failed to generate: ' + (data.message || 'Server error'));
      }
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await fetch(`${API_URL}/api/students/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setStudents(students.filter(s => s.id !== id));
  };

  const copyId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Add Student</h1>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 16px', background: '#1677ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>← Go to Dashboard</button>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }}>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            <input placeholder="Roll No" value={form.rollNo} onChange={e => setForm({...form, rollNo: e.target.value})} required style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            <input placeholder="Course" value={form.course} onChange={e => setForm({...form, course: e.target.value})} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
            <button type="submit" style={{ padding: '10px', background: 'black', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Add</button>
          </form>
        </div>

        <h3>All Students ({students.length})</h3>
        <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #ddd', overflow: 'hidden' }}>
          {students.map(s => (
            <div key={s.id} style={{ padding: '14px 16px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{s.name} - {s.rollNo} - {s.course}</div>
                  <div style={{ fontSize: '11px', color: '#666', fontFamily: 'monospace', marginTop: '6px', background: '#f8fafc', padding: '6px 8px', borderRadius: '4px', wordBreak: 'break-all', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{s.id}</span>
                    <button onClick={() => copyId(s.id)} style={{ marginLeft: '8px', padding: '3px 8px', fontSize: '10px', background: copiedId === s.id ? '#dcfce7' : 'white', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
                      {copiedId === s.id ? '✅ Copied!' : '📋 Copy ID'}
                    </button>
                  </div>
                  {/* NEW BUTTONS */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <button onClick={() => handleGenerate(s)} disabled={loading} style={{ padding: '7px 12px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                      {loading ? 'Generating...' : '🎓 Generate Certificate'}
                    </button>
                    <button onClick={() => navigate(`/verify?id=${generatedCert.certificate?.id || generatedCert.id}`)}>👀 View Certificate </button>
                    </div>
                </div>
                <button onClick={() => handleDelete(s.id)} style={{ marginLeft: '10px', padding: '5px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '5px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* NEW: Certificate Preview Popup */}
        {generatedCert && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', maxWidth: '500px', width: '90%', textAlign: 'center' }}>
              <h2>✅ Certificate Generated!</h2>
              <p><b>{generatedCert.student.name}</b> - {generatedCert.student.course}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>Certificate ID: {generatedCert.certificate?.id || generatedCert.id || 'Generated'}</p>
              {generatedCert.certificate?.qrCode && <img src={generatedCert.certificate.qrCode} alt="QR" style={{ width: '120px', margin: '10px auto' }} />}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={() => navigate(`/verify?id=${generatedCert.certificate?.id || generatedCert.id}`)}>👀 View Certificate</button>
                <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 16px', background: '#1677ff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Go to Dashboard →</button>
                <button onClick={() => setGeneratedCert(null)} style={{ padding: '10px 16px', background: '#eee', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Students;