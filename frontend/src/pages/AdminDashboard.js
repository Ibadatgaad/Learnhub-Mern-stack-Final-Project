import { useState, useEffect } from 'react';
import API from '../services/api';

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [analyticsRes, usersRes] = await Promise.all([
        API.get('/admin/analytics'),
        API.get('/admin/users'),
      ]);
      setAnalytics(analyticsRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      setError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <div className="container mt-5">Loading admin dashboard...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      <h4 className="mt-4">Analytics</h4>
      <div className="row mb-4">
        <div className="col-md-2 mb-3">
          <div className="card text-center p-3">
            <div className="fs-4 fw-bold">{analytics.totalUsers}</div>
            <div className="text-muted">Total Users</div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card text-center p-3">
            <div className="fs-4 fw-bold">{analytics.totalStudents}</div>
            <div className="text-muted">Students</div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card text-center p-3">
            <div className="fs-4 fw-bold">{analytics.totalInstructors}</div>
            <div className="text-muted">Instructors</div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card text-center p-3">
            <div className="fs-4 fw-bold">{analytics.totalCourses}</div>
            <div className="text-muted">Courses</div>
          </div>
        </div>
        <div className="col-md-2 mb-3">
          <div className="card text-center p-3">
            <div className="fs-4 fw-bold">{analytics.totalEnrollments}</div>
            <div className="text-muted">Enrollments</div>
          </div>
        </div>
      </div>

      <h4>Manage Users</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;