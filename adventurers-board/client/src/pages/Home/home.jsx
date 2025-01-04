import React, { useState } from 'react';
import './home.css';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        // Sign in stuff
        console.log('Sign In clicked', { username, password });
    };

    const handleRegister = () => {
        // Register Stuff
        console.log('Register New User clicked');
    };

    return (
        <div className="home">
            <h1>Adventurer's Board</h1>

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
        </div>
    );
};

export default Home;
