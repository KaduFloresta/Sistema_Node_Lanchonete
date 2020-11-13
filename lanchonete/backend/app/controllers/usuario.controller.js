const bcrypt = require("bcryptjs");
const UsuarioModel = require("../models/usuario.model.js");
const config = require("../configs/auth.config.js");
const jwt = require ("jsonwebtoken");

exports.signUp = (req, res) => {
    if (!req.body.email || !req.body.senha || !req.body.tipo) {
        res.status(400).send({
            message: "Email, Senha ou Tipo não enviados."
        });
    }
    else {
        // 1ª maneira de criar o usuario sem incriptação da senha
        // const usuario = new UsuarioModel(req.body);

        // 2ª maneira de criar o usuario
        const usuario = new UsuarioModel({
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 8),
            tipo: req.body.tipo
        });

        UsuarioModel.create(usuario, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro!"
                });
            }
            else {
                res.send(data);
            }
        });
    }
}

exports.signIn = (req, res) => {
    UsuarioModel.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err = "not_found") {
                res.status(404).send({
                    message: "Não há usuário com esse email!."
                });
            }
            else {
                res.status(500).send({
                    message: "Ocorreu um erro ao buscar o email do usuário."
                });
            }
        }
        else {
            let validPassword = bcrypt.compareSync(req.body.senha, data.senha);
            if (!validPassword) {
                res.status(401).send({
                    accessToken: null,
                    message: "Senha Inválida!"
                });
            }
            else {
                let token = jwt.sign({id: data.idusuarios},config.secret, {
                    expiresIn: 86400 // 24 Horas em segundos
                });

                res.status(200).send({
                    accessToken: token,
                    id: data.idusuarios,
                    email: data.email,
                    tipo: data.data
                });
            }
        }
    });
}

// exports.findAll = (req, res) => {
//     Usuario.getAll((err, data) => {
//         if (err) {
//             res.status(500).send({
//                 message: err.message || "Ocorreu algum erro!"
//             });
//         }
//         else
//             res.send(data);
//     });
// };

// exports.findOne = (req, res) => {
//     Usuario.findById(req.params.usuarioId, (err, data) => {
//         if (err) {
//             if (err.kind == "not_found!") {
//                 res.status(404).send({
//                     message: "usuario não encontrado! ID: " + req.params.usuarioId
//                 });
//             }
//             else {
//                 res.send(500).send({
//                     message: "Erro ao retornar o usuario com ID: " + req.params.usuarioId
//                 });
//             }
//         }
//         else
//             res.send(data);
//     });
// };

// exports.update = (req, res) => {
//     if (!req.body.nome && !req.body.valor) {
//         res.status(400).send({
//             message: "Conteúdo do corpo da requisição está vazio."
//         });
//     }
//     else {
//         const usuario = new Usuario({
//             nome: req.body.nome,
//             valor: req.body.valor
//         });

//         Usuario.updateById(req.params.usuarioId, usuario, (err, data) => {
//             if (err) {
//                 if (err.kind == "not_found") {
//                     res.status(404).send({
//                         message: "usuario não encontrado!"
//                     });
//                 }
//                 else {
//                     res.status(500).send({
//                         message: "Erro ao atualizar o usuario!"
//                     });
//                 }
//             }
//             else {
//                 res.send(data);
//             }
//         });
//     }
// };

// exports.delete = (req, res) => {
//     Usuario.remove.apply(req.params.usuarioId, (res, data) => {
//         if (err) {
//             if (err.kind == "not_found") {
//                 res.status(404).send({ message: "usuario não encontrado!" });
//             }
//             else {
//                 res.status(500).send({ message: "Erro ao deletar o usuario" });
//             }
//         }
//         else {
//             res.send({ message: "usuario deletado com sucesso!" });
//         }
//     });
// };

// exports.deleteAll = (req, res) => {
//     Usuario.remove((err) => {
//         if (err) {
//             res.status(500).send({ message: "Erro ao deletar todos os usuarios" });
//         }
//         else {
//             res.send({ message: "Todos os usuarios deletados com sucesso!" });
//         }
//     });
// };