import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import Auth from '../../utils/auth';

const Navbar = ({ characterId }) => {
    const [errorMessage, setErrorMessage] = useState(null); 
    const navigate = useNavigate();

    function checkCharacterId() {
        if (characterId === 0, null || characterId === null) {
            setErrorMessage("You must select a character first!")
            setTimeout(() => {
                setErrorMessage(null);
                navigate("/characterselect");
            }, 2000);
        } else {
            setErrorMessage(null);
        }
    }

    const logout = () => {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    };

    if (errorMessage) {
        return (
            <div className="error-message">
                {errorMessage}
            </div>
        );
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
                    <li>
                        <button onClick={logout} className="sign-out-button">
                            Sign Out
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;