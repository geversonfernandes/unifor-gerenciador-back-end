import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  createInvited,
  getAllInvited,
  updateInvited,
  deleteInvited,
} from '../controllers/invitedController.js'

const router = express.Router()

router.post('/:eventId', authMiddleware, createInvited)

router.get('/:eventId', authMiddleware, getAllInvited)

router.put('/:invitedId', authMiddleware, updateInvited)

router.delete('/:invitedId', authMiddleware, deleteInvited)

export default router
