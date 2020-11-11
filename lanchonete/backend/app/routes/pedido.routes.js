module.exports = app => {
    const pedidoController = require("../controllers/pedido.controller.js");

    // Padrões do HTTP
    // POST = Enviando dados para a API
    // GET = Resgatando dados da API
    // PUT = Enviar dados de atualização 
    // DELETE = Deletar dados 

    app.post("/pedidos", pedidoController.create);

    app.get("/pedidos", pedidoController.findAll);

    app.get("/pedidos/:pedidoId", pedidoController.findOne);

    app.put("/pedidos/:pedidoId", pedidoController.update);

    app.delete("/pedidos/:pedidoId", pedidoController.delete);

    app.delete("/pedidos", pedidoController.deleteAll);
}