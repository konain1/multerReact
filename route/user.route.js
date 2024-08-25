const express = require('express');
const multer = require('multer');
const ImageModel = require('../model/ImageModel'); // Adjust the path as necessary

// Create a new router instance
const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images'); // Ensure this path exists or handle the case where it doesn't
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Adding a timestamp to ensure unique filenames
    }
});

const upload = multer({ storage: storage });

// Define the upload route
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        console.log(req.file);

        // Create a new ImageModel instance and save the file path to the database
        let ima = await ImageModel.create({ image: req.file.path });
        await ima.save();

        res.json({ msg: 'uploaded', imagePath: req.file.path});
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ msg: 'Failed to upload file', error });
    }
});

router.get('/download',async(req,res)=>{
    let imagess = await ImageModel.find();

    res.json({imagess})
})

// Export the router
module.exports = router;
