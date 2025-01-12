import React, { useState, useEffect } from 'react';
import auth from '../../utils/auth.js';
import NotePaper from '/src/assets/images/note-paper.jpg';
import './notes.css';

<<<<<<< Updated upstream
const Notes = ({characterId}) => {
=======
const Notes = ({characterId }) => {
>>>>>>> Stashed changes
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
<<<<<<< Updated upstream
        fetch(`/api/notes/characters/${characterId}`, {
=======
        fetch(`/api/notes${characterId}`, {
>>>>>>> Stashed changes
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        })
<<<<<<< Updated upstream
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch character data');
            }
            return res.json();
        })
        .then(data => {
            setItems(data); // Set the items from the response
            setIsLoading(false); // Set loading to false
        })
        .catch(err => {
            setError(err.message); // Set error message
            setIsLoading(false); 
          console.error(err);
        });
}, [characterId]);
=======
        .then((response) => response.json())
        .then((data) => setNotes(data))
        .catch((error) => console.error('Error fetching notes:', error));
    }, [characterId]);
>>>>>>> Stashed changes

    const addNote = async () => {
        if (noteText) {
            try {
                const response = await fetch(`/api/notes/${characterId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.getToken()}`
                    },
                    body: JSON.stringify({ character_id: characterId, name: noteText})
                })
    
                const data = await response.json();
                console.log(data);
                setNotes([...notes, data]);
                return data;
            } catch (error) {
                console.error('Error saving note:', error);
            }    
            setNoteText('');
        }
    };

    const removeNote = async (index) => {
        const id = notes[index].id;
        setNotes(notes.filter((_, i) => i !== index));

        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.getToken()}`
                }
            })

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting note:', error);
        }
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
                        <div className="list">
                        {notes.map((note, index) => (
                            <li key={index}>
                                {note.text}
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