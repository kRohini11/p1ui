"use client"
import React from "react";
import { connect } from "react-redux";
import Home from "@/components/Home";
import Login from "@/components/Login";

let App = ({ isLoggedIn }) => {

  return (
    <div>
      {isLoggedIn ? <Home /> : <Login />}
    </div>
  )

}
App = connect(
  (state) => {
    return {
      isLoggedIn: state.appReducer.isLoggedIn
    }
  }
)(App)

export default App
