const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
name: {
    type:String,
    required:true,
    minlength:3
},
department: {
    type:String,
    required:true
}
}, {timestamp:true})

module.exports = mongoose.model('User',UserSchema)