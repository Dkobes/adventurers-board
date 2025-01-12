import React, { useState, useEffect } from "react";
import auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './characterselect.css';
import Character from '/src/assets/images/character-select.jpg';

const classes = [
  "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk",
  "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"
];

const levels = Array.from({ length: 20 }, (_, i) => i + 1);

const backgrounds = [
  "Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero",
  "Guild Artisan", "Hermit", "Noble", "Outlander", "Sage",
  "Sailor", "Soldier", "Urchin"
];

const races = [
  "Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf",
  "Half-Orc", "Halfling", "Human", "Tiefling"
];

const alignments = [
  "Lawful Good", "Lawful Neutral", "Lawful Evil",
  "Neutral Good", "True Neutral", "Neutral Evil",
  "Chaotic Good", "Chaotic Neutral", "Chaotic Evil"
];

const CharacterSelect = ({ characterId, setCharacterId, characterList, setCharacterList }) => {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [level, setLevel] = useState('');
  const [background, setBackground] = useState('');
  const [race, setRace] = useState('');
  const [alignment, setAlignment] = useState('');
  const [age, setAge] = useState(18);
  const [hair, setHair] = useState('');
  const [strength, setStrength] = useState('');
  const [dexterity, setDexterity] = useState('');
  const [constitution, setConstitution] = useState('');
  const [intelligence, setIntelligence] = useState('');
  const [wisdom, setWisdom] = useState('');
  const [charisma, setCharisma] = useState('');

  const user_id = auth.getUserId();



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
      hair,
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
      user_id
    };
    console.log(formData);

    fetch(`api/characters?user_id=${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.getToken()}`
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Character created successfully!");
          setCharacterList([...characterList, data]); // Add the new character to the list
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to create character.");
      });
  };

  const handleDeleteCharacter = (characterId) => {
    fetch(`/api/characters/${characterId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    })
     
      .then(() => {
        // Update the character list by removing the deleted character
        setCharacterList(characterList.filter((character) => character.id !== characterId));
        alert("Character deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete character.");
      });
  };

  return (
    <div className="container">
      <img src={Character} alt="A man puppet-mastering people" className="character-img"></img>
      <div className="character-select">
        <h1>Character Select</h1>
      </div>
      <div className="existing-character">
        <h2>Choose your character</h2>
      </div>

      <br />
      <br />
      <br />

      <ul className="characterList">
  {characterList.map((character) => (
    <li key={character.id} onClick={() => setCharacterId(character.id)}>
      {characterId === character.id ? (
        <h2 className="character-card-option-selected">{character.name} 
        <button className="delete-button"
        onClick={() => handleDeleteCharacter(character.id)}>
        ❌
      </button></h2>
      ) : (
        <h2 className="character-card-option">{character.name}</h2>
      )}
    </li>
  ))}
</ul>


      <br />
      <div className="new-character">
        <h2>Create a new character</h2>
      </div>
      <form onSubmit={handleSubmit} id="form-submit">
        <label>Name:</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} />

        <label>Class:</label>
        <select required value={characterClass} onChange={(e) => setCharacterClass(e.target.value)}>
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <label>Level:</label>
        <select required value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select Level</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

        <label>Background:</label>
        <select required value={background} onChange={(e) => setBackground(e.target.value)}>
          <option value="">Select Background</option>
          {backgrounds.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <label>Race:</label>
        <select required value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="">Select Race</option>
          {races.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label>Alignment:</label>
        <select required value={alignment} onChange={(e) => setAlignment(e.target.value)}>
          <option value="">Select Alignment</option>
          {alignments.map((align) => (
            <option key={align} value={align}>
              {align}
            </option>
          ))}
        </select>

        <label>Age:</label>
        <input
          type="number"
          value={age}
          min={1}
          onChange={(e) => setAge(Number(e.target.value))}
        />

        <label>Hair:</label>
        <input type="text" required value={hair} onChange={(e) => setHair(e.target.value)} />

        <label>Strength:</label>
        <input
          type="number"
          required
          value={strength}
          onChange={(e) => setStrength(e.target.value)}
        />

        <label>Dexterity:</label>
        <input
          type="number"
          required
          value={dexterity}
          onChange={(e) => setDexterity(e.target.value)}
        />

        <label>Constitution:</label>
        <input
          type="number"
          required
          value={constitution}
          onChange={(e) => setConstitution(e.target.value)}
        />

        <label>Intelligence:</label>
        <input
          type="number"
          required
          value={intelligence}
          onChange={(e) => setIntelligence(e.target.value)}
        />

        <label>Wisdom:</label>
        <input
          type="number"
          required
          value={wisdom}
          onChange={(e) => setWisdom(e.target.value)}
        />

        <label>Charisma:</label>
        <input
          type="number"
          required
          value={charisma}
          onChange={(e) => setCharisma(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CharacterSelect;
