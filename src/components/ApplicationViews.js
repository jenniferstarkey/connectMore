//what will be rendered on the pages when the URL changes
import React from "react"
import {Route} from "react-router-dom"
import {Home} from "./Home"
import {ContactProvider} from "./contacts/ContactProvider"
import {ContactList} from "./contacts/ContactList"
import { ContactDetail } from "./contacts/ContactDetails"
// import { ContactForm } from "./contacts/ContactForm"

export const ApplicationViews = (props) =>{
    return (
        <>
    {/* home */}
        <Route exact path="/">
            <Home />
        </Route>
    {/* contacts */}
        <ContactProvider>
            <Route exact path="/contacts">
                <ContactList />
            </Route>
        </ContactProvider>

        <ContactProvider>
            <Route exact path="/contacts/detail/:contactId(\d+)">
                <ContactDetail />
            </Route>
        </ContactProvider>

        {/* <ContactProvider>
            <Route exact path="/contacts/edit/:contactId(\d+)">
                <ContactForm />
            </Route>
        </ContactProvider> */}

        {/* <ContactProvider>
            <Route exact path="/events/create">
                <ContactForm />
            </Route>
        </ContactProvider> */}
        </>
    

    );
};
