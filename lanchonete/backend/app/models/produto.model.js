const sql = require("./db.js");

// Construtor
const ProdutoModel = function (produto) {
    this.nome = produto.nome;
    this.valor = produto.valor;
}

// Cria um novo produto no BD
ProdutoModel.create = (produto, result) => {
    // Implementar criação de um novo produto no BD
    sql.query("INSERT INTO produtos SET ? ", produto, (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(err, null);
            return;
        }
        console.log("produtos criado: ", { idprodutos: res.insertid, ...produto });
        result(null, { idprodutos: res.insertid, ...produto });
    });
};

// Seleciona um produto através do ID
ProdutoModel.findById = (produtoId, result) => {
    sql.query("SELECT * FROM produtos WHERE idprodutos = " + produtoId, (err, res) => {
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

// Seleciona todos os produtos
ProdutoModel.getAll = (result) => {
    sql.query("SELECT * FROM produtos", (err, res) => {
        if (err) {
            console.log("Erro!", err);
            result(null, err);
            return;
        }
        console.log("produtos: ", res);
        result(null, res);
    });
};

// Atualizar o produto através do ID
ProdutoModel.updateById = (produtoId, produto, result) => {
    sql.query("UPDATE produtos SET nome = ?, valor = ? WHERE idprodutos = ?", [produto.nome, produto.valor, produtoId], (err, res) => {
        if (err) {
            console.log("Erro", err);
            result(null, err);
        }
        else if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
        }
        else {
            console.log("Produto atualizado: ", { idprodutos: produtoId, ...produto });
            result(null, { idprodutos: produtoId, ...produto });
        }
    });
};

// Remover o produto através do ID
ProdutoModel.remove = (produtoId, result) => {
    sql.query("DELETE FROM produtos WHERE idprodutos = ?", produtoId, (err, re) => {
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

// Remover todos os produtos
ProdutoModel.removeAll = (result) => {
    sql.query("DELETE FROM produtos", (err, re) => {
        if (err) {
            console.log("Erro", err);
            result(err);
        }
        else {
            result(null);
        }
    });
};

module.exports = ProdutoModel;
