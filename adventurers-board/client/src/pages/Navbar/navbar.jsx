import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to ="/Profile"></Link>
                    </li>
                    <li>
                        <Link to ="/Inventory"></Link>
                    </li>
                    <li>
                        <Link to ="/Combat"></Link>
                    </li>
                    <li>
                        <Link to ="/Spellbook"></Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;