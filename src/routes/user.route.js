const router = require('express').Router()

const { protect } = require('../middlewares/auth.middleware')
const { createUser, deleteUser, login, me, signup } = require("../controllers/user.controller")

router.post('/create', createUser)
router.delete('/delete/:id', deleteUser)

router.post("/login", login)
router.get('/me', protect, me)
router.post('/signup', signup)

module.exports = { userRouter: router }