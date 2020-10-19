import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import {Connect} from "./components/Connect"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Connect />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)