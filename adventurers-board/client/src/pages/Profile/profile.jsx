import React, { useState, useEffect } from "react";
import CharacterSelect from "../CharacterSelect/characterselect";


const Profile = () => {
    const [character, setCharacter] = useState({
        
        characterbasics: {
        Name: '',
        Class: '',
        Level: '',
        Background: '',
        PlayerName: '',
        Race: '',
        Alignment: '',
        Age: '',
        Height: '',
        Skin: '',
        Hair: '',
        },

        stats: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charima: 10,
        },

        savingThrows: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charima: 0,
        },

        skills: {
            acrobatics: 0,
            animalHandling: 0,
            arcana: 0,
            athletics: 0,
            deception: 0,
            history: 0,
            insight: 0,
            intimidation: 0,
            investigation: 0,
            medicine: 0,
            nature: 0,
            perception: 0,
            performance: 0,
            persuasion: 0,
            religion: 0,
            sleightOfHand: 0,
            stealth: 0,
            survival: 0,
        }
        
    });

    const [profileImage, setProfileImage] = useState(null);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prevState) => ({
            ...prevState,
            characterbasics: {
                ...prevState.characterbasics,
                [name]: value,
            },
        }));
    };

    const handleStatsChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prevState) => ({
            ...prevState,
            stats: {
                ...prevState.stats,
                [name]: value,
            },
        }));
    };

    const handleSavingThrowsChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prevState) => ({
            ...prevState,
            savingThrows: {
                ...prevState.savingThrows,
                [name]: value,
            },
        }));
    };

    const handleSkillsChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prevState) => ({
            ...prevState,
            skills: {
                ...prevState.skills,
                [name]: value,
            },
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    return ( 

        <div>
            <h2>Character Info</h2>
        <ul>
            {Object.entries(character.characterbasics).map(([key, value]) => (
                <li key={key}>{key}: <input type="string" name={key} value={value} onChange={handleChange} /></li>
            ))}
        </ul>

        <h2>Profile Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {profileImage && <img src={profileImage} alt="Profile" style={{ width: '100px', height: '100px' }} />}


        <h2>Stats</h2>
        <ul>
            <li>Strength: <input type="number" name="strength" value={character.stats.strength} onChange={handleStatsChange} /> </li>
            <li>Dexterity: <input type="number" name="dexterity" value={character.stats.dexterity} onChange={handleStatsChange} /> </li>
            <li>Constitution: <input type="number" name="constitution" value={character.stats.constitution} onChange={handleStatsChange} /></li>
            <li>Intelligence: <input type="number" name="intelligence" value={character.stats.intelligence} onChange={handleStatsChange} /></li>
            <li>Wisdom: <input type="number" name="wisdom" value={character.stats.wisdom} onChange={handleStatsChange} /></li>
            <li>Charisma: <input type="number" name="charisma" value={character.stats.intelligence} onChange={handleStatsChange} /> </li>
        </ul>

        <h2>Saving Throws</h2>
        <ul>
            <li>Strength: <input type="number" name="strength" value={character.savingThrows.strength} onChange={handleSavingThrowsChange} /></li>
            <li>Dexterity: <input type="number" name="dexterity" value={character.savingThrows.dexterity} onChange={handleSavingThrowsChange} /></li>
            <li>Constitution: <input type="number" name="constitution" value={character.savingThrows.constitution} onChange={handleSavingThrowsChange} /></li>
            <li>Intelligence: <input type="number" name="intelligence" value={character.savingThrows.intelligence} onChange={handleSavingThrowsChange} /></li>
            <li>Wisdom: <input type="number" name="wisdom" value={character.savingThrows.wisdom} onChange={handleSavingThrowsChange} /></li>
            <li>Charisma: <input type="number" name="charisma" value={character.savingThrows.charima} onChange={handleSavingThrowsChange} /></li>
        </ul>

        <h2>Skills</h2>
        <ul>
            {Object.entries(character.skills).map(([skill, value]) => (
                <li key={skill}>{skill}: <input type="number" name={skill} value={value} onChange={handleSkillsChange} /></li>
            ))}
        </ul>
    </div>
     );
}
 
export default Profile;