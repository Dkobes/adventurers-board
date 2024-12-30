import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from "./pages/Profile/profile.jsx"; 
// import CharacterSelect from './pages/CharacterSelect/characterselect.jsx';
import Inventory from './pages/Inventory/inventory.jsx';
// import Spellbook from './pages/Spellbook/spellbook.jsx';
import Combat from './pages/Combat/combat.jsx';
import Notes from './pages/Notes/notes.jsx';
import './App.css'

function App() {
  

  return (
    <Router>
      <main>
      <Routes>
        {/* <Route path="./pages/Home" element={<Home />} /> */}
        {/* <Route path="/characterselect" element={<CharacterSelect />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/combat" element={<Combat />} />
        <Route path="/inventory" element={<Inventory />} />
        {/* <Route path="/spellbook" element={<Spellbook />} /> */}
        <Route path="/notes" element={<Notes />} />


      </Routes>
      </main>
    </Router>
  );
}

export default App
