const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  imageupload,
  displayimage, employeedata, checkinAttendance, empCheckIn, empCheckOut, updatename, checkinDate, leaveAllDate, checkleave,
  generateSalaryPdf, withoutnestedcustomer, nestedcustomer, studentdetails,studentsdetails,validation_registration,search_registration_details1,search_registration_details
} = require("../model/userModel");
// const { employeedata, checkinAttendance, empCheckIn, empCheckOut,updatename } = require('../model/userModel');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const TokenModule = require('../auth/token')
const randomstring = require('randomstring');
const sendMail = require('../helper/sendmail')
const pool = require('../db/db.config')
const pdf = require('pdfkit');
const fs = require('fs');
const xlsx = require("xlsx");
const bcrypt = require('bcryptjs');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "5h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    console.log(`params is is ${id}`)
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    // console.log(res.id)
    updateUser(body, (err, results) => {
      if (err) {
        console.log(`err is .....${err}`)
        // return;
      }
      // console.log(`id is : ${body.id}`)
      else {
        if (results.affectedRows == 0) {
          res.send("id not presents")
        } else {
          res.send("updated")
        }
      }
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`id is :${data.id}`)
      // if (!results) {
      if (results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },
  // upload image
  imageupload: (req, res) => {
    const data = req.body;
    const imgdata = req.file.originalname
    imageupload(imgdata, data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "image upload  successfully"
      });
    });
  },
  // display image
  displayimage: (req, res) => {
    console.log("enter displey")
    const token = req.headers['authorization']
    console.log(token)
    decodeToken = TokenModule(token)
    console.log(decodeToken)
    displayimage(decodeToken, (err, results) => {
      console.log(">>>>>>>>>>>>>")
      console.log(results)
      if (err) {
        console.log("djddjddjj")
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "image display  successfully",
        image: results
      });
    });
  },
  // };

  // you can use it both type 

  employeedata: (req, res) => {
    const newuser = {
      empName: req.body.empName,
      empEmail: req.body.empEmail,
    }
    employeedata(newuser, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        let mailsubject = 'mail varification';
        const randomToken = randomstring.generate();
        let content = '<p>hii ' + req.body.empName + ', please <a href="http://localhost:4000/mail-varification?token=' + randomToken + '"> varifiy</a> your mail';
        sendMail(req.body.empEmail, mailsubject, content);
        // save token on db taki usai vaifiy kar sai aagai 
        pool.query('update employee set token=? where empEmail=?', [randomToken, req.body.empEmail], function (erroror, result, fields) {
          if (erroror) {
            console.log(erroror)
          }
        });

        //
        res.json({ data })
      }
    })
  },
  // emp demo check in 
  checkinAttendance: (req, res) => {
    const newuser = {
      check_in_time: req.body.check_in_time,
      eid: req.body.eid

    }

    checkinAttendance(newuser, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json({ data })
        console.log(data)
      }
    })
  },

  // working-
  empCheckIn: (req, res) => {
    // get time
    const check_in_time = new Date().toLocaleString("en-us", { timeZone: 'Asia/Kolkata', hourCycle: 'h24' });
    console.log(check_in_time)
    const date = new Date(check_in_time);
    const hours = date.toLocaleTimeString({ hour12: false });
    const hour1 = date.getHours();
    console.log(hours)
    const indianDate = date.toLocaleDateString('en-IN');
    console.log(indianDate);

    const newuser = {
      eid: req.body.eid,
      check_in_time: hours,
    }
    empCheckIn(newuser, hour1, indianDate, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status_code: "200",
          status: "success",
          message: 'Employee checked in'
        });
      }
    })
  },
  // CHECK OUT 
  empCheckOut: (req, res) => {
    const check_out_time = new Date().toLocaleString("en-us", { timeZone: 'Asia/Kolkata', hourCycle: 'h24' });
    console.log(check_out_time)
    const date = new Date(check_out_time);
    const hours = date.toLocaleTimeString({ hour12: false });
    console.log(hours)
    const indianDate = date.toLocaleDateString('en-IN');
    const newuser = {
      eid: req.body.eid,
      check_out_time: hours
    }
    empCheckOut(newuser, indianDate, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status_code: "200",
          status: "success",
          message: 'Employee checked out'
        });

      }
    })
  },
  // check in date

  checkinDate: (req, res) => {
    const userid = req.body.eid;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate

    checkinDate(userid, startDate, endDate, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">>>>>>>>>>>.....")
        res.json({
          status_code: "200k",
          status: "desplay date",
          data: data
        })
      }
    })
  },
  // leave employee all data
  leaveAllDate: (req, res) => {
    const userid = req.params.id;

    leaveAllDate(userid, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">>>>>>>>>>>.....")
        res.json({
          status_code: "200k",
          status: "all employee leave date",
          data: data
        })
      }
    })
  },
  // check by condition
  checkleave: (req, res) => {
    const userid = req.body.eid;
    const month = req.body.month;
    const year = req.body.year
    checkleave(userid, month, year, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">>>>>>>>>>>.....")
        res.json({
          status_code: "200k",
          status: "all employee leave date",
          data: data
        })
      }
    })
  },
  // update name 
  updatename: (req, res) => {
    console.log("update name")
    const userid = req.params.id;
    const fname = req.body.firstName;
    const lastName = req.body.lastName;

    updatename(fname, lastName, userid, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">>>>>>>>>>>.....")
        res.json({
          status_code: "200k",
          status: "successfull updated"
        })
      }
    })
  },
  // salary bill pdf
  generateSalaryPdf: (req, res) => {
    generateSalaryPdf((error, results) => {
      console.log(results)
      if (error) {
        console.log("error....")
      }
      const bills = results.map(employee => {
        const salary = employee.basic_salary + employee.bonus - employee.deductions;
        return {
          id: employee.id,
          empName: employee.empName,
          basic_salary: employee.basic_salary,
          bonus: employee.bonus,
          deductions: employee.deductions,
          salary: salary
        };
      });
      // generate a PDF bill for each employee
      bills.forEach(bill => {
        const doc = new pdf();
        doc.pipe(fs.createWriteStream(`bills/${bill.id}.pdf`));

        // Add title and headings for the bill
        doc.fontSize(20).text('Employee Salary Bill', { align: 'center' }).moveDown();
        doc.fontSize(16).text(`Employee ID: ${bill.id}`).moveDown();
        doc.fontSize(16).text(`Employee Name: ${bill.empName}`).moveDown();
        doc.fontSize(16).text(`Employee Basic Salary: ${bill.basic_salary}`).moveDown();
        doc.fontSize(16).text(`Employee bonus: ${bill.bonus}`).moveDown();
        doc.fontSize(16).text(`Employee deductions: ${bill.deductions}`).moveDown();
        doc.fontSize(16).text(`Final Employee Salary: $${bill.salary.toFixed(2)}`).moveDown();

        doc.end();
      });
      res.json({
        status_code: "200k",
        status: "genrated salary pdf"
      })
    }
    )
  },
  // xl to pdf or txt converter
  xlToPdfOrTxtConverter: (req, res) => {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    //   const workbook = xlsx.readFile('leave1.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    if (data.length === 0) {
      return res.status(400).json({ error: 'No data in file' });
    }
    const expectedColumns = ['leave_type', 'days'];
    const sheetColumns = Object.keys(data[0]);
    if (!expectedColumns.every(column => sheetColumns.includes(column))) {
      return res.status(400).json({ error: 'Invalid Excel sheet format' });
    }
    const columnMap = {
      leavtype: 'leave_type',
      days: 'days'
    };
    const values = data.map(row => {
      return [row[columnMap.leavtype], row[columnMap.days]];
    });
    if (req.body.convert == "pdf") {
      // process the retrieved data to calculate the salary for each employee
      const bills = values.map(employee => {
        const leave_type = employee[0];
        const leave = employee[1];
        return {
          emp_leave: leave_type,
          leave: leave
        };
      });
      const doc = new pdf();
      doc.pipe(fs.createWriteStream(`bills/leave.pdf`));
      doc.fontSize(20).text('Employee leave', { align: 'center' }).moveDown();
      for (var i in bills) {
        doc.fontSize(16).text(`Employee leave_type: ${bills[i].emp_leave}`).moveDown();
        doc.fontSize(16).text(`Employee leave_days: ${bills[i].leave}`).moveDown();
      }
      doc.end();
      res.json({
        code: "200k",
        status: "successfull",
        message: "xl file conveted to pdf"

      }
      )
    }
    // txt file
    if (req.body.convert == "txt") {
      const bills = values.map(employee => {
        const leave_type = employee[0];
        const leave = employee[1];
        return {
          emp_leave: leave_type,
          leave: leave
        };
      });
      const str = bills.map(obj => `\nEmployee leave_type:${obj.emp_leave} \nEmployee leave_day:${obj.leave}\n`).join(' ');
      console.log(str)
      fs.writeFile('bills/leave.txt', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      res.json({
        code: "200k",
        status: "successfull",
        message: "xl file conveted txt"

      }
      )
    }
  },
  // nested data
  // all data show in normal form not a nested form looking simale in one object
  withoutnestedcustomer: (req, res) => {
    const customersdetailsId = req.params.id;
    withoutnestedcustomer(customersdetailsId, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(">>>>>>>>>>>.....")
        res.json({
          status_code: "200k",
          status: "all employee leave date",
          data: data
        })
      }
    })
  },
  // nested api
  nestedcustomer: (req, res) => {
    const customersdetailsId = req.params.id;
    nestedcustomer(customersdetailsId, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'customersdetails not found', results });
      } else {
        const customersdetails = {
          id: results[0].cid,
          name: results[0].cname,
          email: results[0].cemail,
          orderdetails: [],
          payment: []
        };
        // order and orderdetails
        const orderdetails = results.reduce((acc, curr) => {
          if (!acc[curr.id]) {
            acc[curr.id] = {
              oid: curr.oid,
              orderdate: curr.orderdate,
              item: curr.itemname,
              amount: curr.amount
            };
          }
          return acc;
        }, {});
        console.log('orderdetails:', orderdetails);

        for (let courseId in orderdetails) {
          customersdetails.orderdetails.push(orderdetails[courseId]);
        }
        // payment working 
        const payment = results.reduce((acc, curr) => {
          if (!acc[curr.id]) {
            acc[curr.id] = {
              payid: curr.pid,
              pay: curr.paytype
            };
          }
          return acc;
        }, {});
        console.log('payment:', payment);

        for (let paymentId in payment) {
          customersdetails.payment.push(payment[paymentId]);
        }

        res.json({ customersdetails });
      }
    });
  },
  // nested inside nested api student 
  studentdetails: (req, res) => {
    const customersdetailsId = req.params.id;
    studentdetails(customersdetailsId, (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result)
      const studentDetils = {
        id: result[0].id,
        name: result[0].sname,
        coursedetails: [
          {
            cid: result[0].cid,
            courseName: result[0].courseName,
            subjectdetails: [
              {
                subjectid: result[0].suid,
                AllSubjectName: result[0].allSubjectName
              }
            ]
          }],
        studentdetails: [
          {
            fathername: result[0].fathername,
            mobile: result[0].mobile,
            address: result[0].address
          }
        ]
      }
      console.log(studentDetils)
      res.send(studentDetils)
    })
  },
  // all student details
  // nested inside nested api student 
  studentsdetails: (req, res) => {
    studentsdetails((err, result) => {
      if (err) {
        throw err;
      }
      
      res.send(result)
    })
  },
  ////////////////////////////////////// validation registration on every filed as name ,email , number, password ///////////////////
  // check by condition
  validation_registration: async (req, res) => {
    const { name, lastname, mobile_number, email, dob, password } = req.body;
    const isNameValid = (name) => /^[a-zA-Z]+$/.test(name);
    const isEmailValid = (email) => /^[^\s@]+@gmail\.com$/.test(email);
    const isDobValid = (dob) => /^\d{4}-\d{2}-\d{2}$/.test(dob);
    const isPasswordValid = (password) => /^.{8,}$/.test(password);
    if (!isNameValid(name)) {
      return res.status(400).json({ error: 'Invalid name' });
    }
    if (!isNameValid(lastname)) {
      return res.status(400).json({ error: 'Invalid lastname' });
    }
    if (!isEmailValid(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (!isDobValid(dob)) {
      return res.status(400).json({ error: 'Invalid date of birth' });
    }
    if (!isPasswordValid(password)) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { name, lastname, mobile_number, email, dob, password: hashedPassword };
    validation_registration(user, (err, employee) => {
      if (employee != null) {
        res.status(201).json({
          statusCode: 201,
          status: "success",
          message: "Employee addedd successfully",
        });
      } else {
        if (err.code === "ER_DUP_ENTRY") {
          console.log(err);
          res.json({
            statusCode: 403,
            status: "failed",
            message: "Duplicate entry",
            data: employee,
          });
        }
      }
    })
  },
  /////////////////////// search registration details name or email /////////////////
  search_registration_details1:(req,res)=>{
    const searchdata=req.body;
    search_registration_details1(searchdata,(err,result)=>{
      if(err){
        console.log("err")
      }else{
        console.log(result)
        res.send(result)
      }
      
    })
  },
  /////////////////////// search registration details name or email /////////////////
  search_registration_details:(req,res)=>{
    const searchTerm = req.query.search;
    console.log(searchTerm)
    search_registration_details(searchTerm,(err,result)=>{
      if(err){
        console.log("err")
      }else{
        console.log(result)
        res.send(result)
      }
      
    })
  },
  // end
}
