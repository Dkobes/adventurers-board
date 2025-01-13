import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CharacterSelect from "../CharacterSelect/characterselect";
import auth from "../../utils/auth";
import { useParams } from "react-router-dom";
import "./profile.css"
import Vines from '/src/assets/images/vine-paper.jpg';


const Profile = () => {
    const { id } = useParams(); //Get character ID from URL
    const [character, setCharacter] = useState(null); // State to hold character data
    const [error, setError] = useState(null); // State to hold any error messages
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
    const [editableCharacter, setEditableCharacter] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/characters/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.getToken()}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch character data');
                }
                return res.json();
            })
            .then(data => {
                setCharacter(data); // Set the character data from the response
                setEditableCharacter(data); // Initialize editable character state with fetched data
                setIsLoading(false); // Set loading to false
            })
            .catch(err => {
                setError(err.message); // Set error message
                setIsLoading(false); // Set loading to false
                console.error(err);
                // navigate("/characterselect"); 
            });
    }, [id]); // Dependency array includes id to refetch if it changes

    const handleSave = () => {
        fetch(`/api/characters/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(editableCharacter) // Send updated character data
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to update character data');
                }
                return res.json();
            })
            .then(data => {
                setCharacter(data); // Update character with the saved data
                setEditableCharacter(data); // Update editable character state
                setIsEditing(false); // Exit edit mode
                alert("Character updated successfully!"); // Notify user
            })
            .catch(err => {
                setError(err.message); // Set error message
                console.error(err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableCharacter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        // Reset editableCharacter to original character data
        setEditableCharacter(character);
        setIsEditing(false);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    return (
        <div className="profile">
            <img src={Vines} alt="Paper covered in vines" className="profile-img"></img>
            {character ? (
                isEditing ? (
                    <div className="edit-profile">
                        <p>Name: <input type="text" name="name" value={editableCharacter.name} onChange={handleChange} /></p>
                        <p>Class: <input type="text" name="characterClass"  value={editableCharacter.characterClass} onChange={handleChange}></input></p>
                        <p>Level: <input type="number" name="level" value={editableCharacter.level} onChange={handleChange} /></p>
                        <p>Background: <input type="text" name="background" value={editableCharacter.background} onChange={handleChange} /></p>
                        <p>Race: <input type="text" name="race" value={editableCharacter.race} onChange={handleChange} /></p>
                        <p>Alignment: <input type="text" name="alignment" value={editableCharacter.alignment} onChange={handleChange} /></p>
                        <p>Age: <input type="number" name="age" value={editableCharacter.age} onChange={handleChange} /></p>
                        <p>Hair: <input type="text" name="hair" value={editableCharacter.hair} onChange={handleChange} /></p>
                        <p>Strength: <input type="number" name="strength" value={editableCharacter.strength} onChange={handleChange} /></p>
                        <p>Dexterity: <input type="number" name="dexterity" value={editableCharacter.dexterity} onChange={handleChange} /></p>
                        <p>Constitution: <input type="number" name="constitution" value={editableCharacter.constitution} onChange={handleChange} /></p>
                        <p>Intelligence: <input type="number" name="intelligence" value={editableCharacter.intelligence} onChange={handleChange} /></p>
                        <p>Wisdom: <input type="number" name="wisdom" value={editableCharacter.wisdom} onChange={handleChange} /></p>
                        <p>Charisma: <input type="number" name="charisma" value={editableCharacter.charisma} onChange={handleChange} /></p>
                        <button onClick={handleSave} className="save">Save</button>
                        <button onClick={handleCancel} className="cancel">Cancel</button>
                    </div>) : (
                <div>
                    <p className="character-name"> {character.name}</p>
                    <div className="traits">
                    <p >Class: {character.characterClass}</p>
                    <p >Level: {character.level}</p>
                    <p >Background: {character.background}</p>
                    <p >Race: {character.race}</p>
                    <p >Alignment: {character.alignment}</p>
                    <p >Age: {character.age}</p>
                    <p >Hair: {character.hair}</p>
                    </div>
                    <div className="stats">
                    <p className="attribute-box">Strength: {character.strength}</p>
                    <p className="attribute-box">Dexterity: {character.dexterity}</p>
                    <p className="attribute-box">Constitution: {character.constitution}</p>
                    <p className="attribute-box">Intelligence: {character.intelligence}</p>
                    <p className="attribute-box">Wisdom: {character.wisdom}</p>
                    <p className="attribute-box">Charisma: {character.charisma}</p>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="edit">Edit</button>   
                </div>
            ) ) : (
                <div>No character data found</div>
            )}
        </div>
    );
};

export default Profile;