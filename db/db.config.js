const mysql=require('mysql')

const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"em"
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }
    console.log("database connected !!")
})


module.exports=conn;