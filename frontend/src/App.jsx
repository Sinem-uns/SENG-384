import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // In Docker compose, the frontend will reach the backend usually over localhost:5000 from the browser
    // because it runs on the host machine.
    fetch('http://localhost:5000/api/users')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch users:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      <header>
        <h1>SENG 384 Team Dashboard</h1>
        <p className="subtitle">Dockerized React + Express + PostgreSQL Demo</p>
      </header>

      <main>
        {loading && <div className="status">Loading data from PostgreSQL...</div>}
        
        {error && (
          <div className="error-state">
            <h3>Connection Error</h3>
            <p>{error}</p>
            <p style={{marginTop: '0.5rem', fontSize: '0.875rem'}}>Are the backend and database running?</p>
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="status">No users found in the database.</div>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="card-grid">
            {users.map(user => (
              <div key={user.id} className="card">
                <div className="avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-name">{user.name}</div>
                <div className="user-role">{user.role || 'Member'}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  {user.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
