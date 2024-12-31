import React, { useState } from 'react';
import './spellbook.css'

const Spellbook = () => {
    const [spellcastingAbility, setSpellcastingAbility] = useState('primaryStat');
    const [spellcastingModifier, setSpellcastingModifier] = useState(3);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [spellLevels, setSpellLevels] = useState(Array(9).fill(0));

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
        </div>
    );
};

//Cantrips

//Level 1

//Level 2

//Level  3

//Level  4

//Level  5

//Level  6

//Level  7

//Level  8

//Level  9

export default spellbook