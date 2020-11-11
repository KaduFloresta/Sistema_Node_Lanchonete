const sql = require("./db.js");

// Construtor
const PedidoModel = function (pedido) {
    this.pedidos_idpedidos = pedido.pedidos_idpedidos;
}

// Cria um novo pedido no BD
PedidoModel.create = (pedido, result) => {
    // Implementar criação de um novo pedido no BD
    sql.query("INSERT INTO pedidos SET ? ", pedido, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("pedidos criado: ", { idpedidos: res.insertid, ...pedido });
        result(null, { idpedidos: res.insertid, ...pedido });
    });
};

// Seleciona um pedido através do ID
PedidoModel.findById = (pedidoId, result) => {
    sql.query("SELECT * FROM pedidos WHERE idpedidos = " + pedidoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("pedidos encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

// Seleciona todos os pedidos
PedidoModel.getAll = (result) => {
    sql.query("SELECT * FROM pedidos", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("pedidos: ", res);
        result(null, res);
    });
};

// Atualizar o pedido através do ID
PedidoModel.updateById = (pedidoId, pedido, result) => {
    sql.query("UPDATE pedidos SET nome = ?, valor = ? WHERE idpedidos = ?", [pedido.nome, pedido.valor, pedidoId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("pedido atualizado: ", { idpedidos: pedidoId, ...pedido });
            result(null, { idpedidos: pedidoId, ...pedido });
        }
    });
};

// Remover o pedido através do ID
PedidoModel.remove = (pedidoId, result) => {
    sql.query("DELETE FROM pedidos WHERE idpedidos = ?", pedidoId, (err, re) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            result(null, res);
        }
    });
};

// Remover todos os pedidos
PedidoModel.removeAll = (result) => {
    sql.query("DELETE FROM pedidos", (err, re) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = PedidoModel;
