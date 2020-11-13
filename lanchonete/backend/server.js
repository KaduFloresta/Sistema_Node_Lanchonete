const express = require("express");
const bodyParser = require("body-parser");

// APP = APLICATION
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Bem vindo á API MVC do Senac" });
});

require("./app/routes/produto.routes.js")(app);
require("./app/routes/pedido.routes.js")(app);
require("./app/routes/produto_pedido.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);

app.listen(3000, () => {
    console.log("servidor rodando na porta 3000");
});
