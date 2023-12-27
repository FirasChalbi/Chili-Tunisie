const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, food, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, food, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, food.filename + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });


module.exports = upload;

