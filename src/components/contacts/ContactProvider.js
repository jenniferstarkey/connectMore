//get contacts from API
//add new contacts
//edit contacts
//delete contacts

import React, {useState, createContext} from "react"
import "./Contact.css"

export const ContactContext = createContext()

export const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([])
    
//get all the contacts
    const getContacts = () => {
        return fetch("http://localhost:8088/contacts")
        .then(res=>res.json())
        .then(setContacts)
    }
//get specific contacts
    const getContactById = (id)=>{
        return fetch(`http://localhost:8088/contacts/${id}`)
        .then(res=>res.json())
    }

    return(
        <ContactContext.Provider value={{
            contacts, getContacts, getContactById
        }}>
            {props.children}
        </ContactContext.Provider>
    )
 }