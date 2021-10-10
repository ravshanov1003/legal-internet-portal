const router = require('express').Router()

const { protect } = require('../middlewares/auth.middleware')
const { createUser, login, me, signup } = require("../controllers/user.controller")

router.post('/create', createUser)

router.post("/login", login)
router.get('/me', protect, me)
router.post('/signup', signup)

module.exports = { userRouter: router }