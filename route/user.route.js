const express = require('express');
const multer = require('multer')
const ImageModel = require('../model/ImageModel')

// Create a new router instance
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

// Define the route
router.post('/upload',upload.single('file') ,async(req, res) => {
   console.log(req.file)
    
   await ImageModel.create({image:req.file.filename})
});

// Export the router
module.exports = router;
