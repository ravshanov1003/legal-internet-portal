const router = require('express').Router()

const { protect } = require('../middlewares/auth.middleware')
const { createUser, deleteUser, login, me } = require("../controllers/user.controller")

router.post('/create', createUser)
router.delete('/delete/:id', deleteUser)

router.post("/login", login)
router.get('/me', protect, me)


module.exports = { userRouter: router }