import React, { useState, useEffect } from "react";
import Profile from "../Profile/profile";


const CharacterSelect = ({ character }) => {
    const [formData, setFormData] = useState({
        name: '',
        ...character.characterbasics
    });

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    return (
        <div>
            <h1>Character Select</h1>
            <h2>Choose your character</h2>
            <br></br>
            <h2>Create a new character</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <ul>
                    {Object.entries(character.characterbasics).map(([key, value]) => (
                        <li key={key}>
                            {key}: 
                            <input
                                type="text"
                                name={key}
                                value={formData[key] || value} // Use formData or default value
                                onChange={handleChange}
                            />
                        </li>
                    ))}
                </ul>
                <button type="submit">Submit</button>
            </form>
        </div>
    ); 
}
 
export default CharacterSelect;
