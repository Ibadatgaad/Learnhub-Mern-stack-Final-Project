const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getAnalytics } = require('../controllers/adminController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/admin/users', protect, authorizeRoles('admin'), getAllUsers);
router.delete('/admin/users/:id', protect, authorizeRoles('admin'), deleteUser);
router.get('/admin/analytics', protect, authorizeRoles('admin'), getAnalytics);

module.exports = router;