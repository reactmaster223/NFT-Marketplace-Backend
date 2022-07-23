const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const axois = require('axios');

const saveAccount = (req, res, next) => {
    let _id = req.body._id;
    let privateKey = req.body.privateKey;
    User.findOne({_id})
    .then(user => {
        if(user.accounts) {
            if(user.accounts.length >= 5) res.status(400).send({message: 'Cannot set accounts over 5!'});
            else {
                user.accounts.push(privateKey);
                user.save()    
                .then(usr => res.json({success: usr}))
                .catch(next);
            }
        }
    })
    .catch(next);
}

const getAbiFromAddress = (req, res, next) => {
    let address = req.body.address;
    let api_req = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=3P53WGBY952N2TCWS3JEN819IQVXN5BMP2`;
    axois.get(api_req)
        .then(response => {
            if(response.data.message === 'OK') res.json({success: response.data.result});
            else res.send({type: 'Error', message: response.data.result});
        })
        .catch(next)
}

const mintDataSave = (req, res, next) => {
    let { _id, account, time, rawTransaction } = req.body;
    Transaction.findOne({rawTransaction})
    .then(trans => {
        if(trans) {
            res.json({message: 'That transaction is already exists!'});
        }
        else {
            let transaction = new Transaction({userId: _id, account, time: new Date(time), rawTransaction, status: 'pending'});
            transaction.save()
            .then(trans => res.json({success: trans}))
            .catch(next);
        }
    })
    .catch(next);
}

module.exports = {
    saveAccount,
    getAbiFromAddress,
    mintDataSave,
}
