const express = require('express');
const router = express();
const controlles = require('../controllers/user_upload');


const multer  = require('multer')
const mimeTypesFile = [
    'image/jpg', 'image/jpeg', 'image/png'
];

const fileFilterData = (req, file, cb) => {
    if (!mimeTypesFile.includes(file.mimetype)) {
        console.log("vikhar");
        req.uploadError = 'file Extension Should Be jpg, jpeg or png.';
        cb(null, false);
    } else
        cb(null, true);
}
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
     },
    filename: function (req, file, cb) {
        if(file){
            console.log('file', file);
            cb(null , file.originalname);
        }else{
            req.uploadError = 'Please Select Image to Upload';
        }
    }
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilterData,
    // limits: { fileSize: 100000 }
});

// regitration
router.post('/registration', controlles.saveData);
// login
router.post('/login', controlles.LoginUser);
// login
router.post('/upload', upload.single('profile'), controlles.UploadProfile);

router.get('/profile?', controlles.getUserUploadImage);


router.delete('/profile/:id', controlles.deleteUserUploadImage);

exports.router = router;