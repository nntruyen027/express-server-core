const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

exports.uploadFile = (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    try {
      const newFile = new File({
        filename: req.file.filename,
        path: req.file.path,
        user: req.user.id
      });

      await newFile.save();
      res.json({ file: req.file });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
};

exports.uploadAvatar = (req, res) => {
  upload.single('avatar')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    try {
      const user = await User.findById(req.user.id);
      user.avatar = req.file.filename;
      await user.save();
      res.json({ avatar: user.avatar });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
};

exports.uploadPhotos = (req, res) => {
  upload.array('photos', 10)(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    try {
      const user = await User.findById(req.user.id);
      const files = req.files.map(file => file.filename);
      user.photos.push(...files);
      await user.save();
      res.json({ photos: user.photos });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
};