const router = require('express').Router();
const userController = require('../controllers/auth');


router.get('/users', userController.getUser)

router.get('/users/profile', userController.profile, (req, res) => {
    return res.status(200).json({user: "profile"})
})

router.post('/login', userController.login)

router.post('/register', userController.register)

module.exports = router