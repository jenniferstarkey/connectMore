//show contacts with follow ups due
//when contact is selected, return to contact profile
import React, {useState, useContext, useEffect} from "react"
import {useHistory, Link} from "react-router-dom"
import { ContactList } from "./ContactList"
import { ContactContext } from "./ContactProvider"
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 800,
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
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
          }}));



export const FollowUpList = () =>{
    const {contacts, getContacts, updateFollowUp} = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const history = useHistory()
    const [filteredContacts, setFiltered] = useState([])

    const classes = useStyles();
    let now = new Date()
    
    
    useEffect(() => {
        getContacts()
    }, [])


useEffect(()=>{
if (contacts){
const overDue = contacts.filter(contact =>{
    let frequency = parseInt(contact.followUpFrequency)
    let pastContact=  new Date(contact.lastContact)
    const daySinceContact = differenceInCalendarDays(now, pastContact)
return daySinceContact >= frequency
})
setFiltered(overDue)
}else {
    setFiltered(contacts)
}
},[contacts])



const theFollowUps =() =>{
    if (filteredContacts) {
        return (
        <>
        {filteredContacts?.map(contact => 
            <TableRow key={contact.id}>
                <TableCell component="th" scope="row">
               <Link to={`/contacts/details/${contact.id}`}>
               {contact.firstName} {contact.lastName}
                </Link>
                </TableCell>
                <TableCell align="right">
                <a href="mailto:{contact.email}" target="_blank">{contact.email}</a></TableCell>
                <TableCell align="right"><Button id="button"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => { 
                        updateFollowUp(contact.id)
                        .then(theFollowUps())
                        }}>
                        Done
                    </Button></TableCell>
                </TableRow>)}
    </>)

    }
}


return(
    <>
<TableContainer id="tableContainer" className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Paper>
                <Table id="contactTable" className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Location</TableCell>
                        </TableRow>
                    </TableHead>
                   
                    <TableBody>
                        {theFollowUps()}
                    </TableBody>
                </Table>
            </Paper>
            </Grid>
            </TableContainer> 
            </>
)
}