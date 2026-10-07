const express = require('express');
const router = express.Router();
const { addLesson, getLessons, deleteLesson } = require('../controllers/lessonController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.post(
  '/courses/:courseId/lessons',
  protect,
  authorizeRoles('instructor', 'admin'),
  addLesson
);
router.get('/courses/:courseId/lessons', getLessons);
router.delete('/lessons/:id', protect, authorizeRoles('instructor', 'admin'), deleteLesson);

module.exports = router;