const router = require('express').Router();
const adminController = require('../../controllers/admin/auth');


// router.get('/users', adminController.getUser)

router.get('/users/profile', adminController.profile, (req, res) => {
    return res.status(200).json({user: "profile"})
})

router.post('/admin/login', adminController.login)

router.post('/admin/register', adminController.register)

module.exports = router