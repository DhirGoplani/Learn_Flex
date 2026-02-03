import User from "../models/user.js";
import bcrypt from 'bcrypt'
const userSignUp= async (req,res)=>{
    try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });
    const hashedPassword = await bcrypt.hash(password,process.env.HASHING_SALT);
    const user = await User.create({ name, email, password:hashedPassword });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default userSignUp;