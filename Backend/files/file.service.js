const db = require('_helpers/db');

module.exports = {
    getAll,
    getFile,
    create,
    delete: _delete
};

async function getAll() {
    const files = await db.File.find();
    return files.map(x => basicDetails(x));
}

function basicDetails(file) {
    const { id, emailMedico, emailPaziente, ifFile, nomeFile } = file;
    return { id, emailMedico, emailPaziente, ifFile, nomeFile };
}

async function create(params) {
    // validate
    if (await db.File.findOne({ nomeFile: params.nomeFile, emailMedico: params.emailMedico, emailPaziente: params.emailPaziente })) {
        throw "L'oggetto è stato già caricato dall'utente!";
    }

    const file = new db.File(params);

    // save file
    await file.save();
}

async function _delete(id) {
    const file = await getFile(id);
    await file.remove();
}

async function getFile(id) {
    const file = await db.File.findById(id);
    if (!file) throw 'File not found';
    return file;
}