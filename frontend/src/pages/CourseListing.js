import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function CourseListing() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/courses');
        setCourses(res.data);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <div className="container mt-5">Loading courses...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Course Listing</h1>
      {courses.length === 0 ? (
        <p>No courses available yet.</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="text-muted">
                    Instructor: {course.instructor?.name || 'Unknown'}
                  </p>
                  <p className="fw-bold">${course.price}</p>
                  <Link to={`/courses/${course._id}`} className="btn btn-primary">
                    View Details
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

export default CourseListing;