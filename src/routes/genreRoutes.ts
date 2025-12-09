import { Router } from 'express';
import { getRecords, getRecord, updateRecord, deleteRecord, createRecord } from '../controllers/genreController.js';
const router = Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', authenticateToken, authorizeRole('ADMIN'), createRecord);
router.put('/:id', authenticateToken, authorizeRole('ADMIN'), updateRecord);
router.delete('/:id', authenticateToken, authorizeRole('ADMIN'), deleteRecord);

export const genreRoutes = router;
