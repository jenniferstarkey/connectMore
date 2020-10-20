//get contact by id 
import React, {useContext, useEffect, useState} from "react"
import {ContactContext} from "./ContactProvider"
import {useParams, useHistory} from "react-router-dom"
import "./Contact.css"

export const ContactDetail =()=>{
    const {getContactById} = useContext(ContactContext)

    const [contact, setContact] =useState({})
    const {contactId}=useParams();
    const history=useHistory();

    useEffect(()=>{
        console.log("useEffect", contactId)
        getContactById(contactId)
        .then((response) =>{
            setContact(response)
        })
    },[])
    return(
        <section className="contact">
            <h3 className="contact_name">{contact.name}</h3>
            <div className="contact_company">Company:{contact.company}</div>
            <div className="contact_position">{contact.position}</div>
            <div className="contact_email">{contact.email}</div>
            <div className="contact_phoneNumber">{contact.phoneNumber}</div>
            <div className="contact_location">{contact.location}</div>
            <div className="contact_notes">{contact.notes}</div>
            <div className="contact_followUp">{contact.followUpFrequency}</div>
            
        </section>
    )
}