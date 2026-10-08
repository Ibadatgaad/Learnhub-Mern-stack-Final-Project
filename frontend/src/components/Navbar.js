import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">LearnHub</Link>
      <div className="navbar-nav ms-auto flex-row gap-3">
        <Link className="nav-link text-white" to="/courses">Courses</Link>
        {user && user.role === 'student' && (
  <Link className="nav-link text-white" to="/student-dashboard">My Dashboard</Link>
)}
{user && (user.role === 'instructor' || user.role === 'admin') && (
  <Link className="nav-link text-white" to="/instructor-dashboard">My Dashboard</Link>
)}
{user && user.role === 'admin' && (
  <Link className="nav-link text-white" to="/admin-dashboard">Admin Panel</Link>
)}
        {user && (user.role === 'instructor' || user.role === 'admin') && (
          <Link className="nav-link text-white" to="/create-course">Create Course</Link>

        )}
        {user ? (
          <>
            <span className="nav-link text-white">Hi, {user.name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link text-white" to="/login">Login</Link>
            <Link className="nav-link text-white" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;