const PedidoModel = require("../models/pedido.model.js");

exports.create = (req, res) => {
    if (!req.body.nome && !req.body.valor) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const pedido = new PedidoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });

        PedidoModel.create(pedido, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro!"
                });
            }
            else {
                res.send(data);
            }
        });
    }
}

exports.findAll = (req, res) => {
    PedidoModel.getAll((err, data) => {
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
    PedidoModel.findById(req.params.pedidoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Pedido não encontrado! ID: " + req.params.pedidoId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o pedido com ID: " + req.params.pedidoId
                });
            }
        }
        else
            res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body.nome && !req.body.valor) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const pedido = new PedidoModel({
            nome: req.body.nome,
            valor: req.body.valor
        });

        PedidoModel.updateById(req.params.pedidoId, pedido, (err, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({
                        message: "Pedido não encontrado!"
                    });
                }
                else {
                    res.status(500).send({
                        message: "Erro ao atualizar o pedido!"
                    });
                }
            }
            else {
                res.send(data);
            }
        });
    }
};

exports.delete = (req, res) => {
    PedidoModel.remove.apply(req.params.pedidoId, (res, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "pedido não encontrado!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar o pedido" });
            }
        }
        else {
            res.send({ message: "pedido deletado com sucesso!" });
        }
    });
};

exports.deleteAll = (req, res) => {
    PedidoModel.remove((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os pedidos" });
        }
        else {
            res.send({ message: "Todos os pedidos deletados com sucesso!" });
        }
    });
};