const db = require('../models');
const Users = db.Users;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const SECRET = process.env.SECRET;
require('dotenv').config()


function generateAccessToken(email,role,is_verified) {
    return jwt.sign({ email,role,is_verified }, process.env.SECRET, { expiresIn: '2 days' });
   
  }

  function register(req, res){
    const { first_name, last_name, city, email, password, phone } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
    if(!emailRegex.test(email)){
      return res.status(400).json({error: "Invalid email format"});
    }
    
    Users.findOne({where:{email:email}}).then((user)=>{
      if(user){
        return res.status(400).json({error: "Email already exists"});
      }
  
      bcrypt.hash(password, 10, function(err, hash) {
        if(err){
          return res.status(500).json({error: err.message});
        }
        
        Users.create({
          first_name: first_name,
          last_name: last_name,
          city: city,
          email: email,
          password: hash,
         
          phone: phone,
          role: "user",
          is_verified: 0
        }).then((data)=>{
          let token = generateAccessToken(email, 0);
        //   send_mail(email, token);
          res.status(201).json(data);
        }).catch((err)=>{
          res.status(500).json({error: err.message});
        });
      });
    });
  }
  



    function login(req, res){
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
      
        Users.findOne({where:{email:email}}).then((user)=>{
          if(!user){
            return res.status(400).json({error: "Email or password is incorrect"});
          }
      
          bcrypt.compare(password, user.password, function(err, result) {
            if(result) {
              const token = generateAccessToken(user.email, user.role);
              res.status(200).json({status: "Logged in", jwt: token, role: user.role});
            } else {
              res.status(400).json({error: "Email or password is incorrect"});
            }
          });
        }).catch((err)=>{
          res.status(500).json({error: err.message});
        });
      }
    module.exports={ generateAccessToken,register,login}