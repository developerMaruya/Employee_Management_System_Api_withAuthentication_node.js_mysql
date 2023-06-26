const multer = require('multer')

const router = require("express").Router();
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser,
  imageupload,
  displayimage,
  employeedata, checkinAttendance, empCheckIn, empCheckOut, updatename, checkinDate, leaveAllDate, checkleave, generateSalaryPdf,
  xlToPdfOrTxtConverter, withoutnestedcustomer, nestedcustomer, studentdetails,validation_registration,search_registration_details1,
  search_registration_details,studentsdetails
} = require("../controller/userController");

const express = require('express')
const app = express()
const { checkCheckout, checkCheckin } = require('../auth/checkin_middleware')
// upload image 
app.use('/uploads', express.static('uploads'))
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`)
  }
})
const upload = multer({
  storage: storage
})
// billing
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'bills/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploads = multer({ storage: storage1 });
// const {checkToken}=require("../../auth/token_validation");
const { checkRole } = require("../auth/rolemeddilware");
router.get("/", checkRole('admin'), getUsers);



router.get("/", checkRole('admin'), getUsers);
// data registration with send email 
router.post("/", createUser);
// router.get("/:id",getUserByUserId);    // comment then other work if it need then uncomment it
router.post("/login", login);
router.patch("/", checkRole(['admin', 'employee']), updateUsers);
router.delete("/", checkRole('admin'), deleteUser);
// image upload
router.post("/uploads", upload.single('image'), imageupload);
router.get("/img", displayimage);
// checking checkout 
router.post('/employee', employeedata);
router.post('/checkin', checkinAttendance);   //// testing perpose
// working checking -
router.post('/check_out', checkCheckin, empCheckOut);
router.post('/check_in', checkCheckout, empCheckIn);

router.post('/checkin_date', checkinDate);
// leave employee data
router.get("/allLeave/:id", leaveAllDate);
router.post("/searchLeave", checkleave);
// update firstname or last name using on query
router.put('/updateName/:id', updatename);
router.get('/salarypdf', generateSalaryPdf); // generate salary bill
router.post('/xlToPdfOrTxt', uploads.single('file'), xlToPdfOrTxtConverter);

// nested data
router.get('/withoutnestedcustomer/:id', withoutnestedcustomer);    // inner join show all data without nested
router.get('/nestedcustomer/:id', nestedcustomer);                    // inner join show all data with nested form
router.get('/studentdetails/:id', studentdetails);  
router.get('/studentsdetails', studentsdetails);                // show data inside nested another nested in side nested
// validation registration 
router.post('/validation_registration', validation_registration);    
// search by name or email show details  
router.post('/search_registration_details1', search_registration_details1);         
router.get('/search_registration_details', search_registration_details);        

module.exports = router;
