const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const fileService = require('./file.service');

// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    fileService.getAll()
        .then(files => res.json(files))
        .catch(next);
}

function getById(req, res, next) {
    fileService.getFile(req.params.id).then(file => file ? res.json(file) : res.sendStatus(404)).catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        emailMedico: Joi.string().required(),
        emailPaziente: Joi.string().required(),
        ifFile: Joi.string().required(),
        nomeFile: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    fileService.create(req.body)
        .then(file => res.json(file))
        .catch(next);
}

function _delete(req, res, next) {
    fileService.delete(req.params.id)
        .then(() => res.json({ message: 'File deleted successfully' }))
        .catch(next);
}