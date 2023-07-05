const { register, login, logout, allUsers } = require('../controller/user')


const route = require('express').Router()


route.post('/register',register)
route.post('/login',login)
route.post('/logout',logout)
route.get('/alluser',allUsers)

module.exports = route


