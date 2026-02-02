import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new mongoose.Schema({
    username :{
        type : String,
        unique : true,
        required: true,
        lowercase : true
    },
    email :{
        type : String,
        unique : true,
        required: true,
        lowercase : true
    },
    password :{
        type : String,
        required: true,
        minlength : 8
    },
    role :{
        type: String,
        enum: ["Admin", "Student"],
    }
},
{
    timestamps: true
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;

