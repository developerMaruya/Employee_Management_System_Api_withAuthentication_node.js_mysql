const pool = require("../db/db.config");

module.exports = {
  ////////////////////////////// create ///////////////////////////
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, gender, email, password, number,role) 
                values(?,?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.role
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  ////////////////////// get by user email ///////////////////////////////////
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  ////////////////////////// get by user id ////////////////////////////////////
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select * from registration where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        // return callBack(null, results[0]);
        callBack(null, results);
      }
    );
  },
  /////////////////////////////////  get all user //////////////////////////////
  getUsers: callBack => {
    pool.query(
      `select id,firstName,lastName,gender,email,number,role from registration`,
      // `select role from registration where role='admin'`,

      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  /////////////////////////////  update /////////////////////////////////////////////
  updateUser: (data, callBack) => {
    console.log(">>>>>>>>>>")
    console.log(data.role)
    pool.query(
      // `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id =? AND role='admin'`,
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=?, role=? where id =?`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.role,
        data.id
      ],
      (error, results, fields) => {
        console.log(results)
        if (error) {
          console.log(`erro is ${error}`)
          callBack(error);
        }
        console.log("update")
        // console.log(callBack(null, results[0]))
        return callBack(null, results);
      }
    );
  },
  /////////////////////////////////////////  delete ////////////////////////////////////
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(results[0]);
      }
    );
  },
  // image upload
  /////////////////////////////////////  image upload //////////////////////////////////////////
  imageupload: (imgdata, data, callBack) => {
    pool.query('INSERT INTO image (name,userid) VALUES (?, ?)', [imgdata, data.userid], (err, result) => {
      if (err) {
        callBack(err, null)
      }
      callBack(null, result)
    });

  },
  // show image
  ///////////////////////////////////////// display image /////////////////////////////////////////////
  displayimage: (data, callBack) => {
    console.log("enter...")
    pool.query('SELECT name FROM image WHERE userid = ?', [data.result.id], (err, results) => {
      var a = []
      console.log("..........")
      for (var i in results) {
        console.log
        const imageData = results[i].data;
        const b = results[i]
        const c = `http://localhost:4000/uploads/${b.name}`
        console.log(b.name)
        a.push(c)
      }
      console.log(a)
      callBack(null, a)
    })

  },

  // end export
  // };


  // you can exprot both type

  /////////////////////////////  create employee /////////////////////////////////
  employeedata: (newuser, results) => {
    const sql = "INSERT INTO employee set ?";
    pool.query(sql, newuser, (error, result) => {
      if (error) {
        results(error, null);
      }
      results(null, result);

    })
  },
  /////////////////////////////////// chack attendance //////////////////////////////
  checkinAttendance: (newuser, results) => {
    const sql = "INSERT INTO checkin set ?";
    pool.query(sql, newuser, (error, result) => {
      if (error) {
        results(error, null);
      }
      // results(null,result);
      console.log(result)

    })
  },
 //////////////////////////////////////  attendance check in employee ///////////////////////////////
  empCheckIn: (newuser, hour1, indianDate, results) => {
    const employeeId = newuser.eid
    console.log(">>>>>>>>>.....")
    console.log(hour1)
    if (10 > hour1) {
      const sql2 = `INSERT INTO checkin(eid,check_in_time,status,startDate)VALUES('${employeeId}','${newuser.check_in_time}','On Time','${indianDate}')`;
      pool.query(sql2, (error, result2) => {
        if (error) {
          console.log(error)
          results(error, null);
          // throw error;
        }
        results(null, result2);
        console.log("you are late checkin")
      })
    }
    else {
      const sql3 = `INSERT INTO checkin(eid,check_in_time,status,startDate)VALUES('${employeeId}','${newuser.check_in_time}','YOU are Late','${indianDate}')`;
      pool.query(sql3, (error, result2) => {
        if (error) {
          console.log(error)
          results(error, null);
          // throw error;
        }
        console.log("check in on time")
        results(null, result2);
      })
    }

  },
  ////////////////////////////////////// employee attendance  CHECK OUT //////////////////////////////
  empCheckOut: (newuser, indianDate, results) => {
    const employeeId = newuser.eid
    const checkoutTime = newuser.check_out_time

    const sql = `UPDATE checkin SET check_out_time = '${checkoutTime}',endDate = '${indianDate}' WHERE eid = ${employeeId} AND check_out_time IS NULL`;
    pool.query(sql, (error, result) => {
      if (error) {
        // throw error;
        console.log(error)
      }
      const sql2 = `SELECT TIMEDIFF(check_out_time, check_in_time) AS worktime FROM checkin WHERE eid = ${employeeId} AND check_out_time IS NOT NULL`;
      pool.query(sql2, (error, result2) => {
        if (error) {
          // throw error;
          console.log(error)
        }
        const dataqur = `SELECT * FROM checkin WHERE eid = ${employeeId}`;
        pool.query(dataqur, (error, data) => {
          if (error) {
            // throw error;
            console.log(error)
          }
          for (var j in data) {
            console.log(data[j].checkid)
          }
          for (var i in result2) {
            // dome
            const time = result2[i].worktime.split(':');
            const hours = parseInt(time[0]);
            const minutes = parseInt(time[1]);
            const seconds = parseInt(time[2]);
            const worktimeString = `${hours} hours : ${minutes} minutes : ${seconds} seconds`;

            const sql3 = `UPDATE checkin SET worktime='${worktimeString}' WHERE checkid = ${data[j].checkid}`;
            pool.query(sql3, (error, result3) => {
              if (error) {
                console.log(error)
              }
              results(null, result3);
            })
          }
        })

      },
      )
    },
    )
  },

  ////////////////////////  check in Date ///////////////////////////////////////////////////
  checkinDate: (userid, startDate, endDate, results) => {
    const sql = `SELECT checkid,check_in_time,check_out_time FROM checkin WHERE eid = ? AND startDate >= ? AND endDate <= ?`
    const params = [userid, startDate, endDate];
    pool.query(sql, params, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  ////////////////////////////////////// all emp leave employee all data ////////////////////////////////////////////
  leaveAllDate: (userid, results) => {
    const sql = `SELECT * FROM companyleave WHERE empid = ?`
    const params = [userid];
    pool.query(sql, params, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  //////////////////////////////////////// conditinal check leave ////////////////////////////////////////
  checkleave: (userid, month, year, results) => {
    // in this case any one write in request and all working 
    // const sql = `SELECT lid,casualLeave,halfDayLeave,medicalLeave,otherLeave FROM companyleave WHERE empid = ? AND (month = ? OR year = ?)`
    // IN AND CASE emp id is requiere and moth or year mai koi bhi dal skatai hai option hai
    const sql = `SELECT lid,casualLeave,halfDayLeave,medicalLeave,otherLeave FROM companyleave WHERE empid = ? AND (month = ? OR year = ?)`
    const params = [userid, month, year];
    pool.query(sql, params, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },

  /////////////////////////////////// update name (only on filed update or all update ) ///////////////////////////////////

  updatename: (fname, lname, userid, results) => {
    console.log(fname)
    console.log(lname)
    // WE CAN USE coalscal also 
    // const sql = 'UPDATE users SET first_name = COALESCE(?, first_name), last_name = COALESCE(?, last_name) WHERE id = ?';
    // both coalesce and ifnull both or working 
    const sql = `UPDATE nameupdate SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName) WHERE id = ${userid}`
    const params = [fname, lname];
    pool.query(sql, params, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  //////////////////////////////////////////////////// salary bill generater ///////////////////////////////////////////////
  generateSalaryPdf: (results) => {
    const sql = `SELECT basic_salary, bonus, deductions, employee.empName, employee.id
  FROM salary
  INNER JOIN employee ON salary.eid=employee.id`
    pool.query(sql, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  // ////////////////////////////////////////////////////  nested ////////////////////////////////////////////////
  // all data show in normal form not a nested form looking simale in one object
  withoutnestedcustomer: (customersdetailsId, results) => {
    const sql = `SELECT customer.cid, customer.cname, customer.cemail,orders.oid,orders.orderdate,orderdetails.itemname,orderdetails.amount,payment.paytype 
  FROM customer 
  INNER JOIN orders ON customer.cid = orders.customerid
  INNER JOIN payment ON customer.cid = payment.orderdetailsid
  INNER JOIN orderdetails ON orders.oid = orderdetails.ordersid
  WHERE cid=?`
    pool.query(sql, customersdetailsId, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  //////////////////////////////////////  nested api using inner join /////////////////////////////////
  nestedcustomer: (customersdetailsId, results) => {
    const sql = `SELECT customer.cid, customer.cname, customer.cemail,orders.oid,orders.orderdate,orderdetails.itemname,orderdetails.amount,payment.pid,payment.paytype 
  FROM customer 
  INNER JOIN orders ON customer.cid = orders.customerid
  INNER JOIN payment ON customer.cid = payment.orderdetailsid
  INNER JOIN orderdetails ON orders.oid = orderdetails.ordersid
  WHERE cid=?`
    pool.query(sql, customersdetailsId, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  ////////////////////////////////////  student nested in side nested ( nested kai ander nested ) ///////////////////////////////
  studentdetails: (customersdetailsId, results) => {
    const sql = `SELECT student.id,student.sname,course.cid,course.courseName,subject.suid,subject.allSubjectName,
  studentdetails.fathername,studentdetails.mobile,studentdetails.address FROM student
  INNER JOIN course ON course.studentid=student.id
  INNER JOIN subject ON subject.courseid=course.cid
  INNER JOIN studentdetails ON studentdetails.subjectid=student.id
  WHERE student.id=?`
    pool.query(sql, customersdetailsId, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  ////////////////////////////////////  all student nested in side nested ( nested kai ander nested ) ///////////////////////////////
  studentsdetails: (results) => {
    const sql = `SELECT student.id,student.sname,course.cid,course.courseName,subject.suid,subject.allSubjectName,
  studentdetails.fathername,studentdetails.mobile,studentdetails.address FROM student
  INNER JOIN course ON course.studentid=student.id
  INNER JOIN subject ON subject.courseid=course.cid
  INNER JOIN studentdetails ON studentdetails.subjectid=student.id
  `
    pool.query(sql, (error, result) => {
      if (error) {
        results(error, null);
      }
      console.log(result)
      results(null, result);

    })
  },
  //////////////////////////////  registration with validation as name ,number email and password etc //////////////////////////////////
  validation_registration: (user, results) => {
    try {
      const sql = `INSERT INTO validation_registration SET ?`
      pool.query(sql, user, (err, result) => {
        if (err) {
          results(err, null);
        } else {
          console.log(result.insertId);
          results(null, result.insertId);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
// /////////////////////////////// search by name and email /////////////////////////////////////
search_registration_details1:(data,results)=>{
  // console.log(data)
  console.log(data)
const sql = `SELECT * FROM registration WHERE email='${data.email}' OR firstName='${data.firstName}'`;
pool.query(sql, (err, result) => {
  if (err) {
    console.error(err); // Print the error to the console
    results(err, null);
  } else {
    results(null, result);
  }
});

},
// search first name and email and show all details data serach in url (inside url)
search_registration_details:(data,results)=>{
const sql = `SELECT * 
FROM registration 
WHERE firstName LIKE '%${data}%' OR lastName LIKE '%${data}%' OR email LIKE '%${data}%'
`;
pool.query(sql, (err, result) => {
  if (err) {
    console.error(err); // Print the error to the console
    results(err, null);
  } else {
    results(null, result);
  }
});

}
}
  // end function
