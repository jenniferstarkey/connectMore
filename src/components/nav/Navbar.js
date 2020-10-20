//nav bar exported here

import React from "react";
import {Link} from "react-router-dom";
import "./Navbar.css"


export const Navbar = props => {
    return (
        <ul className="navbar">
            <li className="navbar_item active">
                <Link className="navbar_link" to="/">
                    My Dashboard
                </Link>
            </li>
            <li className="navbar_item active">
                <Link className="navbar_link" to="/contacts">
                    My Connections
                </Link>
            </li>
        </ul>
    )
}