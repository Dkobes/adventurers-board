import { Router } from 'express';
const router = Router();
import userRouter from './userroutes.js';
import characterRouter from './characterroutes.js';
import inventoryRouter from './inventoryroutes.js';
import spellRouter from './spellroutes.js';

router.use('/users', userRouter);
router.use('/characters', characterRouter);
router.use('/inventories', inventoryRouter);
router.use('/spells', spellRouter);


export default router;