import React, { useState, useEffect } from "react";
import Profile from "../Profile/profile";


const CharacterSelect = () => {
    const [Name, setName] = useState('');
    const [Class, setClass] = useState('');
    const [Level, setLevel] = useState('');
    const [Background, setBackground] = useState('');
    const [PlayerName, setPlayerName] = useState('');
    const [Race, setRace] = useState('');
    const [Alignment, setAlignment] = useState('');
    const [Age, setAge] = useState('');
    const [Height, setHeight] = useState('');
    const [Skin, setSkin] = useState('');
    const [Hair, setHair] = useState('');

    const [strength, setStrength] = useState('');
    const [dexterity, setDexterity] = useState('');
    const [constitution, setConstitution] = useState('');
    const [intelligence, setIntelligence] = useState('');
    const [wisdom, setWisdom] = useState('');
    const [charisma, setCharisma] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    
    };

  

    return (
        <div>
            <h1>Character Select</h1>
            <h2>Choose your character</h2>
            <br></br>
            <h2>Create a new character</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" required value={Name} onChange={(e) => setName(e.target.value)} />
                <label>Class:</label> 
                <input type="text" required value={Class} onChange={(e) => setClass(e.target.value)} /> 
                <label>Label:</label> 
                <input type="text" required value={Level} onChange={(e) => setLevel(e.target.value)} />  
                <label>Background:</label>
                <input type="text" required value={Background} onChange={(e) => setBackground(e.target.value)} />   
                <label>Player Name:</label>
                <input type="text" required value={PlayerName} onChange={(e) => setPlayerName(e.target.value)} />
                <label>Race</label>
                <input type="text" required value={Race} onChange={(e) => setRace(e.target.value)} />
                <label>Alignment</label>
                <input type="text" required value={Alignment} onChange={(e) => setAlignment(e.target.value)} />
                <label>Age</label>
                <input type="text" required value={Age} onChange={(e) => setAge(e.target.value)} />
                <label>Height</label>
                <input type="text" required value={Height} onChange={(e) => setHeight(e.target.value)} />
                <label>Skin</label>
                <input type="text" required value={Skin} onChange={(e) => setSkin(e.target.value)} />
                <label>Hair</label>
                <input type="text" required value={Hair} onChange={(e) => setHair(e.target.value)} />
                <label>Strength</label>
                <input type="number" required value={strength} onChange={(e) => setStrength(e.target.value)} />
                <label>Dexterity</label>
                <input type="number" required value={dexterity} onChange={(e) => setDexterity(e.target.value)} />
                <label>Constitution</label>
                <input type="number" required value={constitution} onChange={(e) => setConstitution(e.target.value)} />
                <label>Intelligence</label>
                <input type="number" required value={intelligence} onChange={(e) => setIntelligence(e.target.value)} />
                <label>Wisdom</label>
                <input type="number" required value={wisdom} onChange={(e) => setWisdom(e.target.value)} />
                <label>Charisma</label>
                <input type="number" required value={charisma} onChange={(e) => setCharisma(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    ); 
}
 
export default CharacterSelect;
