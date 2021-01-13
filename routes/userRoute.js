const router = require('express').Router();
const usersController = require('../controllers/userController');


router.get('/users', (req, res) => {
    res.send('Hello from routes')
});

router.post('/login', (req, res) => {

});

router.post('/register', usersController.register)

module.exports = router