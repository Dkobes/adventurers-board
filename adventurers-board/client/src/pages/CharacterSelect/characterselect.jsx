import React, { useState, useEffect } from "react";
import Profile from "../Profile/profile";
import auth from "../../utils/auth";


const CharacterSelect = () => {
    const [name, setName] = useState('');
    const [characterClass, setClass] = useState('');
    const [level, setLevel] = useState('');
    const [background, setBackground] = useState('');
    const [race, setRace] = useState('');
    const [alignment, setAlignment] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [skin, setSkin] = useState('');
    const [hair, setHair] = useState('');

    const [strength, setStrength] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            characterClass,
            level,
            background,
            race,
            alignment,
            age,
            height,
            skin,
            hair,
            strength,
            dexterity,
            constitution,
            intelligence,
            wisdom,
            charisma,
        }
        console.log(formData);

        fetch("/api/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 Authorization: `Bearer ${auth.getToken()}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            }
        )
        
    };

  

    return (
        <div>
            <h1>Character Select</h1>
            <h2>Choose your character</h2>
            <br></br>
            <h2>Create a new character</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                <label>Class:</label> 
                <input type="text" required value={characterClass} onChange={(e) => setClass(e.target.value)} /> 
                <label>Label:</label> 
                <input type="text" required value={level} onChange={(e) => setLevel(e.target.value)} />  
                <label>Background:</label>
                <input type="text" required value={background} onChange={(e) => setPlayerName(e.target.value)} />
                <label>Race:</label>
                <input type="text" required value={race} onChange={(e) => setRace(e.target.value)} />
                <label>Alignment:</label>
                <input type="text" required value={alignment} onChange={(e) => setAlignment(e.target.value)} />
                <label>Age:</label>
                <input type="text" required value={age} onChange={(e) => setAge(e.target.value)} />
                <label>Height:</label>
                <input type="text" required value={height} onChange={(e) => setHeight(e.target.value)} />
                <label>Skin:</label>
                <input type="text" required value={skin} onChange={(e) => setSkin(e.target.value)} />
                <label>Hair:</label>
                <input type="text" required value={hair} onChange={(e) => setHair(e.target.value)} />
                <label>Strength:</label>
                <input type="number" required value={strength} onChange={(e) => setStrength(e.target.value)} />
                <label>Dexterity:</label>
                <input type="number" required value={dexterity} onChange={(e) => setDexterity(e.target.value)} />
                <label>Constitution:</label>
                <input type="number" required value={constitution} onChange={(e) => setConstitution(e.target.value)} />
                <label>Intelligence:</label>
                <input type="number" required value={intelligence} onChange={(e) => setIntelligence(e.target.value)} />
                <label>Wisdom:</label>
                <input type="number" required value={wisdom} onChange={(e) => setWisdom(e.target.value)} />
                <label>Charisma:</label>
                <input type="number" required value={charisma} onChange={(e) => setCharisma(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    ); 
}
 
export default CharacterSelect;
