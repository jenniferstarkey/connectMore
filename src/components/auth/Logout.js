import React from "react"

export const logOut = () =>{
    localStorage.clear();
    window.location.href = '/';
}