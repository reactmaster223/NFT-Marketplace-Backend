const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const mongoose = require('mongoose');
const helmet = require('helmet');
const key = require('./config/key');
const passport = require('passport');
const timer = require('./timer');

require('./config/passport');

// Import routes
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());

// Implement route
app.use('/auth', authRouter)
app.use('/nfttrading', accountRouter)

// Implement 500 error route
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function(req, res, next) {
    res.status(404).send('Sorry we could not find that.')
})

mongoose.connect(key.MONGO_URL)
.then(() => console.log('mongoose connected.'))
.catch((err) => console.log('mongoose error: ' + err));

const PORT = process.env.PORT || 5001;

timer.run();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));