module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");

    // Padrões do HTTP
    // POST = Enviando dados para a API
    // GET = Resgatando dados da API
    // PUT = Enviar dados de atualização 
    // DELETE = Deletar dados 

    // Criar um nova conta
    app.post("/signup", usuarioController.signUp);
    // Logar no sistema
    app.post("/signin", usuarioController.signIn);

//     app.get("/usuarios", usuarioController.findAll);

//     app.get("/usuarios/:usuarioId", usuarioController.findOne);

//     app.put("/usuarios/:usuarioId", usuarioController.update);

//     app.delete("/usuarios/:usuarioId", usuarioController.delete);

//     app.delete("/usuarios", usuarioController.deleteAll);
}