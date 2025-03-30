import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  createEvent,
  getAllEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js'

const router = express.Router()

router.post('/', authMiddleware, createEvent)

router.get('/', authMiddleware, getAllEvent)

router.put('/:id', authMiddleware, updateEvent)

router.delete('/:id', authMiddleware, deleteEvent)

export default router
