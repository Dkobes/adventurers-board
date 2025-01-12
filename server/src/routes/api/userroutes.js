import { Router } from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = Router();

const getAllUsers = async (_req, res) => {

    const users = await User.findAll({
        attributes: { exclude: ['password'] }
    });
     res.json(users);


};

const getUserById = async (req, res) => { 
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
      });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // POST /users - Create a new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = await User.create({ username, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });

        if(!user) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }

        const validPassword = await user.isCorrectPassword(password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }

        // create a token to be sent back to client
        const secretKey = process.env.JWT_SECRET_KEY || 'helloworld';

        const token = jwt.sign({ id: user.id, username }, secretKey, { expiresIn: '1h' });

        res.status(201).json({
            message: 'You are now logged in!',
            token: token
        });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // PUT /users/:id - Update a user by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (user) {
        user.username = username;
        user.password = password;
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE /users/:id - Delete a user by id
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;