import express from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
} from '../controllers/scheduleController.js';
import { validateCreateSchedule, validateUpdateSchedule } from '../validators/scheduleValidator.js';
import { authenticate } from '../middleware/authMiddleware.js'; // Untuk melindungi rute

const router = express.Router();

// Rute yang mungkin memerlukan autentikasi
router.post('/', authenticate, validateCreateSchedule, createSchedule);
router.get('/', authenticate, getAllSchedules);
router.get('/:id', authenticate, getScheduleById);
router.put('/:id', authenticate, validateUpdateSchedule, updateSchedule);
router.delete('/:id', authenticate, deleteSchedule);

export default router;