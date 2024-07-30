const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/fileController');
const auth = require('../middlewares/authMiddleware');

router.post('/upload', auth, uploadFile);

module.exports = router;
