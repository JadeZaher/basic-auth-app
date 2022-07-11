const mongoose = require('mongoose')

//Define user
const User = new mongoose.Schema(
  {
    name:{type: String, required: true},
    email:{type: String, required: true, unique: true },
    password:{type: String, required: true}
  },
  { collection: 'user-data'}
)

//add user definition to mongoose model  
const model = mongoose.model('userData', User)

module.exports = model