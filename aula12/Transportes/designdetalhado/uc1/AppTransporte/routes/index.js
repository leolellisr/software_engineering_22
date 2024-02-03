var express = require('express');
var router = express.Router();

var mongoOp = require('../models/mongo');

function checkAuth(req, res) { // checa se o perfil esta logado
    cookies = req.cookies;
    console.log(cookies);
    if (!cookies || !cookies.nomeAuth) return 'unauthorized';
    cauth = cookies.nomeAuth;
    var content = JSON.parse(cauth);
    var key = content.key;
    var role = content.role;
    if (key == 'secret') return role
    return 'unauthorized';
}

router.route('/')
    .get(function(req, res) {
        var path = 'index.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, { "root": "./" });
    });

router.route('/usuarios') // criacao de nova conta
    .get(function(req, res) { //abre o nova_conta.html
        var path = 'nova_conta.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, { "root": "./" });
    })
    .post(function(req, res) { // cria nova conta
        var query = { "nome": req.body.nome };
        var response = {};
        mongoOp.findOne(query, function(erro, data) {
            if (data == null) {
                var db = new mongoOp();
                db.nome = req.body.nome;
                db.senha = req.body.senha;
                db.email = req.body.email;
                db.telefone = req.body.telefone;
                db.save(function(erro) {
                    if (erro) {
                        response = "falha de acesso ao BD"
                        res.json(response);
                    } else {
                        response = "usuario inserido"
                        res.json(response);
                    }
                });
            } else {
                response = "usuario ja existente"
                res.json(response);
            }
        })
    });

router.route('/authentication') // efetua o login
    .get(function(req, res) { // abre o login.html
        var path = 'login.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, { "root": "./" });
    })
    .post(function(req, res) {
        var nome = req.body.nome;
        var senha = req.body.senha;
        if (nome == 'admin' && senha == 'onibus') { //conta do administrador
            var content = { "key": "secret", "role": "admin" };
            res.cookie('nomeAuth', JSON.stringify(content), { 'maxAge': 3600000 * 24 * 5 });
            res.status(200).send('Sucesso');
        } else {
            var response = {};
            var query = { "nome": nome };
            mongoOp.findOne(query, function(erro, data) { //verifica perfil inserido na base de dados
                if (erro) response = "falha de acesso ao BD"
                else if (data == null) {
                    response = "usuario inexistente"
                } else {
                    dados = { "usuarios": [data] };
                    if (dados.usuarios[0].nome == nome && dados.usuarios[0].senha == senha) {
                        var content = { "key": "secret", "role": "nome" };
                        res.cookie('nomeAuth', JSON.stringify(content), { 'maxAge': 3600000 * 24 * 5 });
                        response = "login efetuado com sucesso"
                    } else {
                        response = "nome ou senha incorretos"
                    }
                }
                res.json(response);
            })
        }
    })
    .delete(function(req, res) {
        if (checkAuth(req, res) != 'unauthorized') {
            res.clearCookie('nomeAuth'); // remove cookie no cliente
            res.status(200).send('Sucesso');
        } else {
            res.status(401).send('Unauthorized');
            return;
        }
    });

module.exports = router;