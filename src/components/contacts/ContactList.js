//display all contacts
//add new contacts

import React, {useContext, useEffect } from "react"
import {ContactContext} from "./ContactProvider"
import {ContactCard} from "./ContactCard"
import {useHistory} from "react-router-dom"
import "./Contact.css"

export const ContactList = () =>{
    const { contacts, getContacts } = useContext(ContactContext)

    useEffect(()=>{
        getContacts()
    },[])
    const history = useHistory()

    return(
        <>
        <h2>My Connections</h2>
        <button onClick={()=>{history.push("/contacts/create")}}>
            Add a new connection
        </button>
        <div className="contacts">
            {
                contacts.map(contact=>{
                    return <ContactCard key={contact.id} contact={contact} />
                })
            }
        </div>
        </>
    )
}