const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/key');
const salt = 10;

const register = (req, res, next) => {
    if(req.body.password !== req.body.password_confirmation) res.json({type: 'Error', message: 'Password confirmation error.'})
    bcrypt.hash(req.body.password, salt, (err, encrypted) => {
        if(err) res.json({type: 'Error', message: 'password encrypt error'})
        else {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: encrypted,
            })
            user.save()
            .then(saveduser => res.json({success: saveduser}))
            .catch(next)
        }
    })
    
}

const login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                bcrypt.hash(req.body.password, salt, (err, encrypted) => {
                    if(bcrypt.compare(encrypted, user.password)) {
                        const token = jwt.sign({_id: user.id, username: user.username, email: user.email, accounts: [...user.accounts]}, key.SECRET);
                        res.status(200).send({success: {
                            isAuthenticated: true,
                            token: token,
                            message: 'user found & logged in'
                        }})
                    } else {
                        res.send({
                            isAuthenticated: false,
                            token: null,
                            message: 'password is not correct'
                        })
                    }
                })
                
            } else res.send({
                isAuthenticated: false,
                token: null,
                message: 'user not found'
            })
        })
        .catch(next)
}

module.exports = {
    register,
    login
}