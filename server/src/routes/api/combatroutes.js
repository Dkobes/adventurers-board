import { Router } from 'express';
import Combat from '../../models/Combat.js';
const router = Router();

// GET all weapons
router.get('/weapons/:character_id', async (req, res) => {
    try {
        const weapons = await Combat.findAll({
            where: { 
                character_id: req.params.character_id,
                type: 'weapon'
            } // Use character_id to filter
        });
        if (weapons.length > 0) {
            res.status(200).json(weapons);
        } else {
            res.status(404).json({ message: 'No weapons found for this character' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving weapons', error });
    }
});


// GET all combat spells
router.get('/spells/:character_id', async (req, res) => {
    try {
        const spells = await Combat.findAll({
            where: { 
                character_id: req.params.character_id,
                type: 'spell'
            } // Use character_id to filter
        });
        if (spells.length > 0) {
            res.status(200).json(spells);
        } else {
            res.status(404).json({ message: 'No spells found for this character' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving spells', error });
    }
});

// GET all combat skills
router.get('/skills/:character_id', async (req, res) => {
    try {
        const skills = await Combat.findAll({
            where: { 
                character_id: req.params.character_id,
                type: 'skill'
            } // Use character_id to filter
        });
        if (skills.length > 0) {
            res.status(200).json(skills);
        } else {
            res.status(404).json({ message: 'No skills found for this character' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving skills', error });
    }
});

// POST a new combat item
router.post('/:character_id', async (req, res) => {
    try {
        const newCombatItem = await Combat.create(req.body);
        res.status(201).json(newCombatItem);
    } catch (error) {
        res.status(400).json({ message: 'Error creating combat item', error });
    }
});

// PUT (update) an combat by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Combat.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCombatItem = await Combat.findByPk(req.params.id);
            res.status(200).json(updatedCombatItem);
        } else {
            res.status(404).json({ message: 'Combat item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating combat item', error });
    }
});

// DELETE an inventory item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Combat.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Combat item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting combat item', error });
    }
});

export default router;