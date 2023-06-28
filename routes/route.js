const { register, login, logout } = require('../controller/user')


const route = require('express').Router()


route.post('/register',register)
route.post('/login',login)
route.post('/logout',logout)

module.exports = route


