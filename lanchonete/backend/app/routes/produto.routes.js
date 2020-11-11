module.exports = app => {
    const produtoController = require("../controllers/produto.controller.js");

    // Padrões do HTTP
    // POST = Enviando dados para a API
    // GET = Resgatando dados da API
    // PUT = Enviar dados de atualização 
    // DELETE = Deletar dados 

    app.post("/produtos", produtoController.create);

    app.get("/produtos", produtoController.findAll);

    app.get("/produtos/:produtoId", produtoController.findOne);

    app.put("/produtos/:produtoId", produtoController.update);

    app.delete("/produtos/:produtoId", produtoController.delete);

    app.delete("/produtos", produtoController.deleteAll);
}