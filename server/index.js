//env
require('dotenv').config()
PORT = process.env.PORT

//express
const express = require('express')
const app = express()
const { json, request } = require("express")
app.use(express.json())

//mongoose
const mongoose = require('mongoose')
mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI)
mongoose.connection.on('open', function(err, doc){
  console.log("connection established with mongoDB");
})

//cors
const cors = require("cors")
app.use(cors())

//JSON Web Token
const jwt = require('jsonwebtoken')
SECRET = process.env.SECRET

//encryption
const bcrypt = require('bcryptjs')

//models##########################################################
const User = require('./models/user.model')


//routes#############################################################
//register user unless the email already exists
app.post('/api/register', async (req, res)=>{
  console.log(req.body)
  try{
    //use the create method with the user model to add a object to the database with the name, email, and password 
    //encrypt pass
    const newPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    })
    //respond back with the user created
    res.json({ 'status':"User "+user.name+" added.", name: user.name})
  } catch(err){
    res.json({'error':err, message : "A user with this email user already exists"})
  }
})

//log in user
app.post('/api/login', async (req, res)=>{
  console.log(req.body)
  //use findOne with the User as the Model
  //pass in email and body from request
  try{
    const user = await User.findOne({
      email: req.body.email
    })
    //make sure it's a valid user
    if(!user){
      res.send({name: '', isUser:false})
    }
    //make sure the password is correct
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    //If a user is found && password is correct
    if(isPasswordValid ){
      const token = jwt.sign({
        name:user.name,
        email:user.email
      }, SECRET)
      //Return name, a bool of user true, and auth token
      res.send({name: user.name, isUser:true, token:token})
    }else{
      //If not return empty name and Login not found
      res.json()
    }
  } catch(err){
    console.log(err)
  }
})

//verify authentication
app.get('/api/checkauth', async (req, res)=>{
  const token = req.headers['x-access-token']
  console.log(token)
  try {
		const decoded = jwt.verify(token, SECRET)
		const email = decoded.email
		const user = await User.findOne({ email: email })

		return res.json({ status: 'ok', user: user.name })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(PORT, ()=>{
   console.log('sever start on ' + PORT)
})