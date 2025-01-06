import React, { useState } from 'react';
import './home.css';
import Auth from '../../utils/auth';
import EmptyGuildBoard from '/src/assets/images/empty-guild-board.jpg';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Sign in stuff
        console.log('Sign In clicked', { username, password });
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                Auth.login(data.token)
            })
    };

    const handleRegister = () => {
        // Register Stuff
        console.log('Register New User clicked', { username, password });

        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
    };

    return (
        <div className="home">
            <img src={EmptyGuildBoard} alt="A board with empty pages on it" className="home"></img>
            <h1>Adventurer's Board</h1>

            {
                Auth.loggedIn() ? (
                    // if already loggedin, do not show auth form
                    <div className="auth-form">

                        <button onClick={Auth.logout} className="sign-out-button">
                            Sign Out
                        </button>
                    </div>
                ) : (
                    // else show auth form
                    <div className="auth-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="button-group">
                            <button onClick={handleSignIn} className="sign-in-button">
                                Sign In
                            </button>
                            <button onClick={handleRegister} className="register-button">
                                Register New User
                            </button>
                        </div>
                    </div>
                )


            }
        </div>
    );
};

export default Home;
