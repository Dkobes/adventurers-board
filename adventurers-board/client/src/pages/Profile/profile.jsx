import React, { useState, useEffect } from "react";

const Profile = () => {
    const [character, setCharacter] = useState({
        name: '',
        class: '',
        level: '',
        background: '',
        playerName: '',
        race: '',
        alignment: '',
        age: '',
        height: '',
        skin: '',
        hair: '',

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

    const [levelResource, setLevelResource] = useState(null);

    useEffect(() => {
        const fetchLevelResource = async () => {
            if (character.class && character.level) {
                try {
                    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${character.class}/levels/${character.level}`);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = await response.json();
                    setLevelResource(data);
                } catch (error) {
                    console.error("Error fetching level resource:", error);
                }
            }
        };

        fetchLevelResource();
    }, [character.class, character.level]);

    return ( 
        <div>
        <h1>{character.name}</h1>
        <p>Class: {character.class}</p>
        <p>Level: {character.level}</p>
        {/* Render level resource if available */}
        {levelResource && (
                <div>
                    <h2>Level Resource</h2>
                    <pre>{JSON.stringify(levelResource, null, 2)}</pre>
                </div>
            )}
        <p>Background: {character.background}</p>
        <p>Player Name: {character.playerName}</p>
        <p>Race: {character.race}</p>
        <p>Alignment: {character.alignment}</p>
        <p>Age: {character.age}</p>
        <p>Height: {character.height}</p>
        <p>Skin: {character.skin}</p>
        <p>Hair: {character.hair}</p>

        <h2>Stats</h2>
        <ul>
            <li>Strength: {character.stats.strength}</li>
            <li>Dexterity: {character.stats.dexterity}</li>
            <li>Constitution: {character.stats.constitution}</li>
            <li>Intelligence: {character.stats.intelligence}</li>
            <li>Wisdom: {character.stats.wisdom}</li>
            <li>Charisma: {character.stats.charisma}</li>
        </ul>

        <h2>Saving Throws</h2>
        <ul>
            <li>Strength: {character.savingThrows.strength}</li>
            <li>Dexterity: {character.savingThrows.dexterity}</li>
            <li>Constitution: {character.savingThrows.constitution}</li>
            <li>Intelligence: {character.savingThrows.intelligence}</li>
            <li>Wisdom: {character.savingThrows.wisdom}</li>
            <li>Charisma: {character.savingThrows.charisma}</li>
        </ul>

        <h2>Skills</h2>
        <ul>
            {Object.entries(character.skills).map(([skill, value]) => (
                <li key={skill}>{skill}: {value}</li>
            ))}
        </ul>
    </div>
     );
}
 
export default Profile;