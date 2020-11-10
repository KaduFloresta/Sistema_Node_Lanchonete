const sql = require("./db.js");

// Construtor
const ProdutoPedido = function (produtoPedido) {
    this.produtos_idprodutos = produtoPedido.produtos_idprodutos;
    this.pedidos_idpedidos = produtoPedido.pedidos_idpedidos;
    this.observacao = produtoPedido.observacao;
}

// Cria um novo pedido no BD
ProdutoPedido.create = (produtoPedido, result) => {
    // Implementar criação de um novo pedido no BD
    sql.query("INSERT INTO produtos_pedidos SET ? ", produtoPeido, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("pedidos criado: ", { idpedidos: res.insertid, ...pedido });
        result(null, { idprodutospedidos: res.insertid, ...produtoPedido });
    });
};

// Seleciona todos os produtos
ProdutoPedido.getAll = (result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
               INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
               INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)`, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("pedidos: ", res);
        result(null, res);
    });
};

// Seleciona um produto através do ID
ProdutoPedido.findById = (produtoPedidoId, result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE prods_peds.idprodutos_pedidos = ? ` + produtoPedidoId, (err, res) => {

        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("produtos encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

ProdutoPedido.findById = (pedidoId, result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE peds.idpedidos = ? ` + pedidoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("pedido encontrado: ", res);
            result(null, res);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};

ProdutoPedido.findById = (produtoId, result) => {
    sql.query(`SELECT * FROM produtos_pedidos prods_peds
    INNER JOIN pedidos peds ON (peds.idpedidos = prods_peds.pedidos_idpedidos)
    INNER JOIN produtos prods ON (prods.idprodutos = prods_peds.produtos_idprodutos)
    WHERE peds.idrodutos = ? ` + produtoId, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("produto encontrado: ", res);
            result(null, res);
            return;
        }

        else
            result({ kind: "not_found" }, null)

    });
};



// // Atualizar o produto através do ID
// ProdutoModel.updateById = (produtoId, produto, result) => {
//     sql.query("UPDATE produtos SET nome = ?, valor = ? WHERE idprodutos = ?", [produto.nome, produto.valor, produtoId], (err, res) => {
//         if (err) {
//             console.log("Erro", err);
//             result(null, err);
//         }
//         else if (res.affectedRows == 0) {
//             result({ kind: "not_found" }, null);
//         }
//         else {
//             console.log("Produto atualizado: ", { idprodutos: produtoId, ...produto });
//             result(null, { idprodutos: produtoId, ...produto });
//         }
//     });
// };

// // Remover o produto através do ID
// ProdutoModel.remove = (produtoId, result) => {
//     sql.query("DELETE FROM produtos WHERE idprodutos = ?", produtoId, (err, re) => {
//         if (err) {
//             console.log("Erro", err);
//             result(null, err);
//         }
//         else if (res.affectedRows == 0) {
//             result({ kind: "not_found" }, null);
//         }
//         else {
//             result(null, res);
//         }
//     });
// };

// // Remover todos os produtos
// ProdutoModel.removeAll = (result) => {
//     sql.query("DELETE FROM produtos", (err, re) => {
//         if (err) {
//             console.log("Erro", err);
//             result(err);
//         }
//         else {
//             result(null);
//         }
//     });
// };

module.exports = ProdutoPedido;
