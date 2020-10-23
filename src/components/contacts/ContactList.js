//DISPLAY ALL CONTACTS
//ADD NEW CONTACTS

import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { ContactContext } from "./ContactProvider"
import "./Contact.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 200,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    }
}));

//TRANSITION FOR THE FORM POP UP
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


//FORM INFORMATION FOR NEW AND EDIT
export const ContactForm = () => {
    const { addContact, getContactById, editContact } = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const { contactId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newContact = { ...contact }
        newContact[event.target.name] = event.target.value
        setContact(newContact)
    }

    useEffect(() => {
        if (contactId) {
            getContactById(contactId)
                .then(article => {
                    setContact(contact)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])

    //MAKE THE NEW CONTACT OR EDIT
    const constructContactObj = () => {
        setIsLoading(true);
        if (contactId) {
            editContact({
                id: contact.id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phoneNumber,
                email: contact.email,
                company: contact.company,
                position: contact.position,
                location: contact.location,
                notes: contact.notes,
                userId: contact.userId
            }).then(() => history.push(`/contacts/detail/${contact.id}`))
        } else {
            addContact({
                firstName: contact.firstName,
                lastName: contact.lastName,
                phone: contact.phoneNumber,
                email: contact.email,
                company: contact.company,
                position: contact.position,
                location: contact.location,
                notes: contact.notes,
                userId: parseInt(localStorage.getItem("connectMore_user"))
            }).then(() => history.push("/contacts"))
        }
    }

//MATERIAL UI INFO
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    

//INPUT FORM
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {contactId ? <>Update your contact</> : <>Add new contact</>}
             </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            New Connection
                        </Typography>
                        <Button autoFocus color="inherit"
                            onClick={event => {
                                event.preventDefault() 
                                constructContactObj()
                                handleClose()
                            }}>
                            {contactId ? <>Update</> : <>Add</>}
                        </Button>
                    </Toolbar>
                </AppBar>

                <fieldset>
                    <div className="form-group">
                        <input htmlFor="firstName"
                            defaultValue={contact.firstName}
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First Name"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="lastName"
                            defaultValue={contact.lastName}
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="phoneNumber"
                            defaultValue={contact.phoneNumber}
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            placeholder="Phone Number"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="email"
                            defaultValue={contact.email}
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Email Address"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="company"
                            defaultValue={contact.company}
                            type="text"
                            name="company"
                            className="form-control"
                            placeholder="Company"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="position"
                            defaultValue={contact.position}
                            type="text"
                            name="position"
                            className="form-control"
                            placeholder="Position"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="location"
                            defaultValue={contact.location}
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Location"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input htmlFor="notes"
                            defaultValue={contact.notes}
                            type="text"
                            name="notes"
                            className="form-control"
                            placeholder="Notes"
                            required
                            autoFocus
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </fieldset>
            </Dialog>
        </div>
    );
}


//LIST OF CONTACTS
export const ContactList = () => {
    const { contacts, getContacts } = useContext(ContactContext)
    const classes = useStyles();
    const [records, setRecords] = useState()
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    useEffect(() => {
        getContacts()
    }, [])
    const history = useHistory()

    const headCells = [
        { id: 'fullName', label: 'Employee Name' },
        { id: 'email', label: 'Email Address (Personal)' },
        { id: 'mobile', label: 'Mobile Number' },
        { id: 'department', label: 'Department', disableSorting: true },
    ]


    return (
        <>
            <div className="contacts-table">
                {ContactForm()}
            </div>


            {/* <TableContainer component={Paper}>
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
                               <Link to={`/contacts/details/${contact.id}`}>
                               {contact.firstName} {contact.lastName}
                                </Link>
                                </TableCell>
                                <TableCell align="right">{contact.email}</TableCell>
                                <TableCell align="right">{contact.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </>
    );
}
