const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {

    register: async (req, res) => {
        try {

            const userExist = await User.findOne({ username: req.body.username });
            if (userExist) 
                return res.status(400).json({ message: "Username sudah digunakan" })
            
            const emailExist = await User.findOne({ email: req.body.email });
            if (emailExist)
                return res.status(400).json({ message: "Email sudah digunakan "})

            const { firstName, lastName, username, email, password } = req.body;
            const hashPassword = await bcrypt.hashSync(password, 10)

            const newUser = User({
                firstName,
                lastName,
                username: username.toLowerCase(),
                email,
                password: hashPassword
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
            await User.find()
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

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if(!user) {
                return res.status(400).json({ message: "Email tidak terdaftar"})
            }
            
            const isMatch = await bcrypt.compareSync(password, user.password)
            if(isMatch) {
                const token = createAccessToken({ _id: user._id });
                const { _id, firstName, lastName, email, password, fullName } = user;
                return res.status(200).json({
                    message: "Login success !!!",
                    token,
                    user: {
                        _id, firstName, lastName, email, password, fullName 
                    }
                })
            } else {
                return res.status(400).json({ message: "Password anda salah" })
            }

        } catch (error) {
            return res.status(403).json({ message: error.message})
        }
    },

    profile: async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = user;
            next();
        } catch (error) {
            return res.status(400).json({ message: error.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

module.exports = userController