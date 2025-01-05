import { Router } from 'express';
import Character from '../../models/Character.js';
const router = Router();

// GET all characters
router.get('/', async (_req, res) => {
    try {
        const characters = await Character.findAll();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving characters', error });
    }
});

// GET a single character by ID
router.get('/:id', async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (character) {
            res.status(200).json(character);
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving character', error });
    }
});

// POST a new character
router.post('/', async (req, res) => {
    try {
        const newCharacter = await Character.create(req.body);
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: 'Error creating character', error });
    }
});

// PUT (update) a character by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Character.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCharacter = await Character.findByPk(req.params.id);
            res.status(200).json(updatedCharacter);
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating character', error });
    }
});

// DELETE a character by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Character.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Character not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting character', error });
    }
});


export default router;