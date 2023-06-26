const addAssets = `INSERT INTO avaliable_assets set ?`;
const getall = `SELECT * FROM avaliable_assets`;
const getallrating = `SELECT * FROM rating`;
const gettotaldevice = `SELECT * FROM avaliable_assets WHERE device_type=?`;
const updatetotalassets = `UPDATE avaliable_assets SET quantity = ? WHERE device_type = ?`;
const request_device = `INSERT INTO assign_device set ?`;
const updateAsset = `UPDATE assign_device SET status = COALESCE(?,status),assignby = COALESCE(?,assignby),deviceType = COALESCE(?,deviceType) WHERE asid = ?`;
const createrating=`INSERT INTO rating set ?`;
const attandance=`SELECT COUNT(*) AS totalCheckins FROM checkin WHERE eid = ? AND MONTH(STR_TO_DATE(startDate, '%d/%m/%Y')) = ? AND YEAR(STR_TO_DATE(startDate, '%d/%m/%Y')) = ?`;
const salary=`SELECT COUNT(*) AS totalCheckins FROM checkin WHERE eid = ? AND MONTH(STR_TO_DATE(startDate, '%d/%m/%Y')) = ? AND YEAR(STR_TO_DATE(startDate, '%d/%m/%Y')) = ?`;
module.exports={
    addAssets,
    getall,
    getallrating,
    gettotaldevice,
    request_device,
    updateAsset,
    updatetotalassets,
    createrating,
    attandance,
    salary
}