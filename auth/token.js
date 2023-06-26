const jwt = require('jsonwebtoken');



const Token  = (token) =>{
    return jwt.verify(token, "qwe1234");;
}

module.exports = Token;