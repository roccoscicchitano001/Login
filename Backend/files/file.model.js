const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    emailMedico: { type: String, required: true },
    emailPaziente: { type: String,  required: true },
    ifFile: { type: String,  unique: true, required: true },
    nomeFile: { type: String, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('File', schema);