import { useState, useEffect } from 'react';

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', rollNo: '', course: 'B.Tech CSE' });
  const [copiedId, setCopiedId] = useState(null);

  const API_URL = `http://${window.location.hostname}:5000`;
  const token = localStorage.getItem('token');

  const fetchStudents = async () => {
    const res = await fetch(`${API_URL}/api/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setStudents(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      fetchStudents();
      setForm({ name: '', rollNo: '', course: 'B.Tech CSE' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    await fetch(`${API_URL}/api/students/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setStudents(students.filter(s => s.id !== id));
  };

  const copyId = (id) => {
    const textArea = document.createElement("textarea");
    textArea.value = id;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      prompt('Copy manually:', id);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        <h1>Add Student</h1>
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
                    <button onClick={() => copyId(s.id)} style={{ 
                      marginLeft: '8px', 
                      padding: '3px 8px', 
                      fontSize: '10px', 
                      background: copiedId === s.id ? '#dcfce7' : 'white', 
                      color: copiedId === s.id ? '#16a34a' : 'black',
                      border: '1px solid #ddd', 
                      borderRadius: '4px', 
                      cursor: 'pointer', 
                      whiteSpace: 'nowrap',
                      fontWeight: copiedId === s.id ? '700' : '400'
                    }}>
                      {copiedId === s.id ? '✅ Copied!' : '📋 Copy ID'}
                    </button>
                  </div>
                </div>
                <button onClick={() => handleDelete(s.id)} style={{ marginLeft: '10px', padding: '5px 10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '5px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Students;