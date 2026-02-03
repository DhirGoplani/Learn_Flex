import React,{useEffect} from 'react'
import { useState } from 'react'

function Profile() {
    const {userDetail,setUserDetail}=useState("Loading")
    useEffect(async ()=>{
        console.log("isnerted")
        const data=fetch("/user/profile",{
             credentials: "include"
        })
        console.log(data)
        setUserDetail(data)
    },[])
  return (
    <div>
      {userDetail}
    </div>
  )
}

export default Profile
