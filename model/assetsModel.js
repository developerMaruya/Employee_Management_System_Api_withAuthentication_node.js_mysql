const conn=require('../db/db.config')
const assetQuery=require('../sql/assetsQuery')

var Asset=function(asset){
    this.id=asset.id;
    this.device_type=asset.device_type;
    this.quantity=asset.quantity;
}

Asset.create=(newAsset,result)=>{
    try{
        conn.query(assetQuery.addAssets,newAsset,(err,res)=>{
            if(err){
                result(err,null)
            }else{
                console.log(res.insertId)
                result(null,res.insertId)
            }
        })
    }catch(err){
        console.log(err);
    }
}
// assign device
Asset.request_device=(reqAsset,result)=>{
    try{
        conn.query(assetQuery.request_device,reqAsset,(err,res)=>{
            if(err){
                result(err,null)
            }else{
                console.log(res.insertId)
                result(null,res.insertId)
            }
        })
    }catch(err){
        console.log(err);
    }
}
// GET ALL ASSEST 
Asset.getAll=(result)=>{
    try{
        conn.query(assetQuery.getall,(err,res)=>{
            if(err){
                result(err,null)
            }else{
                result(null,res)
            }
        })
    }catch(err){
        console.log(err)
    }
}
// get all rating
Asset.getrating=(result)=>{
    try{
        conn.query(assetQuery.getallrating,(err,res)=>{
            if(err){
                result(err,null)
            }else{
                result(null,res)
            }
        })
    }catch(err){
        console.log(err)
    }
}
// post rating  
Asset.createrating=(data,result)=>{
    try{
        conn.query(assetQuery.createrating,data,(err,res)=>{
            if(err){
                result(err,null)
            }else{
                result(null,res)
            }
        })
    }catch(err){
        console.log(err)
    }
}

// // update assigned // working
// Asset.updateAsset=(reqAsset,asid,result)=>{
//     try{
//         conn.query(assetQuery.updateAsset,[
//             reqAsset.status,
//             reqAsset.assignby,
//             asid
//           ],(err,res)=>{
//             if(err){
//                 result(err,null)
//             }else{
//                 result(null,res)
//             }
//         })
//     }catch(err){
//         console.log(err);
//     }
// }


// testing demo

Asset.updateAsset=(reqAsset,asid,result)=>{
    try{
        conn.query(assetQuery.updateAsset,[
            reqAsset.status,
            reqAsset.assignby,
            reqAsset.deviceType,
            asid
          ],(err,res)=>{
            if(err){
                result(err,null)
            }else{
                conn.query(assetQuery.gettotaldevice,reqAsset.deviceType,(err,res1)=>{
                        if(err){
                            console.log(err)
                        }else{
                
                        console.log("get all")
                        console.log(res1[0].device_type)  
                        console.log(res1[0].quantity-1) 
                        const b=res1[0].device_type
                        const a=res1[0].quantity-1
                        conn.query(assetQuery.updatetotalassets,[a,b],(err,res2)=>{
                
                            console.log("update")
                            console.log(res2)
                    }) 
                }
                })
                result(null,res)
            }
        })
    }catch(err){
        console.log(err);
    }
}
// show attandance based on checkin data
Asset.attandance=(eid,month,year,results)=>{
    try{
        conn.query(assetQuery.attandance,[eid,month,year],(err,res)=>{
            if(err){
                results(err,null)
            }else{
                results(null,res)
            }
        })
    }catch(err){
        console.log(err)
    }
}
// employee monthly salary 
Asset.salary=(eid,month,year,results)=>{
    try{
        conn.query(assetQuery.salary,[eid,month,year],(err,res)=>{
            if(err){
                results(err,null)
            }else{
                results(null,res)
            }
        })
    }catch(err){
        console.log(err)
    }
}
// end function
module.exports=Asset;