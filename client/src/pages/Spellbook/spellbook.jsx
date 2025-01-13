import React, { useEffect, useState } from 'react';
import auth from '../../utils/auth.js';
import './spellbook.css'
import Fantasyspells from '/src/assets/images/spellbook.jpg';

const Spellbook = ({ characterId }) => {
    const [spellcastingAbility, setSpellcastingAbility] = useState('Charisma');
    const [spellcastingModifier, setSpellcastingModifier] = useState(3);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [spellLevels, setSpellLevels] = useState(Array(9).fill(0));
    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);
    const [selectedSpellDetails, setSelectedSpellDetails] = useState(null);
    const [savedSpells, setSavedSpells] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/spells/characters/${characterId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
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
            setSavedSpells(data); // Set the spells from the response
            setIsLoading(false); // Set loading to false
        })
        .catch(err => {
            setError(err.message); // Set error message
            setIsLoading(false); 
          console.error(err);
        });
}, [characterId]); 

useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/spells')
        .then((response) => response.json())
        .then((data) => setSpells(data.results))
        .catch((error) => console.error('Error fetching spells:', error));
}, []);

    const calculateSpellSaveDC = () => {
        return 8 + proficiencyBonus + spellcastingModifier;
    };

    const calculateSpellAttackBonus = () => {
        return proficiencyBonus + spellcastingModifier;
    };

    const handleSpellLevelChange = (level, value) => {
        const newSpellLevels = [...spellLevels];
        newSpellLevels[level - 1] = value;
        setSpellLevels(newSpellLevels);
    };

    const handleSpellSelect = async (spellIndex) => {
        const selected = spells[spellIndex];
        setSelectedSpell(selected);

        if (selected) {
            try {
                const response = await fetch(`https://www.dnd5eapi.co${selected.url}`);
                const details = await response.json();
                setSelectedSpellDetails(details);
            } catch (error) {
                console.error('Error fetching spell details:', error);
            }
        }
    };

    const handleSaveSpell = async () => {
        if (selectedSpell && !savedSpells.find((spell) => spell.index === selectedSpell.index)) {
            const name = selectedSpell.name;
            const level = selectedSpell.level;
            const description = selectedSpellDetails.desc?.join(' ');
            const spell = {character_id: characterId, name, level, description};

            try {
                const response = await fetch(`/api/spells/${characterId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.getToken()}`
                    },
                    body: JSON.stringify(spell)
                })
                const data = await response.json();
                const spellData = {...data, index: selectedSpell.index}
                setSavedSpells([...savedSpells, spellData])
                if (!response.ok) {
                    throw new Error('Invalid Response')
                }
            } catch (error) {
                console.error(error);
                console.log('Failed to save spell to database');
            }
        }
    };

    const handleRemoveSpell = async (spellIndex) => {
        const id = savedSpells[spellIndex].id;

        try {
            const response = await fetch(`/api/spells/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.getToken()}`
                }
            })
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to delete spell:', error)
        }

        setSavedSpells(savedSpells.filter((spell, index) => index !== spellIndex));
    };

    return (
        <div className='spellbook-sheet'>
            <img src={Fantasyspells} alt="An open spellbook" className='spellbook'></img>
            <div className='overlay'>
        <div className='spellcasting-stats'>
        <div className='spellcasting-ability'>
            <label>Spellcasting Ability: </label>
            <select value={spellcastingAbility}
            onChange={(e) => setSpellcastingAbility(e.target.value)}>

                <option value="Charisma">Charisma</option>
                <option value="Intelligence">Intelligence</option>
                <option value="Wisdom">Wisdom</option>
            </select>
        </div>

        <div className='spellcasting-modifier'>
            <label>Spellcasting Modifier: </label>
            <input
                type="number"
                value={spellcastingModifier}
                onChange={(e) => setSpellcastingModifier(Number(e.target.value))}
            />    
        </div>

        <div className='proficiency-bonus'>
            <label>Proficiency Bonus: </label>
            <input
                type="number"
                value={proficiencyBonus}
                onChange={(e) => setProficiencyBonus(Number(e.target.value))}
            />
        </div>

        <div className='spell-save-dc'>
            <p>Spell Save DC: {calculateSpellSaveDC()}</p>
        </div>

        <div className='spell-attack-bonus'>
            <p>Spell Attack Bonus: {calculateSpellAttackBonus()}</p>
        </div>
        </div>
        <div className="spell-sections">
        <div className='spell-levels'>
            <h2>Spell Levels</h2>
            {spellLevels.map((level, index) => (
                <div key={index} className="spell-level">
                    <label>Level {index + 1} Spells: </label>
                    <input
                        type="number"
                        value={level}
                        onChange={(e) => handleSpellLevelChange(index + 1, Number(e.target.value))}
                    />
                </div>
            ))}
        </div>

        <div className='spell-selector'>
                <h2>Select a Spell</h2>
                <select
                    onChange={(e) => handleSpellSelect(e.target.value)}
                    defaultValue="">
                    <option value="" disabled>
                        Choose a spell
                    </option>
                    {spells.map((spell, index) => (
                        <option key={spell.index} value={index}>
                            {spell.name} ( Level {spell.level || 'N/A'})
                        </option>
                    ))}
                </select>
                {selectedSpellDetails && (
                    <div className='selected-spell-details'>
                        <h3>{selectedSpellDetails.name}</h3>
                        <p><strong>Level:</strong> {selectedSpellDetails.level}</p>
                        <p><strong>Description:</strong> {selectedSpellDetails.desc?.join(' ')}</p>
                            <button onClick={handleSaveSpell}>Save Spell</button>
                    </div>
                )}
            </div>

            <div className="saved-spells">
                <h2>Saved Spells</h2>
                <ul>
                    {savedSpells.map((spell, index) => (
                        <li key={spell.index}>
                            <h3>{spell.name}</h3>
                            <p><strong>Level:</strong> {spell.level}</p>
                            <button onClick={() => handleRemoveSpell(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Spellbook