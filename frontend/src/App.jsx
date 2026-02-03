import React from "react"
import { Routes, Route, Link, BrowserRouter } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import Profile from "./components/profile/Profile"
function App() {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/profile" Component={Profile}/>
    </Routes>
  )
}

export default App
