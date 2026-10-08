import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await API.get('/my-courses');
        setEnrollments(res.data);
      } catch (err) {
        setError('Failed to load your courses');
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) return <div className="container mt-5">Loading your courses...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>My Enrolled Courses</h1>
      {enrollments.length === 0 ? (
        <p>
          You haven't enrolled in any courses yet.{' '}
          <Link to="/courses">Browse courses</Link>
        </p>
      ) : (
        <div className="row">
          {enrollments
  .filter((enrollment) => enrollment.course)
  .map((enrollment) => (
    <div className="col-md-4 mb-4" key={enrollment._id}>
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{enrollment.course.title}</h5>
          <p className="card-text">{enrollment.course.description}</p>
          <p className="text-muted">Category: {enrollment.course.category}</p>
          <p className="text-muted">Progress: {enrollment.progress}%</p>
          <Link to={`/courses/${enrollment.course._id}`} className="btn btn-primary">
            View Course
          </Link>
        </div>
      </div>
    </div>
  ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;