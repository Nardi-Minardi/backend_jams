const User = require('../models/userModel');

const userController = {
    register: async (req, res) => {
        try {

            const userExist = await User.findOne({ username: req.body.username })
            if (userExist) 
                return res.status(400).json({ message: "Username sudah digunakan" })
            
            const emailExist = await User.findOne({ email: req.body.email })
            if (emailExist)
                return res.status(400).json({ message: "Email sudah digunakan "})

            const { firstName, lastName, username, email, password } = req.body;

            const newUser = User({
                firstName,
                lastName,
                username: username.toLowerCase(),
                email,
                password
            })

            // save mongodb
            await newUser.save()
                .then(data => {
                    return res.status(200).json({
                        message: 'Register Berhasil',
                        result: data
                    })
                })
    
        } catch (error) {
            return res.status(403).json({ message: error.message })
        }
    },
    getUser: async (req, res) => {
        try {
            User.find()
            .then(data => {
                return res.status(200).json({
                    message: 'Success !!!',
                    result: data
                })
            })

        } catch (err) {
            return res.status(403).json({ message: err.message })
        }
    },
}

module.exports = userController