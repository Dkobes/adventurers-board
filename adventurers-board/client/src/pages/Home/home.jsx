import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Auth from '../../utils/auth';
import EmptyGuildBoard from '/src/assets/images/empty-guild-board.jpg';

const Home = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (event) => {
        event.preventDefault()
        console.log('Sign In clicked', { username, password });
        
    
        // Validation check
        if (!username || !password) {
            alert("Please enter both username and password.");
            return; // Exit the function if validation fails
        }
    
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
    
                if (data.token) { // Ensure token exists before logging in
                    Auth.login(data.token);
                    navigate('/characterselect');
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            })
            .catch((error) => {
                console.error("Error during login:", error);
                alert("An error occurred during login.");
            });
    };
    
    const handleRegister = (event) => {
        event.preventDefault()

       
        console.log('Register New User clicked', { username, password });
    
        // Validation check
        if (!username || !password) {
            alert("Please enter both username and password.");
            return; // Exit the function if validation fails
        }
    
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
            // .then(() => {
            //     handleSignIn();
            
            // })
            //     if (data.token) { // Ensure token exists before logging in
            //         // Auth.login(data.token);
            //         handleLogin(data.userId);
            //         navigate('/characterselect');
            //     } else {
            //         alert("Registration failed. Please try again.");
            //     }
            })
            .catch((error) => {
                console.error("Error during registration:", error);
                alert("An error occurred during registration.");
            });
    };
    
    return (
        <div className="home">
            <img src={EmptyGuildBoard} alt="A board with empty pages on it" className="home-img"/>
            <div className="title">
            <h1>Adventurer's Board</h1>
            </div>
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
                    <form className="auth-form">
                        <div className="form-group" id="username">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="form-group" id="password">
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
                            <button onClick={handleSignIn} className="sign-in-button" id="sign-in-button">
                                Sign In
                            </button>
                            <button onClick={handleRegister} className="register-button" id="register-button">
                                Register New User
                            </button>
                        </div>
                    </form>
                )


            }
        </div>
    );
};

export default Home;