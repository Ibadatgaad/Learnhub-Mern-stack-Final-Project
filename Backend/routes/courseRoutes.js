const express = require('express');
const router = express.Router();
const {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/courses', getCourses);
router.post('/courses', protect, authorizeRoles('instructor', 'admin'), createCourse);
router.put('/courses/:id', protect, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/courses/:id', protect, authorizeRoles('instructor', 'admin'), deleteCourse);

module.exports = router;