import express from 'express'
import {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/register', createUser)

router.put('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

export default router
