//GET CONTACT BY ID AND DISPLAY DETAILS
import React, {useContext, useEffect, useState} from "react"
import {ContactContext} from "./ContactProvider"
import {useParams, useHistory} from "react-router-dom"
import "./Contact.css"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { ContactSearch } from "./SearchProvider"

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export const ContactDetail =()=>{
    const { getContactById, editContact, removeContact } = useContext(ContactContext)
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
      
        <section className="contact">
          <Button id="button"
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => { history.push("/contacts")}}>
            Back
          </Button>
            <Button id="button"
                 variant="contained"
                 color="secondary"
                 className={classes.button}
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={ () => {
                  removeContact(contact.id)
                  .then(() => {
                    history.push("/contacts")
                  })}}>
                Delete
            </Button>  
            <Button id="button"
                 variant="contained"
                 color="secondary"
                 className={classes.button}
                 startIcon={<SaveOutlinedIcon />}  onClick={()=> {
                     history.push(`/contacts/edit/${contact.id}`)
                 }}>
                Edit
            </Button> 
            <h3 className="contact_name" id="contactDetail" >{contact.firstName} {contact.lastName}</h3>
            <div className="contact_company" >{contact.company}</div>
            <div className="contact_position">{contact.position}</div>
            <a href="mailto:{contact.email}" target="_blank">{contact.email}</a>
            <div className="contact_phoneNumber">{contact.phoneNumber}</div>
            <div className="contact_location">{contact.location}</div>
            <div className="contact_notes" >{contact.notes}</div>
            <div className="contact_followUp" >{contact.followUpFrequency}</div>
        </section>
    )
            }