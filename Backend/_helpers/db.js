const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { "auth": { "authSource": "admin"}, "user": config.mongoUser, "pass": config.mongoPassword, useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}