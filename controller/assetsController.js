const Asset = require("../model/assetsModel");

exports.createAsset=(req,res)=>{
    try{
        const newAsset = req.body;
        Asset.create(newAsset, (err, asset) => {
            if(asset !=null){
                res.status(201).json({
                    statusCode:201,
                    status:"success",
                    message:"Assest add success fully",
                    data:newAsset
                })
            }else if (err.errno == 1062) {
                console.log(err);
                res.json({
                  statusCode: 403,
                  status: "failed",
                  message: "Duplicate entry",
                });
              } else if (err.code === "ER_BAD_NULL_ERROR") {
                console.log(err);
                res.json({
                  statusCode: 400,
                  status: "failed",
                  message: "please fill all mandatory fields",
                });
              } else if (err) {
                console.log(err);
                res.status(400).json({
                  statusCode: 400,
                  status: "failed",
                  message: "sometging went wrong",
                });
              }
        })
    }catch(err){
        console.log(err)
    }
}
// request for assets
exports.request_device=(req,res)=>{
    try{
        const reqAsset = req.body;
        Asset.request_device(reqAsset, (err, asset) => {
            if(asset !=null){
                res.status(201).json({
                    statusCode:201,
                    status:"success",
                    message:"requesting for assest sucess",
                    data:reqAsset.deviceType
                })
            }else if (err.errno == 1062) {
                console.log(err);
                res.json({
                  statusCode: 403,
                  status: "failed",
                  message: "Duplicate entry",
                });
              } else if (err.code === "ER_BAD_NULL_ERROR") {
                console.log(err);
                res.json({
                  statusCode: 400,
                  status: "failed",
                  message: "please fill all mandatory fields",
                });
              } else if (err) {
                console.log(err);
                res.status(400).json({
                  statusCode: 400,
                  status: "failed",
                  message: "sometging went wrong",
                });
              }
        })
    }catch(err){
        console.log(err)
    }
}
// get all assests
exports.getAll=(req,res)=>{
    try{
        Asset.getAll((err,result)=>{
            if(err){
                res.json({
                    statusCode:400,
                    status:"faild",
                    message:"get assest data faild ....."
                })
            }else{
                res.json({
                    statusCode:200,
                    status:"success",
                    message:"avaliable all store assets",
                    data:result
                })
            }
        })
    }catch(err){
        console.log(err)
    }
}
// get all rating
exports.getrating=(req,res)=>{
    try{
        Asset.getrating((err,result)=>{
            if(err){
                res.json({
                    statusCode:400,
                    status:"faild",
                    message:"get assest data faild ....."
                })
            }else{
                res.json({
                    statusCode:200,
                    status:"success",
                    message:"avaliable all rating",
                    data:result
                })
            }
        })
    }catch(err){
        console.log(err)
    }
}
// post rating to client
exports.createrating=(req,res)=>{
    const data= req.body;
    try{
        Asset.createrating(data,(err,result)=>{
            if(err){
                res.json({
                    statusCode:400,
                    status:"faild",
                    message:"rating faild"
                })
            }else{
                res.json({
                    statusCode:200,
                    status:"success",
                    message:"rating add successfully",
                    data:result
                })
            }
        })
    }catch(err){
        console.log(err)
    }

}
// // assign asset
// exports.updateAsset=(req,res)=>{
//     const reqAsset=req.body
//     const asid=req.body.asid
//     try{
//         Asset.updateAsset(reqAsset,asid,(err,result)=>{
//             if(err){
//                 res.json({
//                     statusCode:400,
//                     status:"faild",
//                     message:"can not assigen faild..."
//                 })
//             }else{
//                 res.json({
//                     statusCode:200,
//                     status:"success",
//                     message:"assigned device",
//                     data:result
//                 })
//             }
//         })
//     }catch(err){
//         console.log(err)
//     }
// }

// demo
// assign asset
exports.updateAsset=(req,res)=>{
    const reqAsset=req.body
    const asid=req.body.asid
    // const devic_type=req.body.deviceType
    try{
        Asset.updateAsset(reqAsset,asid,(err,result)=>{
            if(err){
                res.json({
                    statusCode:400,
                    status:"faild",
                    message:"can not assigen faild..."
                })
            }else{
                res.json({
                    statusCode:200,
                    status:"success",
                    message:"assigned device",
                    // data:result
                })
            }
        })
    }catch(err){
        console.log(err)
    }
}
// find attendance based on checkin details
exports.attandance=(req,res)=>{
    const { eid,month, year } = req.body;
  console.log(eid,month, year);
  try{
    Asset.attandance(eid,month,year,(err,result)=>{
        if(err){
            res.json({
                statusCode:400,
                status:"faild",
                message:"get attandance fail check again"
            })
        }else{
            res.json({
                statusCode:200,
                status:"sucess",
                message:"show total present employee",
                employee_total_present:result
            })
        }
    })
  }catch(err){
      console.log(err)
  }
}
// calculate  employee salary 
exports.salary=(req,res)=>{
    const { eid,month, year,empsalary} = req.body;
  console.log(eid,month, year,empsalary);
  try{
    Asset.salary(eid,month,year,(err,result)=>{
        if(err){
            res.json({
                statusCode:400,
                status:"faild",
                message:"salary calculate faild "
            })
        }else{
            const totalCheckins = result[0].totalCheckins;
            console.log(totalCheckins)
            const perDaySalary = empsalary / 30;
            console.log(perDaySalary)
            const monthlyS = perDaySalary * totalCheckins;
            const monthlySalary ="RS."+" "+ Math.floor(monthlyS)
            res.json({
                statusCode:200,
                status:"sucess",
                message:"show employee salary",
                employee_monthly_salary:monthlySalary
            })
        }
    })
  }catch(err){
      console.log(err)
  }
}
