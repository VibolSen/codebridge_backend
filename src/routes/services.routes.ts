import { Router } from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/services.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

export default router;
