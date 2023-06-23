const db = require('../models');
const Users = db.Users;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { registerValidator, loginValidator } = require("../validation");
const nodemailer = require("nodemailer")
const SECRET = process.env.SECRET;
require('dotenv').config()


function generateAccessToken(email,role,id,is_verified) {
    return jwt.sign({ email,role,id,is_verified }, process.env.SECRET, { expiresIn: '2 days' });
   
  }

  const getAllUsers= async (req, res) => {
    try {
      const users= await Users.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


  async function register(req, res) {
    const { first_name, last_name, city, email, password, phone } = req.body;
  
    const { error } = registerValidator(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const emailExists = await Users.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ error: "A User account with this email already exists" });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);
  
      const newUser = await Users.create({
        first_name: first_name,
        last_name: last_name,
        city: city,
        email: email,
        password: hashed_password,
        phone: phone,
        role: "user",
        is_verified: 0
      });
  
      let token = generateAccessToken(email,newUser.id, 0);
      send_mail(email, token);
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



    async function login(req, res){
        const email = req.body.email;
        const password = req.body.password;
        const { error } = loginValidator(req.body);
           if (error) {
    return res.status(400).json({error:error.message});
  }
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({error:"Email is not correct"});
  }
      
          const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
              const token = generateAccessToken(user.email, user.role,user.id);
          res.send(
      JSON.stringify({
        status: "Logged in",
        jwt: token,
        role: user.role,
        id:user.id,
        userName: user.first_name,
        })
    );
  } else {
    return res.status(400).json({ error: "Invalid password" });
  }
  }
  


      function send_mail(mail, token) {
        try {
          const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "ghayamyangohar@gmail.com",
              pass: "xgnqulspfuiaolbl"
            }
          })
      
          const mailOptions = {
            from: "ghayamyangohar@gmail.com",
            to: mail,
            subject: "Sending Email using Node.js",
            text: `sexmel http://localhost:5000/verify?token=${token}`
          }
      
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
              throw new Error("Error sending email") // Генерация ошибки
            } else {
              console.log(`Email sent: ` + info.response)
            }
          })
        } catch (error) {
          console.log(error)
          // Обработка ошибки отправки электронной почты
          // Отправка адекватного ответа клиенту
        }
      }
      
      function verify(req, res) {
        try {
          const token = req.query.token
          const decoded = jwt.verify(token, SECRET)
          Users.update({ is_verified: 1 }, { where: { email: decoded.email } }).then((user) => {
            res.send("Email verified")
          }).catch((err) => {
            console.log(err)
            throw new Error("Error verifying email") // Генерация ошибки
          })
        } catch (error) {
          console.log(error)
          // Обработка ошибки проверки электронной почты
          // Отправка адекватного ответа клиенту
        }
      }

    module.exports={ getAllUsers,generateAccessToken,register,login,verify}