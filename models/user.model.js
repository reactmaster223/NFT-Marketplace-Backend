const mongoose =  require('mongoose');
const autoincrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoincrement.initialize(mongoose.connection);

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accounts: {
        type: [String]
    }
})
/*
* Statics
*/
UserSchema.statics = {
    get(id) {
        return this.findById(id)
        .exec()
        .then((user) => {
            return user;
        })
        .catch(err => res.json(err))
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
          .sort({ username: -1 })
          .skip(+skip)
          .limit(+limit)
          .exec();
    }
}

UserSchema.plugin(autoincrement.plugin, 'users');
module.exports = User = mongoose.model('users', UserSchema);