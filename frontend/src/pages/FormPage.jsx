import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FormPage({ fetchUsers }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editUser = location.state?.user || null;

  const [formData, setFormData] = useState({ full_name: '', email: '', role: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState({ type: '', text: '' })
  const editingUserId = editUser ? editUser.id : null;

  useEffect(() => {
    if (editUser) {
      setFormData({ full_name: editUser.full_name, email: editUser.email, role: editUser.role || '' });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' });
    
    // Explicit Client-Side Validation
    if (!formData.full_name.trim() || !formData.email.trim()) {
      setFormMessage({ type: 'error', text: 'Full name and email are required.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const url = editingUserId 
        ? `http://localhost:5001/api/people/${editingUserId}`
        : 'http://localhost:5001/api/people';
      const method = editingUserId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save user');
      }
      
      setFormMessage({ type: 'success', text: editingUserId ? 'User updated!' : 'User added!' });
      setFormData({ full_name: '', email: '', role: '' }); 
      fetchUsers(); 
      setTimeout(() => {
        setFormMessage({ type: '', text: '' });
        navigate('/people'); // Redirect to list after success
      }, 1500);
    } catch (err) {
      setFormMessage({ type: 'error', text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancelEdit = () => {
    setFormData({ full_name: '', email: '', role: '' });
    navigate('/people');
  }

  return (
    <div className="form-section">
      <div className="card form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3>{editingUserId ? 'Edit Team Member' : 'Add New Team Member'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="user@example.com" />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g. Developer, Student" />
          </div>
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Saving...' : (editingUserId ? 'Update Database' : 'Add to Database')}
          </button>
          {editingUserId && (
            <button type="button" onClick={handleCancelEdit} className="cancel-btn" style={{ marginTop: '10px' }}>
              Cancel
            </button>
          )}
          
          {formMessage.text && (
            <div className={`form-message ${formMessage.type}`}>
              {formMessage.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
