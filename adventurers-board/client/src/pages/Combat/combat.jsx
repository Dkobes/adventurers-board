import { useState } from 'react';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import './combat.css';
import Colosseum from '/src/assets/images/colosseum.jpg';

export default function Combat() {
    const [weapons, setWeapons] = useState([]);
    const [spells, setSpells] = useState([]);
    const [spellList, setSpellList] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillDice, setSkillDice] = useState(1);
    const [dice, setDice] = useState();
    const [diceName, setDiceName] = useState(4);
    const [diceCount, setDiceCount] = useState(1);
    const [style, setStyle] = useState({display: 'none'});

    const skillPrompt = () => {
        return (
            <div>
            <input
                name='name'
                type='text'
                value={skillName}
                onChange={(event) => setSkillName(event.target.value)}
                placeholder='Enter name'
            />
            <label htmlFor='modifier'>Choose a modifier:</label>
            <select id='modifier'>
                <option value='STR'>STR</option>
                <option value='DEX'>DEX</option>
                <option value='CON'>CON</option>
                <option value='INT'>INT</option>
                <option value='WIS'>WIS</option>
                <option value='CHA'>CHA</option>
            </select>
            <label htmlFor='diceCount'>Number of dice:</label>
            <input
                name='diceCount'
                type='number'
                value={skillDice}
                min='1'
                onChange={(event) => setSkillDice(event.target.value)}
            />
            <label htmlFor='diceType'>Die type:</label>
            <select id='diceType'>
                <option value='4'>d4</option>
                <option value='6'>d6</option>
                <option value='8'>d8</option>
                <option value='10'>d10</option>
                <option value='12'>d12</option>
                <option value='20'>d20</option>
                <option value='100'>d100</option>
            </select>
            <button onClick={() => addSkill(skillName, modifier.value, skillDice, diceType.value)}>Add Skill</button>
            </div>
        )
    }

    const addSkill = (name, modifier, diceAmount, diceValue) => {
        setSkills([...skills, {name: name, atk: modifier, count: diceAmount, type: diceValue}]);
        console.log(skills);
    }

    const deleteSkill = (index) => {
        const newSkills = skills.filter((skill, i) => index !== i);
        setSkills(newSkills);
    }

    const spellSelect = () => {
        return (
            <>
            <label htmlFor='spellOptions'>Add Spell: </label>
            <select id='spellOptions'>
                {spellList.map((spell, index) => (
                    <option key={index} value={JSON.stringify(spell)}>{spell.name}</option>
                ))}
            </select>
            <button onClick={() => addSpell(spellOptions.value)}>Add Spell</button>
            </>
        )
    }

    const addSpell = (newSpell) => {
        setSpells([...spells, JSON.parse(newSpell)]);
    }

    const deleteSpell = (index) => {
        const newSpells = spells.filter((spell, i) => index !== i);
        setSpells(newSpells);
    }

    const deleteWeapon = (index) => {
        const newWeapons = weapons.filter((weapon, i) => index !== i);
        setWeapons(newWeapons);
    }

    function diceRoll(count, type, modifier) {
        const roll = new DiceRoll(`${count}d${type} + ${modifier}`);
        console.log(roll.output);
        setDice(roll.total);
    }

    return (
        <div>
            <div>
                <header className="colosseum-header">
                    <img src={Colosseum} alt="A colosseum full of people" className="header-image"></img>
                </header>
            </div>
            <div className="combat">
                {/* Display weapons from inventory with their damage and attack modifiers. Choose spells to display */}
                <section className='weapons'>
                    <h3>Weapons</h3>
                    {weapons.map((weapon, index) => (
                        <p key={index}><span>{weapon.name}</span> <button onClick={() => diceRoll(1, 20, weapon.atk)}>To Hit: +{weapon.atk}</button> 
                        <button onClick={() => diceRoll(weapon.count, weapon.type, 0)}>Damage: {weapon.count}d{weapon.type}</button> <button onClick={() => deleteWeapon(index)}>X</button></p>
                    ))}
                </section>
                
                <section className='spells'>
                    <h3>Spells</h3>
                    {spells.map((spell, index) => (
                        <p key={index}><span>{spell.name}</span> {spell.atk === null ? <span>DC: {spell.dc}</span> : <button onClick={() => diceRoll(1, 20, spell.atk)}>To Hit: +{spell.atk}</button>} 
                        <button onClick={() => diceRoll(spell.count, spell.type, 0)}>Damage: {spell.count}d{spell.type}</button> <button onClick={() => deleteSpell(index)}>X</button></p>
                    ))}
                    {spellSelect()}
                </section>

                <section className='skills'>
                    <h3>Skills</h3>
                    {skills.map((skill, index) => (
                        <p key={index}><span>{skill.name}</span> {skill.atk === null ? <span>DC: {skill.dc}</span> : <button onClick={() => diceRoll(1, 20, skill.atk)}>To Hit: +{skill.atk}</button>} 
                        <button onClick={() => diceRoll(skill.count, skill.type, 0)}>Damage: {skill.count}d{skill.type}</button> <button onClick={() => deleteSkill(index)}>X</button></p>
                    ))}
                    {skillPrompt()}
                </section>
            </div>
            <div className='dice'>
                {/* Roll a dice */}
                <button onClick={() => setDiceCount(diceCount + 1)}>+</button>
                <button onClick={() => diceRoll(diceCount, diceName, 0)}>{diceCount}d{diceName}</button>
                <button onClick={() => {if (diceCount > 1) setDiceCount(diceCount - 1)}}>-</button>
                <button onClick={() => {JSON.stringify(style) === '{}' ? setStyle({display: 'none'}) : setStyle({})}}>^</button>
                <button style={style} onClick={() => setDiceName(4)}>d4</button>
                <button style={style} onClick={() => setDiceName(6)}>d6</button>
                <button style={style} onClick={() => setDiceName(8)}>d8</button>
                <button style={style} onClick={() => setDiceName(10)}>d10</button>
                <button style={style} onClick={() => setDiceName(12)}>d12</button>
                <button style={style} onClick={() => setDiceName(20)}>d20</button>
                <button style={style} onClick={() => setDiceName(100)}>d100</button>
            </div>
            <h2>{dice}</h2>
        </div>
    )
}