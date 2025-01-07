import React, { useEffect, useState } from 'react';
import './spellbook.css'
import Fantasyspells from '/src/assets/images/spellbook.jpg';

const Spellbook = () => {
    const [spellcastingAbility, setSpellcastingAbility] = useState('Charisma');
    const [spellcastingModifier, setSpellcastingModifier] = useState(3);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [spellLevels, setSpellLevels] = useState(Array(9).fill(0));
    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);
    const [selectedSpellDetails, setSelectedSpellDetails] = useState(null);
    const [savedSpells, setSavedSpells] = useState([]);

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

    const handleSaveSpell = () => {
        if (selectedSpell && !savedSpells.find((spell) => spell.index === selectedSpell.index)) {
            setSavedSpells([...savedSpells, selectedSpell]);
        }
    };

    const handleRemoveSpell = (spellIndex) => {
        setSavedSpells(savedSpells.filter((spell, index) => index !== spellIndex));
    };

    return (
        <div className='spellbook-sheet'>
            <h1>SpellBook</h1>
                <img src={Fantasyspells} alt="An opened spellbook" className="spellbook"></img>
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
    );
};

export default Spellbook