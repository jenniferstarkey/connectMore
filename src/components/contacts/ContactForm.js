import React, { useContext, useEffect, useState } from "react"
import {ContactContext} from "./ContactProvider"
import {useHistory, useParams} from "react-router-dom"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


export const EditForm =() =>{
    const { getContactById, editContact } = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const { contactId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [value, setValue] = React.useState('daily');


    const handleControlledInputChange = (event) => {
        const updateContact={...contact}
        updateContact[event.target.name]= event.target.value
        setContact(updateContact)
        const updateFollowUp={...value}
        updateFollowUp[event.target.name]=event.target.value
        setValue(updateFollowUp)
    }
    
useEffect(() => {
    if (contactId) {
        getContactById(contactId)
            .then(thecontacts => {
                setContact(thecontacts)
                setIsLoading(false)
            })

    } else {
        setIsLoading(false)
    }
}, [])

const constructEdit =() =>{
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
                userId: contact.userId,
                followUpFrequency: contact.followUpFrequency,
            }).then(() => history.push(`/contacts/details/${contact.id}`))
}
return (    
    <form>
        <button onClick={()=>{history.push(`/contacts`)}}>
            Go Back
        </button>
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
                <FormControl component="fieldset">
                        <FormLabel component="legend">How often would you like to follow up?</FormLabel>
                            <RadioGroup aria-label="followUp" name="followUpFrequency" defaultValue={contact.followUpFrequency} onChange={handleControlledInputChange}>
                                <FormControlLabel value="daily" control={<Radio />} label="daily" />
                                <FormControlLabel value="weekly" control={<Radio />} label="weekly" />
                                <FormControlLabel value="biWeekly" control={<Radio />} label="biWeekly" />
                                <FormControlLabel value="monthly" control={<Radio />} label="monthly" />
                                <FormControlLabel value="biMonthly" control={<Radio />} label="biMonthly" />
                                <FormControlLabel value="quarterly" control={<Radio />} label="quarterly" />
                                <FormControlLabel value="yearly" control={<Radio />} label="yearly" />


                            </RadioGroup>
                    </FormControl>
            </fieldset>
            <button onClick={event =>{
                event.preventDefault()
                constructEdit()
            }}>
                Save
            </button>
            </form>  
);
}