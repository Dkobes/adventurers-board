import { Router } from 'express';
import Note from '../../models/Note.js';
const router = Router();

<<<<<<< Updated upstream
// GET all notes
router.get('/characters/:character_id', async (_req, res) => {
=======
// GET all notes by character
router.get('/:character_id', async (_req, res) => {
>>>>>>> Stashed changes
    try {
        const notes = await Note.findAll({
            where: { character_id: req.params.character_id }
        });
<<<<<<< Updated upstream
        if (inventory.length > 0) {
            res.status(200).json(notes);
        } else {
            res.status(404).json({ message: 'No notes found for this character' });
        }
=======
        res.status(200).json(notes);
>>>>>>> Stashed changes
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notes', error });
    }
});

// GET a single note by ID
router.get('/:character_id', async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving note', error });
    }
});

// POST a new note
router.post('/:character_id', async (req, res) => {
    try {
        const newNote = await Note.create(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: 'Error creating note', error });
    }
});

// PUT (update) a note by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Note.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedNote = await Note.findByPk(req.params.id);
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating note', error });
    }
});

// DELETE a note by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Note.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error });
    }
});

export default router;