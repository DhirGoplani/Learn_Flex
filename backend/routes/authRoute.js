import { Router } from "express";
import userSignUp from "../controllers/userSignup.js";
import userLogin from "../controllers/userLogin.js";

const authRoute = Router();

authRoute.get("/",(req,res)=>{
    res.send("from auth router")
})

authRoute.get("/signup",userSignUp);
authRoute.get("/login",userLogin);

export default authRoute;