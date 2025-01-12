import { Router } from 'express';
const router = Router();
import userRouter from './userroutes.js';
import characterRouter from './characterroutes.js';
import inventoryRouter from './inventoryroutes.js';
import spellRouter from './spellroutes.js';
import noteRouter from './noteroutes.js';
import combatRouter from './combatroutes.js';
import authMiddleware from '../../middleware/auth.js';

router.use('/users', userRouter);
router.use('/characters', authMiddleware, characterRouter);
router.use('/inventories', authMiddleware, inventoryRouter);
router.use('/spells', authMiddleware, spellRouter);
router.use('/notes', authMiddleware, noteRouter);
router.use('/combat', authMiddleware, combatRouter);


export default router;