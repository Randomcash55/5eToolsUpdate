require("dotenv").config();
const nodemailer = require("nodemailer");
const https = require("https");
let siteStatus = false;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.emailUsr,
    pass: process.env.emailPass
  }
})

const mailOptions = {
  from: process.env.emailUsr,
  to: process.env.destUsr,
  subject: "It's Back BB",
  html: `<a href="http://5e.tools"><img src="http://i.imgur.com/io4axAAh.jpg"></a>`
}

function getStatus(){
  https.get("https://5e.tools", (res) => {
    if(res.statusCode == 200){
      siteStatus = true;
      transport.sendMail(mailOptions, (err, info) => {
        if(err){
          console.error(err);
        }else{
          console.log("It's back!");
        }
      })
    }
    if(!siteStatus){
      setTimeout(getStatus, 5000)
    }
  })
}

getStatus()
