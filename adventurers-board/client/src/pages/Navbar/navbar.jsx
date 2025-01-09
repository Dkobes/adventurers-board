import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ characterId }) => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to ="/characterselect">Character Select</Link>
                    </li>
                    <li>
                        <Link to ={`/profile/${characterId}`}>Profile</Link>
                    </li>
                    <li>
                        <Link to ={`/inventory/${characterId}`}>Inventory</Link>
                    </li>
                    <li>
                        <Link to ={`/combat/${characterId}`}>Combat</Link>
                    </li>
                    <li>
                        <Link to ={`/spellbook/${characterId}`}>Spellbook</Link>
                    </li>
                    <li>
                        <Link to ={`/notes/${characterId}`}>Notes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;