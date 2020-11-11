module.exports = app => {
    const produto_pedidoController = require("../controllers/produto_pedido.controller.js");

    // Padrões do HTTP
    // POST = Enviando dados para a API
    // GET = Resgatando dados da API
    // PUT = Enviar dados de atualização 
    // DELETE = Deletar dados 

    app.post("/produtos_pedidos", produto_pedidoController.create);

    app.get("/produtos_pedidos", produto_pedidoController.findAll);
    // Select a partir do ID da tabela, do ID do pedido e do ID do produto

    // Localhost:3000/produtos/pedido/4 = seleciona todos os produtos ID=4 dentro dos pedidos 
    app.get("/produtos_pedidos/:produtoPedidoId", produto_pedidoController.findOne);
    // Localhost:3000/produtos/pedido/10 = seleciona o produtos_pedidos do produto com ID=10
    app.get("/produtos_pedidos/pedido/:pedidoId", produto_pedidoController.findByPedido);
    // Localhost:3000/produtos/pedido/2 = seleciona o produtos_pedidos do produto com ID=2
    app.get("/produtos_pedidos/pedido/:produtoseleciona o produtos_pedidos do produto com ID=10Id", produto_pedidoController.findByProduto);

    // app.put("/produtos_pedidos/:produtoPedidoId", produto_pedidoController.update);

    // // Localhost:3000/produtos/pedido/4 = deleta todos os produtos ID=4 dentro dos pedidos 
    // app.delete("/produtos_pedidos/:produtoPedidoId", produto_pedidoController.delete);
    // // Localhost:3000/produtos/pedido/10 = deleta o produtos_pedidos do produto com ID=10
    // app.delete("/produtos_pedidos/pedido/:pedidoId", produto_pedidoController.deleteByPedido);
    // // Localhost:3000/produtos/pedido/2 = deleta o produtos_pedidos do produto com ID=2
    // app.delete("/produtos_pedidos/pedido/:produtoId", produto_pedidoController.deleteByProduto);

    // app.delete("/produtos_pedidos", produto_pedidoController.deleteAll);
}