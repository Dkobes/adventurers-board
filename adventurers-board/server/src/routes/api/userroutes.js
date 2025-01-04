import { Router } from 'express';
import User from '../../models/User.js';
const router = Router();

const getAllUsers = async (req, res) => {

    const users = await User.find();

    res.json(users)

};

const getUserById = (req, res) => { 
    res.send('Get user by id');
};

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;