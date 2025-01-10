import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import Profile from "./pages/Profile/profile.jsx"; 
import CharacterSelect from './pages/CharacterSelect/characterselect.jsx';
import Inventory from './pages/Inventory/inventory.jsx';
import Spellbook from './pages/Spellbook/spellbook.jsx';
import Combat from './pages/Combat/combat.jsx';
import Notes from './pages/Notes/notes.jsx';
import './App.css'
import Navbar from './pages/Navbar/navbar.jsx';

function App() {
  const [characterId, setCharacterId] = useState();
  const [userId, setUserId] = useState(); // Add userId state

  const handleLogin = (id) => {
    setUserId(id); // Set userId when user logs in
  };
  

  return (
    <Router>
      <div className="App">
      <Navbar characterId={characterId}/>
      <main>
      <Routes>
        <Route path="/" element={<Home handleLogin={handleLogin}/>} />
        <Route path="/characterselect" element={<CharacterSelect userId={userId} setCharacterId={setCharacterId}/>} />
        <Route path="/profile/:id" element={<Profile setCharacterId={setCharacterId}/>} />
        <Route path="/combat/:id" element={<Combat />} />
        <Route path="/inventory/:id" element={<Inventory />} />
        <Route path="/spellbook/:id" element={<Spellbook />} /> 
        <Route path="/notes/:id" element={<Notes />} />


      </Routes>
      </main>
      </div>
    </Router>
  );
}

export default App
