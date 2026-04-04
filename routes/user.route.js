import { createUser, getAllUsers, updateRoleAndStatus } from "../controllers/userController.js";

import express from 'express';
const userRouter = express.Router();

userRouter.post('/users', createUser);
userRouter.get('/users', getAllUsers);
userRouter.put('/users/:id', updateRoleAndStatus);

export default userRouter;