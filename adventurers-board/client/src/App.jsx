import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import Profile from "./pages/Profile/profile.jsx";
import CharacterSelect from './pages/CharacterSelect/characterselect.jsx';
import Inventory from './pages/Inventory/inventory.jsx';
import Spellbook from './pages/Spellbook/spellbook.jsx';
import Combat from './pages/Combat/combat.jsx';
import Notes from './pages/Notes/notes.jsx';
import './App.css'
import Navbar from './pages/Navbar/navbar.jsx';
import auth from "./utils/auth";


function App() {
  const [characterId, setCharacterId] = useState(0);
  const [userId, setUserId] = useState(); // Add userId state

  const [characterList, setCharacterList] = useState([]);

  const [error, setError] = useState(null); // State to hold any error messages

  const user_id = auth.getUserId();
  console.log(user_id);

  useEffect(() => {
    // Fetch existing characters when the component mounts
    fetch(`/api/characters/all/${user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCharacterList(data); // Set the character list from the response
      })
      .catch(err => console.error(err));
  }, [user_id]);

  const handleLogin = (id) => {
    setUserId(id); // Set userId when user logs in
  };

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <Router>
      <div className="App">
        <Navbar characterId={characterId} setError={setError}/>
        <main>
          <Routes>
            <Route path="/" element={<Home handleLogin={handleLogin} />} />
            <Route path="/characterselect" element={<CharacterSelect characterId={characterId} setCharacterId={setCharacterId} characterList={characterList} setCharacterList={setCharacterList} />} />
            <Route path="/profile/:id" element={<Profile setCharacterId={setCharacterId} />} />
            <Route path="/combat/:id" element={<Combat characterId={characterId}/>} />
            <Route path="/inventory/:id" element={<Inventory characterId={characterId}/>} />
            <Route path="/spellbook/:id" element={<Spellbook characterId={characterId}/>} />
            <Route path="/notes/:id" element={<Notes characterId={characterId} />} />


          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
