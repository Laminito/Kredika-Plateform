// src/routes/user.routes.js
import { Router } from 'express';
const router = Router();

// Exemple de route GET
router.get('/user', (req, res) => {
  res.json({ message: 'User route works!' });
});

export default router;
