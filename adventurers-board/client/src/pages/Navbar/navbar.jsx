import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to ="/characterselect">Character Select</Link>
                    </li>
                    <li>
                        <Link to ="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to ="/inventory">Inventory</Link>
                    </li>
                    <li>
                        <Link to ="/combat">Combat</Link>
                    </li>
                    <li>
                        <Link to ="/spellbook">Spellbook</Link>
                    </li>
                    <li>
                        <Link to ="/notes">Notes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;