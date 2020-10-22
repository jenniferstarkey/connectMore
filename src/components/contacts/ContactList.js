//display all contacts
//add new contacts

import React, {useContext, useEffect } from "react"
import {ContactContext} from "./ContactProvider"
import {ContactCard} from "./ContactCard"
import {useHistory} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import "./Contact.css"

const useStyles = makeStyles({
    table: {
      minWidth: 200,
    },
  });

export const ContactList = () =>{
    const { contacts, getContacts } = useContext(ContactContext)
    const classes = useStyles();

    useEffect(()=>{
        getContacts()
    },[])
    const history = useHistory()

    return(
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell component="th" scope="row">
                {contact.firstName} {contact.lastName}
              </TableCell>
              <TableCell align="right">{contact.email}</TableCell>
              <TableCell align="right">{contact.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

        // <>
        // <h2>My Connections</h2>
        // <button onClick={()=>{history.push("/contacts/create")}}>
        //     Add a new connection
        // </button>
        // <div className="contacts">
        //     {
        //         contacts.map(contact=>{
        //             return <ContactCard key={contact.id} contact={contact} />
        //         })
        //     }
        // </div>
        // </>
