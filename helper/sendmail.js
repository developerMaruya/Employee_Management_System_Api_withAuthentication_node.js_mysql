const nodemailer=require('nodemailer')
const{SMPT_MAIL,SMTP_PASSWORD}=process.env;

const sendMail=async(email,mailsubject,content)=>{
    try{
        const transport=nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,      // server pai jb hoga true local hai so false hai 
            requireTLS:true,   // server par false hoga
            auth:{
                user:'707mauryaji@gmail.com',
                pass:'uuzkqfjzpcgltzmh'
            }
        });

        const mailOption={
            from:SMPT_MAIL,
            to:email,
            subject:mailsubject,
            html:content
        }
        transport.sendMail(mailOption,function(error,info){
            if(error){
                console.log(error);
            }
            else{
               console.log('mail send successfully !',info.response) 
            }
        })
    }catch(error){
        console.log(error.message);
    }
}

module.exports=sendMail;