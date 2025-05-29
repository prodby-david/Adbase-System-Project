import express from 'express';
import UserCount from '../../controllers/admin/countuser.js';

const UserCountRouter = express.Router();

UserCountRouter.get('/user-count', UserCount );

export default UserCountRouter;