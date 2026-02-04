import React, { useEffect } from 'react'
import { useState } from 'react'
import App from './Page'
function Profile() {
  const [ userDetail, setUserDetail ] = useState("Loading")
  useEffect(() => {
    const dataFetch = async () => {
      try {
        console.log("isnerted")
        const data = await fetch("http://localhost:3000/user/profile", {
          credentials: "include"
        })
        const res=await data.json();
        console.log(res)
        setUserDetail(res)
      } catch (err) {
        console.log(err)
      }

    }
    dataFetch();
  }, [])
  return (
    <div>
      <App user={userDetail} />
    </div>
  )
}

export default Profile
