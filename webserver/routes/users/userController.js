const User = require('./userEntity');
const nodemailer = require('nodemailer');

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

 function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

module.exports = {
  signUp : (req,res) => {
console.log(req.body);
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


     let newUser = new User();
     let rand = guid();//Math.floor(Math.random() * 899999 + 100000);
      newUser.verificationID = rand;
      newUser.fname = req.body.fname.toLowerCase().capitalizeFirstLetter();
      newUser.lname = req.body.lname.toLowerCase().capitalizeFirstLetter();
      newUser.email = req.body.email;
      newUser.password = User.generateHash(req.body.password);
      newUser.tempPassword = req.body.password;
      newUser.loggedinStatus = false;
      newUser.isEmailVerified = false;
      var transporter = nodemailer.createTransport({
              /*eslint-disable */
              service: 'Gmail',
              secure: true,
              auth: {
                  user: 'zynla0001@gmail.com', // Your email id
                  pass: 'Zynla@123' // Your password
              }
          });


          var link = 'http://' + req.get('host') + '/redirectVerifyEmail?email=' + req.body.email +'&key='+rand;

          var mailOptions = {
                             from: 'zynla0001@gmail.com', // sender address
                             to: req.body.email, // reciever
                             subject: 'Verify your Email with 4ALL', // Subject line
                             text: 'Hello from 4ALL' ,
                             html: '<center><h1>Welcome to 4ALL</h1></center><br><br><br>' + 'Hi,<br><br>TO verify your email Click on the below button.' + '<br><br><br><a href=' + link + ' style=background-color:#44c767 ;' + '-moz-border-radius:28px;-webkit-border-radius:28px;border-radius:28px;' + 'border:1px solid #18ab29 ;display:inline-block;padding:16px 31px;' + 'color:#ffffff ;text-shadow:0px 1px 0px #2f6627 ;' + 'text-decoration:none;> Click Here </a><br><br>' + '<i>This link is valid for an hour.This is an Auto-generated mail,' + 'please do not reply</i></small>' };

    console.log(mailOptions , req.get('host'));

      res.cookie('username', newUser.email);
      newUser.save(function(err) {
          if (err) {
              res.send('Error in registration');
          } else {
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error ,'error');
                        res.send('Error in registration');
                    } else {
                        console.log('Message sent: ' + info.response);
                        res.send({email: req.body.email , message :'Mail Sent Successfully' });
                    }
                });
          }
      });
  },
  verifyEmail : (req,res) =>{
    console.log( req.body.email ,"email");
    User.find({
          'email': req.body.email
        },(err,user)=>{
          console.log(user);
            if(err)
              console.log(err);
            else if(user.length >=1) {
              res.send("Email allready Exists")
            }
            else {
              res.send("Email Dosnt Exists")
            }
        })
  },
  login : (req,res,done) => {
    console.log(req.body,req.user,"from login");
    if(req.user.err)
      res.send(req.user)
      else {
    res.cookie('fname', req.user.fname);
    res.cookie('lname', req.user.lname);
    res.cookie('email', req.user.email);
    res.send(req.user);
  }
  },
  redirectVerifyEmail : (req,res) =>{
    console.log(req.query.email,req.query.key);
    // res.send(res.query)
    User.findOne({
          'email': req.query.email
        },(err,user) => {
          console.log(user);
          if(user){
          if(req.query.key == user.verificationID) {
          User.update({'email':req.query.email}, {
                                      $set: {
                                          'isEmailVerified': true,
                                          'verificationID': ''
                                      }
                                  } ,(err) =>{
                                    if(err) {
                                      console.log(err);
                                      res.send(err)
                                    }
                                    else {
                                      res.redirect('http://localhost:8081#/?query=emailverified');
                                    }
                                  })
        }
        else if(user.isEmailVerified){
          res.redirect('http://localhost:8081#/?query=emailallreadyverified')
        }else {
          res.redirect('http://localhost:8081#/?query=emailnotverified');
        }
}
else{
res.redirect('http://localhost:8081#/?query=emailnotverified');
}
        })
  }
}
