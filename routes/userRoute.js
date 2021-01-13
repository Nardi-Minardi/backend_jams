const router = require('express').Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getUser)

router.post('/login', (req, res) => {

});

router.post('/register', userController.register)

module.exports = router