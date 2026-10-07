const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// @desc   Add a lesson to a course
// @route  POST /courses/:courseId/lessons
const addLesson = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, content, order } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Only the course's own instructor (or an admin) can add lessons to it
    if (req.user.role !== 'admin' && course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add lessons to this course' });
    }

    const lesson = await Lesson.create({ course: courseId, title, content, order });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Get all lessons for a course
// @route  GET /courses/:courseId/lessons
const getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Delete a lesson
// @route  DELETE /lessons/:id
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('course');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (
      req.user.role !== 'admin' &&
      lesson.course.instructor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this lesson' });
    }

    await lesson.deleteOne();
    res.status(200).json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addLesson, getLessons, deleteLesson };