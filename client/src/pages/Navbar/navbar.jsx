import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ characterId, setError }) => {

    const navigate = useNavigate();

    function checkCharacterId() {
        if (characterId == 0) {
            setError("You must select a character first!")
            setTimeout(() => {
                setError(null);
                navigate("/characterselect");
            }, 3000);
        } else {
            setError(null);
        }
    }


    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/characterselect">Character Select</Link>
                    </li>
                    <li
                        onClick={checkCharacterId}
                    >
                        <Link to={`/profile/${characterId}`}>Profile</Link>
                    </li>
                    <li
                        onClick={checkCharacterId}
                    >
                        <Link to={`/inventory/${characterId}`}>Inventory</Link>
                    </li>
                    <li
                        onClick={checkCharacterId}
                    >
                        <Link to={`/combat/${characterId}`}>Combat</Link>
                    </li>
                    <li
                        onClick={checkCharacterId}
                    >
                        <Link to={`/spellbook/${characterId}`}>Spellbook</Link>
                    </li>
                    <li
                        onClick={checkCharacterId}
                    >
                        <Link to={`/notes/${characterId}`}>Notes</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;