import React from "react"
import logo from '../images/logo.png';

export default function Header() {
    return (
        <header className="header">
            <img 
                src={logo} 
                className="header--image"
            />
            <h2 className="header--title">Items</h2>
            <h4 className="header--project">Add Items</h4>
        </header>
    )
}