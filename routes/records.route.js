import { createRecord,getRecords,updateRecord,deleteRecord } from "../controllers/recordController.js";

import express from 'express';
import authMiddleware from "../middlewares/authMiddleware.js";
import checkRoleMiddleware from "../middlewares/checkRoleMiddleware.js";
import summaryController from "../controllers/summaryController.js";
const recordRouter = express.Router();

recordRouter.post('/records',authMiddleware,checkRoleMiddleware(['admin']), createRecord);
recordRouter.get('/records',authMiddleware,checkRoleMiddleware(['admin','analyst','viewer']), getRecords);
recordRouter.put('/records/:id',authMiddleware,checkRoleMiddleware(['admin']), updateRecord);
recordRouter.delete('/records/:id',authMiddleware,checkRoleMiddleware(['admin']), deleteRecord);
recordRouter.get('/summary',authMiddleware,checkRoleMiddleware(['admin','analyst']), summaryController);

export default recordRouter;