import { useState } from 'react';
import './combat.css';

export default function Combat() {
    const [d4, setD4] = useState();
    const [d6, setD6] = useState();
    const [d8, setD8] = useState();
    const [d10, setD10] = useState();
    const [d12, setD12] = useState();
    const [d20, setD20] = useState();
    const [d100, setD100] = useState();

    function diceRoll(min, max, modifier) {
        const result = Math.floor(Math.random() * (max - min) + min + modifier);
        console.log(result);
        if (max - min === 4) {
            setD4(result);
        } else if (max - min === 6) {
            setD6(result);
        } else if (max - min === 8) {
            setD8(result);
        } else if (max - min === 10) {
            setD10(result);
        } else if (max - min === 12) {
            setD12(result);
        } else if (max - min === 20) {
            setD20(result);
        } else {
            setD100(result);
        }
    }

    return (
        <div>
            <div className="combat">
                {/* Display weapons from inventory with their damage and attack modifiers. Choose spells to display */}
                <section className='weapons'>
                    <h3>Weapons</h3>
                    <p><span>Longsword</span> <button onClick={() => diceRoll(1, 21, 5)}>To Hit: +5</button> <button onClick={() => diceRoll(1, 9, 3)}>Damage: 1d8+3</button></p>
                    <button>Add Weapon</button>
                </section>
                
                <section className='spells'>
                    <h3>Spells</h3>
                    <p><span>Firebolt</span> <button onClick={() => diceRoll(1, 21, 5)}>To Hit: +5</button> <button onClick={() => diceRoll(1, 11, 0)}>Damage: 1d10</button></p>
                    <button>Add Spell</button>
                </section>
            </div>
            <div className='dice'>
                {/* Roll a dice */}
                <button onClick={() => diceRoll(1, 5, 0)}>d4: {d4}</button>
                <button onClick={() => diceRoll(1, 7, 0)}>d6: {d6}</button>
                <button onClick={() => diceRoll(1, 9, 0)}>d8: {d8}</button>
                <button onClick={() => diceRoll(1, 11, 0)}>d10: {d10}</button>
                <button onClick={() => diceRoll(1, 13, 0)}>d12: {d12}</button>
                <button onClick={() => diceRoll(1,21, 0)}>d20: {d20}</button>
                <button onClick={() => diceRoll(1, 101, 0)}>d100: {d100}</button>
            </div>
        </div>
    )
}