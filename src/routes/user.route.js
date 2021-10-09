const router = require('express').Router()

const { createUser, deleteUser, login } = require("../controllers/user.controller")

router.post('/create', createUser)
router.delete('/delete/:id', deleteUser)
router.post("/login", login)


module.exports = { userRouter: router }