import { Router } from 'express';
import { getRecords, getRecord, createRecord, deleteRecord, updateRecord } from '../controllers/posterController.js';
const router = Router();

router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export const posterRoutes = router;
