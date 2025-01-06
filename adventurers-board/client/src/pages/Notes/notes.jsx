import React, { useState } from 'react';
import NotePaper from '/src/assets/images/note-paper.jpg';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');

    const addNote = () => {
        if (noteText) {
            setNotes([...notes, noteText]);
            setNoteText('');
        }
    };

    return (
        <div className="note-paper">
            <img src={NotePaper} alt="Stained note paper" className="note-paper"></img>
            <h2>Notes</h2>
            <textarea 
                value={noteText} 
                onChange={(e) => setNoteText(e.target.value)} 
                placeholder="Write your note here" 
            />
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;