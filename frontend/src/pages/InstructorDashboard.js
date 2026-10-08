import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function InstructorDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await API.get('/courses');
        const mine = res.data.filter((c) => c.instructor?._id === user._id);
        setCourses(mine);
      } catch (err) {
        setError('Failed to load your courses');
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, [user._id]);

  if (loading) return <div className="container mt-5">Loading your courses...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Courses</h1>
        <Link to="/create-course" className="btn btn-primary">+ New Course</Link>
      </div>
      {courses.length === 0 ? (
        <p>You haven't created any courses yet.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="text-muted">Category: {course.category}</p>
                  <p className="fw-bold">${course.price}</p>
                  <Link to={`/courses/${course._id}`} className="btn btn-outline-primary">
                    View
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

export default InstructorDashboard;