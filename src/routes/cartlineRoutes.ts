import { Router } from 'express';
import { getRecords, getRecord, updateRecord, deleteRecord, createRecord } from '../controllers/cartlineController.js';
const router = Router();

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export const cartlineRoutes = router;
