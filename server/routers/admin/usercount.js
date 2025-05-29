import express from 'express';
import UserCount from '../../controllers/admin/countuser.js';
import authToken from '../../middleware/authToken.js';

const UserCountRouter = express.Router();

UserCountRouter.get('/user-count', authToken, UserCount );

export default UserCountRouter;