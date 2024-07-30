const express = require('express');
const router = express.Router();
const { register, login, updateUser, deleteUser, forgotPassword, resetPassword } = require('../controllers/authController');
const { uploadAvatar, uploadPhotos } = require('../controllers/fileController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/update', auth, updateUser);
router.delete('/delete', auth, deleteUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/upload-avatar', auth, uploadAvatar);
router.post('/upload-photos', auth, uploadPhotos);

module.exports = router;
