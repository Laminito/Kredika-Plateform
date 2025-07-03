import express from 'express';
import userRoutes from './user.routes.js';
// importe les autres routes ici...

const router = express.Router();

// Route par défaut (GET /api)
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kredika API 🚀' });
});

// Ajoute ici toutes les autres routes
router.use('/users', userRoutes);
// router.use('/products', productRoutes);
// etc.

export default router;
