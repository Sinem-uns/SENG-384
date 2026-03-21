import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import FormPage from './pages/FormPage'
import PeoplePage from './pages/PeoplePage'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = () => {
    fetch('http://localhost:5001/api/people')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
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
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <Router>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header>
          <h1>SENG 384 Team Dashboard</h1>
          <p className="subtitle">Dockerized React + Express + PostgreSQL Demo</p>
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Add Member (Form)</Link>
            <Link to="/people" className="nav-link">People List</Link>
          </nav>
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

          {!loading && !error && (
            <Routes>
              <Route path="/" element={<FormPage fetchUsers={fetchUsers} />} />
              <Route path="/people" element={<PeoplePage users={users} fetchUsers={fetchUsers} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  )
}

export default App
