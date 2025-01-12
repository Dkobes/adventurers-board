import React, { useState, useEffect } from 'react';
import auth from '../../utils/auth.js';
import NotePaper from '/src/assets/images/note-paper.jpg';
import './notes.css';
import { useParams } from 'react-router-dom';

const Notes = () => {
    const { characterId } = useParams();
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/notes/${characterId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.getToken()}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Fetched notes:', data); 
            setNotes(data);
        })
        .catch((error) => console.error('Error fetching notes:', error));
    }, [characterId]);

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
                            <li key={note.id}>
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