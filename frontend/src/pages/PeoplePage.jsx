import { useNavigate } from 'react-router-dom';

export default function PeoplePage({ users, fetchUsers }) {
  const navigate = useNavigate();

  const handleEditClick = (user) => {
    navigate('/', { state: { user } });
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/people/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete user');
      
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  }

  if (users.length === 0) {
    return <div className="status">No users found in the database.</div>;
  }

  return (
    <div className="table-container">
      <table className="people-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="avatar" style={{ width: '40px', height: '40px', fontSize: '1.2rem', margin: '0 auto', marginBottom: 0 }}>
                  {user.full_name && user.full_name.charAt(0).toUpperCase()}
                </div>
              </td>
              <td className="user-name">{user.full_name}</td>
              <td style={{ color: 'var(--text-muted)' }}>{user.email}</td>
              <td>
                <span className="user-role" style={{ display: 'inline-block', margin: 0 }}>
                  {user.role || 'Member'}
                </span>
              </td>
              <td>
                <div className="card-actions" style={{ justifyContent: 'center' }}>
                  <button onClick={() => handleEditClick(user)} className="action-btn edit-btn" title="Edit">✏️</button>
                  <button onClick={() => handleDelete(user.id)} className="action-btn delete-btn" title="Delete">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
