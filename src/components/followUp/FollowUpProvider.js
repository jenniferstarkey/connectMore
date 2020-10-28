//get contacts and embed all follow ups

import React, {useState, createContext} from "react"

export const fContext = createContext()

export const FollowUpProvider = (props) =>{
    const [ followUpFrequency, setFollowUps] = useState([])
    

//GET CONTACTS WITH FOLLOW UPS SET
    const getFollowUps = () =>{
        return fetch("http://localhost:8088/contacts")
        .then(res => res.json())
    }
//EDIT CONTACT WITH NEW FOLLOW UP TIME
    const getFollowUpById = (id)=>{
        return fetch(`http://localhost:8088/contacts/${id}`)
        .then(res=>res.json())
    }

    return(
        <fContext.Provider value={{
            followUpFrequency, getFollowUps, getFollowUpById
        }}>
            {props.children}
        </fContext.Provider>
    )
}