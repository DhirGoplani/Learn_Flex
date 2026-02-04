const userProfile = (req,res)=>{
    console.log("hheadt")
    res.json(req.user)
}

export default userProfile