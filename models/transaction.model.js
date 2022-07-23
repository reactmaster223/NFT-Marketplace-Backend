const mongoose =  require('mongoose');
const autoincrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

autoincrement.initialize(mongoose.connection);

const TransactionSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    rawTransaction: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    transactionHash: {
        type: String,
    }
})

TransactionSchema.plugin(autoincrement.plugin, 'transactions');
module.exports = Transaction = mongoose.model('transactions', TransactionSchema);