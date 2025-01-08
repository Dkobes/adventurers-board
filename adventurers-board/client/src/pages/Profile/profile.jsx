import React, { useState, useEffect } from "react";
import CharacterSelect from "../CharacterSelect/characterselect";
import auth from "../../utils/auth";
import { useParams } from "react-router-dom";
import "./profile.css"


const Profile = () => {
    const { id } = useParams(); //Get character ID from URL
    const [character, setCharacter] = useState(null); // State to hold character data
    const [error, setError] = useState(null); // State to hold any error messages
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        // Fetch character data when the component mounts
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
                setIsLoading(false); // Set loading to false
            })
            .catch(err => {
                setError(err.message); // Set error message
                setIsLoading(false); // Set loading to false
                console.error(err);
            });
    }, [id]); // Dependency array includes id to refetch if it changes

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message
    }

    return (
        <div className="profile">
            <h1>Character Profile</h1>
            {character ? (
                <div>
                    <h2>Name: {character.name}</h2>
                    <p>Class: {character.characterClass}</p>
                    <p>Level: {character.level}</p>
                    <p>Background: {character.background}</p>
                    <p>Race: {character.race}</p>
                    <p>Alignment: {character.alignment}</p>
                    <p>Age: {character.age}</p>
                    <p>Hair: {character.hair}</p>
                    <p>Strength: {character.strength}</p>
                    <p>Dexterity: {character.dexterity}</p>
                    <p>Constitution: {character.constitution}</p>
                    <p>Intelligence: {character.intelligence}</p>
                    <p>Wisdom: {character.wisdom}</p>
                    <p>Charisma: {character.charisma}</p>
                </div>
            ) : (
                <p>No character found.</p>
            )}
        </div>
    );
};

export default Profile;

    // const [character, setCharacter] = useState({
        
    //     characterbasics: {
    //     name: '',
    //     characterClass: '',
    //     level: '',
    //     background: '',
    //     playerName: '',
    //     race: '',
    //     alignment: '',
    //     age: '',
    //     hair: '',
    //     },

    //     stats: {
    //         strength: 10,
    //         dexterity: 10,
    //         constitution: 10,
    //         intelligence: 10,
    //         wisdom: 10,
    //         charisma: 10,
    //     },

    //     savingThrows: {
    //         strength: 0,
    //         dexterity: 0,
    //         constitution: 0,
    //         intelligence: 0,
    //         wisdom: 0,
    //         charisma: 0,
    //     },

    //     skills: {
    //         acrobatics: 0,
    //         animalHandling: 0,
    //         arcana: 0,
    //         athletics: 0,
    //         deception: 0,
    //         history: 0,
    //         insight: 0,
    //         intimidation: 0,
    //         investigation: 0,
    //         medicine: 0,
    //         nature: 0,
    //         perception: 0,
    //         performance: 0,
    //         persuasion: 0,
    //         religion: 0,
    //         sleightOfHand: 0,
    //         stealth: 0,
    //         survival: 0,
    //     }
        
    // });

    // const [profileImage, setProfileImage] = useState(null);



    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCharacter((prevState) => ({
    //         ...prevState,
    //         characterbasics: {
    //             ...prevState.characterbasics,
    //             [name]: value,
    //         },
    //     }));
    // };

    // const handleStatsChange = (e) => {
    //     const { name, value } = e.target;
    //     setCharacter((prevState) => ({
    //         ...prevState,
    //         stats: {
    //             ...prevState.stats,
    //             [name]: value,
    //         },
    //     }));
    // };

    // const handleSavingThrowsChange = (e) => {
    //     const { name, value } = e.target;
    //     setCharacter((prevState) => ({
    //         ...prevState,
    //         savingThrows: {
    //             ...prevState.savingThrows,
    //             [name]: value,
    //         },
    //     }));
    // };

    // const handleSkillsChange = (e) => {
    //     const { name, value } = e.target;
    //     setCharacter((prevState) => ({
    //         ...prevState,
    //         skills: {
    //             ...prevState.skills,
    //             [name]: value,
    //         },
    //     }));
    // };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfileImage(URL.createObjectURL(file));
    //     }
    // };

//     return ( 

//         <div>
//             <h2>Character Info</h2>
//         <ul>
//             {Object.entries(character.characterbasics).map(([key, value]) => (
//                 <li key={key}>{key}: <input type="string" name={key} value={value} onChange={handleChange} /></li>
//             ))}
//         </ul>

//         <h2>Profile Image</h2>
//             <input type="file" accept="image/*" onChange={handleImageChange} />
//             {profileImage && <img src={profileImage} alt="Profile" style={{ width: '100px', height: '100px' }} />}


//         <h2>Stats</h2>
//         <ul>
//             <li>Strength: <input type="number" name="strength" value={character.stats.strength} onChange={handleStatsChange} /> </li>
//             <li>Dexterity: <input type="number" name="dexterity" value={character.stats.dexterity} onChange={handleStatsChange} /> </li>
//             <li>Constitution: <input type="number" name="constitution" value={character.stats.constitution} onChange={handleStatsChange} /></li>
//             <li>Intelligence: <input type="number" name="intelligence" value={character.stats.intelligence} onChange={handleStatsChange} /></li>
//             <li>Wisdom: <input type="number" name="wisdom" value={character.stats.wisdom} onChange={handleStatsChange} /></li>
//             <li>Charisma: <input type="number" name="charisma" value={character.stats.intelligence} onChange={handleStatsChange} /> </li>
//         </ul>

//         <h2>Saving Throws</h2>
//         <ul>
//             <li>Strength: <input type="number" name="strength" value={character.savingThrows.strength} onChange={handleSavingThrowsChange} /></li>
//             <li>Dexterity: <input type="number" name="dexterity" value={character.savingThrows.dexterity} onChange={handleSavingThrowsChange} /></li>
//             <li>Constitution: <input type="number" name="constitution" value={character.savingThrows.constitution} onChange={handleSavingThrowsChange} /></li>
//             <li>Intelligence: <input type="number" name="intelligence" value={character.savingThrows.intelligence} onChange={handleSavingThrowsChange} /></li>
//             <li>Wisdom: <input type="number" name="wisdom" value={character.savingThrows.wisdom} onChange={handleSavingThrowsChange} /></li>
//             <li>Charisma: <input type="number" name="charisma" value={character.savingThrows.charima} onChange={handleSavingThrowsChange} /></li>
//         </ul>

//         <h2>Skills</h2>
//         <ul>
//             {Object.entries(character.skills).map(([skill, value]) => (
//                 <li key={skill}>{skill}: <input type="number" name={skill} value={value} onChange={handleSkillsChange} /></li>
//             ))}
//         </ul>
//     </div>
//      );
// }
 
// export default Profile;