const userModel = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');
const bcrypt = require('bcrypt')

// Input validation helper
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

//create a new user (encrypt using bcrypt)
const createUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        
        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        if (name.length < 3) {
            return res.status(400).json({ message: "Name must be at least 3 characters" });
        }

        let user = await userModel.findOne({ email });
        if (user) return res.status(400).json({ message: "User is already registered!" });

        //secure password with async/await
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        let createdUser = await userModel.create({
            name,
            email,
            password: hash
        });

        return res.status(201).json({
            message: "Registration successful! Please log in.",
            data: {
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email
            }
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
}

//login user (verify using bcrypt) & set jwt as cookie from utils.
const loginUser = async (req, res) => {

    try {
        let { password, email } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        let user = await userModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        //verify password with async/await
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            let token = generateToken(user);
            // Set cookie with 24-hour expiry (86400 seconds = 24 hours)
            res.cookie("token", token, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', // HTTPS only in production
                maxAge: 86400000, // 24 hours in milliseconds
                path: '/',
                sameSite: 'strict'
            });
            return res.status(200).json({
                message: `Logged in, hey ${user.name}`,
                user: { _id: user._id, name: user.name, email: user.email },
                token,
            })  
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Login failed. Please try again." });
    }
};

const logoutUser = async (req, res) => {
   try {
       res.clearCookie("token", {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
        return res.status(200).json({ message: "Logged out successfully" });
   } catch (error) {
       res.status(500).json({ message: "Logout failed" });
   }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedUser = await userModel.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.clearCookie("token", {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });
        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete account" });
    }
};



module.exports = {
    createUser,
    loginUser,
    logoutUser,
    deleteUser
}