const jwt = require('jsonwebtoken');
module.exports = {
    checkRole:(role)=>{
        // console.log("enter in check role..")
  return (req, res, next) => {
      console.log("enter in callback function")
    const token = req.headers['authorization'];
    // console.log(token)
    if (!token) {
        console.log(">>>>>>>>>>>")
      return res.status(401).json({ message: 'Unauthorized, Enter token' });
    }
    try {
        console.log("try method.........")
        console.log(`token is : ${token}`)
        // const token = authHeader && authHeader.split(' ')[1];

        // using normal method 
      const decoded = jwt.verify(token, "qwe1234");
      console.log("decode data.....")
      console.log(decoded)
      console.log(`decode role ${decoded.result.role}`)
      // if (decoded.result.role !== role) {
        const userRole = decoded.result.role;
        if (!role.includes(userRole)) {

          console.log("if block..........")
        return res.status(401).json({ message: 'Unauthorized.......' });
      }
      console.log("decode.bolck...")
      req.user = decoded;
      console.log(req.user)
      next();
    } catch (err) {
        console.log("catch bloack......,.")
        console.log(err)
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
}
//

}






