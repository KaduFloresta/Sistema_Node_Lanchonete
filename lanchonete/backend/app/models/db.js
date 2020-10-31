const mysql = require("mysql");
const dbConfig = require("../configs/db.config.js");

// Cria um conexão com o Banco de Dados
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//Abre uma nova conexão com o SQL
connection.connect(error => {
    if (error)
        throw error;
    console.log("Conectado com o BD");
});

module.exports = connection;