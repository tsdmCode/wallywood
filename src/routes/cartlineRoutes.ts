import { Router } from 'express';
import { getRecords, getRecord, updateRecord, deleteRecord, createRecord } from '../controllers/cartlineController.js';
const router = Router();
import { authenticateToken } from '../middleware/authenticateToken.js';
import { authorizeRole } from '../middleware/authorizeRole.js';

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', authenticateToken, authorizeRole('ADMIN', 'USER'), createRecord);
router.put('/:id', authenticateToken, authorizeRole('ADMIN', 'USER'), updateRecord);
router.delete('/:id', authenticateToken, authorizeRole('ADMIN', 'USER'), deleteRecord);

export const cartlineRoutes = router;
