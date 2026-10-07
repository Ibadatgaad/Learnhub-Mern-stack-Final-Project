const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  getMyEnrollments,
  getCourseEnrollments,
} = require('../controllers/enrollmentController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/enroll', protect, authorizeRoles('student'), enrollInCourse);
router.get('/my-courses', protect, authorizeRoles('student'), getMyEnrollments);
router.get(
  '/enrollments/course/:courseId',
  protect,
  authorizeRoles('instructor', 'admin'),
  getCourseEnrollments
);

module.exports = router;