//GET CONTACT BY ID AND DISPLAY DETAILS
import React, {useContext, useEffect, useState} from "react"
import {ContactContext} from "./ContactProvider"
import {useParams, useHistory} from "react-router-dom"
import "./Contact.css"

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import {ContactForm} from "./ContactList"

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export const ContactDetail =()=>{
    const { getContactById, editContacts } = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const {contactId}=useParams();
    const [isLoading, setIsLoading] = useState(true);
    const history=useHistory();
    const classes = useStyles();
    
      useEffect(() => {
        if (contactId) {
            getContactById(contactId)
                .then(response => {
                    setContact(response)
                })         
      }}, [])

    return(
        ContactForm(),
        <section className="contact">
            <Button
                 variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteOutlineOutlinedIcon />}>
                Delete
            </Button>  
            <Button 
                 variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<SaveOutlinedIcon />} onClick={ ()=>{
                    editContacts(contact.id)
                    // .then(() =>{
                    //     history.push(`contacts/`)
                    // })
                }}>
                Save
            </Button> 
            <h3 className="contact_name" id="contactDetail" contentEditable="true">{contact.firstName}</h3>
            <div className="contact_company"contentEditable="true">Company:{contact.company}</div>
            <div className="contact_position" contentEditable="true">{contact.position}</div>
            <div className="contact_email" contentEditable="true">{contact.email}</div>
            <div className="contact_phoneNumber"contentEditable="true">{contact.phoneNumber}</div>
            <div className="contact_location" contentEditable="true">{contact.location}</div>
            <div className="contact_notes" contentEditable="true">{contact.notes}</div>
            <div className="contact_followUp" contentEditable="true">{contact.followUpFrequency}</div>
        </section>
    )
            }