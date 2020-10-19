//what will be rendered on the pages when the URL changes
import React from "react"
import {Route} from "react-router-dom"
import {Home} from "./Home"

export const ApplicationViews = (props) =>{
    return (
        <>
        <Route path="/">
            <Home />
        </Route>
        </>
    

    );
};
