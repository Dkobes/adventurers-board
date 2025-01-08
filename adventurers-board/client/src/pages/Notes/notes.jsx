import React, { useState } from 'react';
import NotePaper from '/src/assets/images/note-paper.jpg';
import './notes.css';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');

    const addNote = () => {
        if (noteText) {
            setNotes([...notes, noteText]);
            setNoteText('');
        }
    };

    const removeNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className='note-paper'>
                <img src={NotePaper} alt="Stained note paper" className='notepaper-img'></img>
            </div>
            <div className='text-overlay'>
                <textarea 
                    value={noteText} 
                    onChange={(e) => setNoteText(e.target.value)} 
                    placeholder="Write your note here..." 
                />
            </div>
            <div className='button-overlay'>
                <button onClick={addNote}>Add Note</button>
                    <ul>
                        <div class="list">
                        {notes.map((note, index) => (
                            <li key={index}>{note}
                                <button onClick={() => removeNote(index)} style={{ marginLeft: '10px' }}>
                                Remove
                                </button>
                            </li>
                        ))}
                        </div>
                    </ul>
            </div>
         </div>
     );
};

export default Notes;