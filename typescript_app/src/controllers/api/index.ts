const router = require('express').Router();
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
