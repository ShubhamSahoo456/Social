const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    fullName:{
      type:String,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    profilePicture: {
      type: String,
     // default: "",
    },
    coverPicture: {
      type: String,
      // default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followins: {
      type: Array,
      default: [],
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,10);
            next()
        }else{
            next()
        }
    }catch(err){
        console.log(err)
    }
})

userSchema.methods.passwordCheck = async function(password) {
    try{
        const veriPassword = await bcrypt.compare(password,this.password)
        if(veriPassword){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
    }
}

const User = mongoose.model('User',userSchema);

module.exports = User
