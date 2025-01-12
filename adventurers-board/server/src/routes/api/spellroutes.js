import { Router } from 'express';
import Spell from '../../models/Spell.js';
const router = Router();

// GET all spells
router.get('/characters/:character_id', async (_req, res) => {
    try {
        const spells = await Spell.findAll({
            where: { character_id: req.params.character_id }
        });
        res.status(200).json(spells);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving spells', error });
    }
});

// GET a single spell by ID
router.get('/:id', async (req, res) => {
    try {
        const spell = await Spell.findByPk(req.params.id);
        if (spell) {
            res.status(200).json(spell);
        } else {
            res.status(404).json({ message: 'Spell not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving spell', error });
    }
});

// POST a new spell
router.post('/:character_id', async (req, res) => {
    try {
        const newSpell = await Spell.create(req.body);
        res.status(201).json(newSpell);
    } catch (error) {
        res.status(400).json({ message: 'Error creating spell', error });
    }
});

// PUT (update) a spell by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Spell.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSpell = await Spell.findByPk(req.params.id);
            res.status(200).json(updatedSpell);
        } else {
            res.status(404).json({ message: 'Spell not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating spell', error });
    }
});

// DELETE a spell by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Spell.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Spell not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting spell', error });
    }
});

export default router;