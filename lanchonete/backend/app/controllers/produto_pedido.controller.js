const produto_pedidoModel = require("../models/produto_pedido.model.js");

exports.create = (req, res) => {
    if (!req.body.produtos_idprodutos && !req.body.pedidos_idpedidos) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const produtoPedido = new produto_pedidoModel({
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,
            observacao: req.body.observacao
        });

        produto_pedidoModel.create(produtoPedido, (err, data) => {
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
    produto_pedidoModel.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro!"
            });
        }
        else
            res.send(data);
    });
};

// Encontra um registro produto_pedido
exports.findOne = (req, res) => {
    produto_pedidoModel.findById(req.params.produtoPedidoId, (err, data) => {
        if (err) {
            if (err.kind == "not_found!") {
                res.status(404).send({
                    message: "Registro não encontrado! ID: " + req.params.produtoPedidoId
                });
            }
            else {
                res.send(500).send({
                    message: "Erro ao retornar o registro com ID: " + req.params.produtoPedidoId
                });
            }
        }
        else
            res.send(data);
    });
};

// Retorna um Array ou não!
exports.findByPedido = (req, res) => {
    produto_pedidoModel.getByPedido(req.params.pedidoId, (err, data) => {
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

// Retorna um Array ou não!
exports.findByProduto = (req, res) => {
    produto_pedidoModel.getByProduto(req.params.produtoId, (err, data) => {
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

// Altera o dados do produto_pedido
exports.update = (req, res) => {
    if (!req.body.produtos_idprodutos && !req.body.pedidos_idpedidos) {
        res.status(400).send({
            message: "Conteúdo do corpo da requisição está vazio."
        });
    }
    else {
        const produtoPedido = new produto_pedidoModel({
            produtos_idprodutos: req.body.produtos_idprodutos,
            pedidos_idpedidos: req.body.pedidos_idpedidos,
            observacao: req.body.observacao
        });

        produto_pedidoModel.updateById(req.params.produtoPedidoId, produtoPedido, (err, data) => {
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

// Deleta um pedido 
exports.delete = (req, res) => {
    produto_pedidoModel.remove.apply(req.params.produtoPedidoId, (res, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Pedido não encontrado!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar o pedido" });
            }
        }
        else {
            res.send({ message: "Pedido deletado com sucesso!" });
        }
    });
};

// Deleta um pedido
exports.deleteByPedido = (req, res) => {
produto_pedidoModel.remove.apply(req.params.pedidoId, (res, data) => {
        if (err) {
            if (err.kind == "not_found") {
                res.status(404).send({ message: "Pedido não encontrado!" });
            }
            else {
                res.status(500).send({ message: "Erro ao deletar o pedido" });
            }
        }
        else {
            res.send({ message: "Pedido deletado com sucesso!" });
        }
    });
};

// Deleta um produto
exports.deleteByProduto = (req, res) => {
    produto_pedidoModel.remove.apply(req.params.produtoId, (res, data) => {
            if (err) {
                if (err.kind == "not_found") {
                    res.status(404).send({ message: "Pedido não encontrado!" });
                }
                else {
                    res.status(500).send({ message: "Erro ao deletar o pedido" });
                }
            }
            else {
                res.send({ message: "Pedido deletado com sucesso!" });
            }
        });
    };

// Deleta todos os pedidos
exports.deleteAll = (req, res) => {
    produto_pedidoModel.remove((err) => {
        if (err) {
            res.status(500).send({ message: "Erro ao deletar todos os pedidos" });
        }
        else {
            res.send({ message: "Todos os pedidos deletados com sucesso!" });
        }
    });
};