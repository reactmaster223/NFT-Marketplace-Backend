const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const get = (req, res) => {
    return res.json(req.user);
}

const create = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hash(req.body.password, 10),
    })
    user.save()
    .then(saveduser => res.json({success: saveduser}))
    .catch(next)
}

const update = (req, res, next) => {
    const user = req.user;
    user.username = req.body.username;
    user.email = req.body.email;

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(next)
}

const list = (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

const remove = (req, res, next) => {
    const user = req.user;
    user.remove()
        .then(deleteUser => res.json(deleteUser))
        .catch(next)
}

module.exports = {
    get,
    create,
    list,
    update,
    remove
}
