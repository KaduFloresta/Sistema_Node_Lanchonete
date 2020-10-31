const sql = require("./db.js");

// Construtor
const ProdutoModel = function (produto) {
    this.nome = produto.nome;
    this.valor = produto.valor;
}

// Cria um novo produto no BD
ProdutoModel.create = (produto, result) => {
    // Implemente criação de um novo produto no BD
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

};

// Remover o produto através do ID
ProdutoModel.remove = (produtoId, result) => {

};

// Remover todos os produtos
ProdutoModel.removeAll = (result) => {

};

module.exports = ProdutoModel;
