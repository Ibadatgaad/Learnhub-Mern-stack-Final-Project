const Enrollment = require('../models/Enrollment');

// @desc   Enroll the logged-in student in a course
// @route  POST /enrollments
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get all courses the logged-in student is enrolled in
// @route  GET /enrollments/my-courses
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get all students enrolled in a specific course (for instructors)
// @route  GET /enrollments/course/:courseId
const getCourseEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.courseId }).populate(
      'student',
      'name email'
    );
    res.status(200).json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { enrollInCourse, getMyEnrollments, getCourseEnrollments };