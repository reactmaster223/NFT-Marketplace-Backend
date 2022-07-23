const Transaction = require('./models/transaction.model');
const Web3 = require('web3');
const env = require('./env.json');
const web3 = new Web3(new Web3.providers.HttpProvider(env.API_KEY));

function run () {
    setInterval(sendValidableTransaction, 60*1000);
}

function sendValidableTransaction() {
    let currentTime = new Date();
    Transaction.find({time: {$gte: new Date(currentTime-60*1000), $lte: new Date(currentTime+60*1000)}, status: 'pending'})
    .then(trans => {
        for(let i=0; i<trans.length; i++) {
            let rawTransaction = trans[i].rawTransaction;
            web3.eth.sendSignedTransaction(rawTransaction, function(err, hash) {
                if (!err) {
                    console.log("The hash of your transaction is: \n"+ hash+"\nCheck etherscan's Mempool to view the status of your transaction!"); 
                    trans[i].time = new Date(currentTime);
                    trans[i].status = 'send complete';
                    trans[i].transactionHash = hash.toString();
                    trans[i].save();
                } else {
                    console.log("Something went wrong when submitting your transaction.\n"+err);
                    trans[i].time = new Date(currentTime);
                    trans[i].status = 'send error';
                    trans[i].transactionHash = err.toString();
                    trans[i].save();
                }
            });
        }
    })
}

module.exports = {
    run,
    sendValidableTransaction
}