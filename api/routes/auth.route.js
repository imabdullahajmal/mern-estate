import express from 'express'
import { google, register, signin } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', register)
router.post('/signin', signin)
router.post('/google', google)

export default router