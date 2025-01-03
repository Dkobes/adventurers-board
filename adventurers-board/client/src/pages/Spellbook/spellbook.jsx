import React, { useEffect, useState } from 'react';
import './spellbook.css'

const Spellbook = () => {
    const [spellcastingAbility, setSpellcastingAbility] = useState('Charisma');
    const [spellcastingModifier, setSpellcastingModifier] = useState(3);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [spellLevels, setSpellLevels] = useState(Array(9).fill(0));
    const [spells, setSpells] = useState([]);
    const [selectedSpell, setSelectedSpell] = useState(null);

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

    const handleSpellSelect = (spellIndex) => {
        const selected = spells[spellIndex];
        setSelectedSpell(selected);
    };

    return (
        <div className='spellbook-sheet'>
            <h1>SpellCasting</h1>

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
                            {spell.name}
                        </option>
                    ))}
                </select>
                {selectedSpell && (
                    <div className='selected-spell-details'>
                        <h3>{selectedSpell.name}</h3>
                        <p>URL: <a href={`https://www.dnd5eapi.co${selectedSpell.url}`} target="_blank" rel="noopener noreferrer">{selectedSpell.url}</a></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spellbook