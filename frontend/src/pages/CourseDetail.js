import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrollMessage, setEnrollMessage] = useState('');
  const [lessonForm, setLessonForm] = useState({ title: '', content: '' });
  const [lessonError, setLessonError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchLessons = async () => {
    const res = await API.get(`/courses/${id}/lessons`);
    setLessons(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/courses');
        const found = res.data.find((c) => c._id === id);
        if (!found) {
          setError('Course not found');
        } else {
          setCourse(found);
        }
        await fetchLessons();
      } catch (err) {
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleEnroll = async () => {
    setEnrollMessage('');
    try {
      await API.post('/enroll', { courseId: id });
      setEnrollMessage('Successfully enrolled!');
    } catch (err) {
      setEnrollMessage(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const isOwner = user && course && user._id === course.instructor?._id;
  const canManage = user && (user.role === 'admin' || isOwner);

  const handleLessonChange = (e) => {
    setLessonForm({ ...lessonForm, [e.target.name]: e.target.value });
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setLessonError('');
    try {
      await API.post(`/courses/${id}/lessons`, {
        ...lessonForm,
        order: lessons.length + 1,
      });
      setLessonForm({ title: '', content: '' });
      fetchLessons();
    } catch (err) {
      setLessonError(err.response?.data?.message || 'Failed to add lesson');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await API.delete(`/lessons/${lessonId}`);
      fetchLessons();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete lesson');
    }
  };

  if (loading) return <div className="container mt-5">Loading course...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <Link to="/courses" className="btn btn-link ps-0">&larr; Back to Courses</Link>
      <h1>{course.title}</h1>
      <p className="text-muted">Instructor: {course.instructor?.name || 'Unknown'}</p>
      <p className="text-muted">Category: {course.category}</p>
      <p>{course.description}</p>
      <h4 className="fw-bold">${course.price}</h4>

      {user && user.role === 'student' && (
        <div className="mt-3 mb-4">
          <button className="btn btn-success" onClick={handleEnroll}>
            Enroll in this Course
          </button>
          {enrollMessage && <p className="mt-2">{enrollMessage}</p>}
        </div>
      )}

      {!user && (
        <p className="mt-3 text-muted">
          <Link to="/login">Log in</Link> as a student to enroll.
        </p>
      )}

      <hr className="my-4" />
      <h4>Lessons</h4>
      {lessons.length === 0 ? (
        <p className="text-muted">No lessons added yet.</p>
      ) : (
        <ul className="list-group mb-4">
          {lessons.map((lesson) => (
            <li key={lesson._id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{lesson.order}. {lesson.title}</strong>
                  <p className="mb-0 text-muted">{lesson.content}</p>
                </div>
                {canManage && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteLesson(lesson._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {canManage && (
        <div className="card p-3">
          <h5>Add a Lesson</h5>
          {lessonError && <div className="alert alert-danger">{lessonError}</div>}
          <form onSubmit={handleAddLesson}>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Lesson title"
                value={lessonForm.title}
                onChange={handleLessonChange}
                required
              />
            </div>
            <div className="mb-2">
              <textarea
                className="form-control"
                name="content"
                placeholder="Lesson content"
                value={lessonForm.content}
                onChange={handleLessonChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Add Lesson</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CourseDetail;