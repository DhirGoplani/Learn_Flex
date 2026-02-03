import bcyrpt from 'bcrypt'
import User from '../models/user.js';
const userLogin = async (req,res)=>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid email" });
        console.log(user)
        const isMatch = await bcyrpt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

        res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    }catch(err){
         res.status(500).json({ error: err.message });
    }

    // res.send("from login")
}


export default userLogin;