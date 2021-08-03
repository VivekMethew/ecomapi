const { User } = require('../models/users.model')
const { signAccessToken } = require('../helpers/auth')
module.exports = {
    registerUser: async (req, res) => {
        try {
            let payload = req.body
            const user = new User(payload)
            user.save()
                .then(() => {
                    res.status(201).json({
                        success: true,
                        message: 'success',
                        user: user
                    })
                }).catch(err => {
                    res.status(201).json({
                        success: false,
                        message: err.message
                    })
                })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },
    loginUser: async (req, res) => {
        try {
            let payload = req.body

            const user = await User.findOne({ email: payload.email })

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User Not Found!!!'
                })
            }

            const isMatch = await user.isValidPassword(payload.password)


            if (!isMatch) {
                res.status(400).json({
                    success: false,
                    message: 'Username/password not valid'
                })
            }

            const accessToken = await signAccessToken(user.id.toString())

            res.status(200).send({ user, accessToken })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}
