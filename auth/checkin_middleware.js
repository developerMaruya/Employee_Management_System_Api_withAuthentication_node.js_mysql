// Middleware to check if employee has checked out before checking in

const conn=require('../db/db.config')
const checkCheckout = (req, res, next) => {
    const employeeId = req.body.eid;
    const sql = `SELECT * FROM checkin WHERE eid = ${employeeId} AND check_out_time IS NULL`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length > 0) {
            res.status(400).send('Employee must checkout before checking ');
        } else {
            next();
        }
    });
};
// checkout check-
const checkCheckin = (req, res, next) => {
    const employeeId = req.body.eid;
    const sql = `SELECT * FROM checkin WHERE eid = ${employeeId} AND check_out_time IS NULL`;
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length == 0) {
            res.status(400).send('Employee must checkin before checkout ');
        } else {
            next();
        }
    });
};
module.exports={checkCheckout,checkCheckin}