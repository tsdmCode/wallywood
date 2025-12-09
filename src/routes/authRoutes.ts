import { Router } from 'express';
import { authenticateToken } from '../middleware/authenticateToken';
import { getUserProfile } from '../controllers/authController.js';
import { authorizeRole } from '../middleware/authorizeRole.js';
const router = Router();

// Først kører authenticateToken (tjekker om token er gyldig)
// Hvis token er OK, kører getUserProfile og returnerer brugerens data
router.get('/authenticate', authenticateToken, getUserProfile);
router.get('/authorize', authenticateToken, authorizeRole('ADMIN'), getUserProfile);

export { router as authRoutes };
