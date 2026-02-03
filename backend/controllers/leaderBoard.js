import express from "express"
import User from "../models/user"

export const getUser=async(req,res)=>{
    try{
        const leaders=await User.find({})
        .sort({score:-1})
        .select("name score country")
        if(!leaders){
            console.log(error);
        }
        return res.json({success:true,leaders});
    }
    catch(error){
        console.error(error.message);
    return res.json({message:error.message, success:false})

    }
}