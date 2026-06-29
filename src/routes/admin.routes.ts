import { Router } from 'express';
import { getStats, getMessagesCount, getProjectRequestsCount, getMessages, getMessage, updateMessage, deleteMessage, initDb } from '../controllers/admin.controller';
import { reorderTeamMembers } from '../controllers/teamMembers.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats', verifyToken, getStats);
router.get('/messages/count', verifyToken, getMessagesCount);
router.get('/project-requests/count', verifyToken, getProjectRequestsCount);
router.get('/messages', verifyToken, getMessages);
router.get('/messages/:id', verifyToken, getMessage);
router.patch('/messages/:id', verifyToken, updateMessage);
router.delete('/messages/:id', verifyToken, deleteMessage);
router.post('/team/reorder', verifyToken, reorderTeamMembers);
router.get('/init-db', initDb);

export default router;
