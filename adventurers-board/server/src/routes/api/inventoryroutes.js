import { Router } from 'express';
import Inventory from '../../models/Inventory.js';
const router = Router();

// GET all inventory items
router.get('/', async (_req, res) => {
    try {
        const inventory = await Inventory.findAll();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving inventory', error });
    }
});

// GET a single inventory item by ID
router.get('/:id', async (req, res) => {
    try {
        const inventory = await Inventory.findByPk(req.params.id);
        if (inventory) {
            res.status(200).json(inventory);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving inventory item', error });
    }
});

// POST a new inventory item
router.post('/', async (req, res) => {
    try {
        const newInventory = await Inventory.create(req.body);
        res.status(201).json(newInventory);
    } catch (error) {
        res.status(400).json({ message: 'Error creating inventory item', error });
    }
});

// PUT (update) an inventory item by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Inventory.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedInventory = await Inventory.findByPk(req.params.id);
            res.status(200).json(updatedInventory);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating inventory item', error });
    }
});

// DELETE an inventory item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Inventory.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting inventory item', error });
    }
});

export default router;