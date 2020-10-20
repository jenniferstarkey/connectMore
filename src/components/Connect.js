import React from "react"
import {Route, Redirect} from "react-router-dom"
import {ApplicationViews} from "./ApplicationViews"
import {Navbar} from "./nav/Navbar"
import {Login} from "./auth/Login"
import {Register} from "./auth/Register"
import "./Connect.css"

export const Connect = () => (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("connectMore_user")) {
            return (
              <>
                < Navbar/>
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );