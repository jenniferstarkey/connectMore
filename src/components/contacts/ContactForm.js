import React, { useContext, useEffect, useState } from "react"
import {ContactContext} from "./ContactProvider"
import {useHistory, useParams} from "react-router-dom"

export const EditForm =() =>{
    const { getContactById, editContact } = useContext(ContactContext)
    const [contact, setContact] = useState({})
    const { contactId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const updateContact={...contact}
        updateContact[event.target.name]= event.target.value
        setContact(updateContact)
    }

useEffect(() => {
    if (contactId) {
        console.log(contactId)
        getContactById(contactId)
            .then(thecontacts => {
                setContact(thecontacts)
                setIsLoading(false)
            })
.then(console.log("contact", contact))

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
                userId: contact.userId
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