//what will be rendered on the pages when the URL changes
import React from "react"
import {Route} from "react-router-dom"
import {Home} from "./Home"
import {ContactProvider} from "./contacts/ContactProvider"
import { ContactList} from "./contacts/ContactList"
import { ContactDetail } from "./contacts/ContactDetails"
import { ContactSearch } from "./contacts/SearchProvider"
import { EditForm } from "./contacts/ContactForm"

export const ApplicationViews = (props) =>{
    return (
        <>
    {/* home */}
    <ContactProvider>
        <Route exact path="/">
            <Home />
            <ContactList />
        </Route>
    </ContactProvider>

    {/* contacts */}
        <ContactProvider>
            <Route exact path="/contacts">
                <ContactSearch />
                <ContactList />
            </Route>
        </ContactProvider>

        <ContactProvider>
            <Route exact path="/contacts/details/:contactId(\d+)">
                <ContactDetail />
            </Route>
        </ContactProvider>

        <ContactProvider>
            <Route exact path="/contacts/edit/:contactId(\d+)">
                <EditForm />
            </Route>
        </ContactProvider>

        {/* <ContactProvider>
            <Route exact path="/events/create">
                <ContactForm />
            </Route>
        </ContactProvider> */}
        </>
    

    );
};
