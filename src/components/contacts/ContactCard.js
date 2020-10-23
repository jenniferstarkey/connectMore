//INFO FOR ONE SELECTED CONTACT

import React from "react"
import {Link} from "react-router-dom"
import "./Contact.css"
import Grid from '@material-ui/core/Grid';


export const ContactCard = ({contact}) => (
    <section className="contact">
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <h3 className="contact_name">
            <Link to={`/contacts/detail/${contact.id}`}>
                {contact.name}
            </Link>
        </h3>
        </Grid>
        <Grid item xs={6} sm={3}>
        <div className="contact_email">{contact.email}</div>
        </Grid>
        <Grid item xs={6} sm={3}>
        <div className="contact_location">{contact.location}</div>
        </Grid>
        </Grid>

    </section>
)