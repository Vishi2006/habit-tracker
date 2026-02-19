const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {email: user.email, id: user._id}, 
        process.env.JWT_KEY,
        { expiresIn: '24h' } // Token expires in 24 hours
    )
}

module.exports.generateToken = generateToken;