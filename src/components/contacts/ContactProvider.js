//GET CONTACTS FROM DATABASE
//ADD NEW CONTACTS
//EDIT CONTACTS
//DELETE CONTACTS

import React, {useState, createContext} from "react"
import "./Contact.css"


export const ContactContext = createContext()

export const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([])
    const currentUser = parseInt(localStorage.getItem("connectMore_user"))
    const [searchTerms, setSearchTerms] = useState("")
    
//GET ALL CONTACTS
    const getContacts = () => {
        return fetch(`http://localhost:8088/contacts?userId=${currentUser}`)
        .then(res=>res.json())
        .then(setContacts)
    }
//GET SPECIFIC CONTACTS
    const getContactById = (id)=>{
        return fetch(`http://localhost:8088/contacts/${id}`)
        .then(res=>res.json())
    }
//ADD NEW CONTACTS
    const addContact = contactObj =>{
        return fetch("http://localhost:8088/contacts", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(contactObj)
        })
        .then(getContacts)
    }
//EDIT EXISTING CONTACTS
const editContact = contact => {
    return fetch(`http://localhost:8088/contacts/${contact.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
    .then(getContacts)
}

//DELETE CONTACTS
    const removeContact = contactId => {
        return fetch(`http://localhost:8088/contacts/${contactId}`,{
        method: "DELETE"
        })
        .then(getContacts)
    }

    return(
        <ContactContext.Provider value={{
            contacts, getContacts, getContactById, addContact, editContact, removeContact, setSearchTerms, searchTerms,
        }}>
            {props.children}
        </ContactContext.Provider>
    )
 } 