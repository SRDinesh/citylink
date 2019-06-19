import express from 'express';
import FileController from '../src/controllers/FileController';
const router = express.Router();

router.get('/readfile', FileController.readFile);

export default router;