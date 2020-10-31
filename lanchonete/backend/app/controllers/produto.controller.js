const produtoModel = require("../models/produto.model.js");

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {
    produtoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            });
        }
        else
            res.send(data);
    });
};

exports.findOne = (req, res) => {
    produtoModel.findById(req.params.produtoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Produto não encontrado! ID: " + req.params.produtoId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o produto com ID: " + req.params.produtoId
                });
            }
        }
        else
            res.send(data);
    });
};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};