var express = require('express');
var router = express.Router();

var mongoOp = require('../models/mongo');

function checkAuth(req, res) {
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

router.route('/usuarios')
    .get(function(req, res) {
        var path = 'nova_conta.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, { "root": "./" });
    })
    .post(function(req, res) {
        var query = { "nome": req.body.nome };
        var response = {};
        mongoOp.findOne(query, function(erro, data) {
            if (data == null) {
                var db = new mongoOp();
                db.nome = req.body.nome;
                db.senha = req.body.senha;
                db.email = req.body.email;
                db.telefone = req.body.telefone;
                db.IDpassagens = []
                db.save(function(erro) {
                    if (erro) {
                        response = { "resultado": "falha de acesso ao BD" };
                        res.json(response);
                    } else {
                        response = { "resultado": "usuarios inserido" };
                        res.json(response);
                    }
                });
            } else {
                response = { "resultado": "usuarios ja existente" };
                res.json(response);
            }
        })
    });


router.route('/usuarios/:idusuarios')
    .get(function(req, res) {
        var path = 'nova_senha.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, { "root": "./" });
    })
    .put(function(req, res) {
        var response = {};
        var nome = req.body.nome;
        var telefone = req.body.telefone;
        var email = req.body.email;
        var novasenha = req.body.senha
        var query = { "nome": nome };
        mongoOp.findOne(query, function(erro, data) {
            if (erro) {
                response = { "resultado": "falha de acesso ao BD" };
                res.json(response);
            } else if (data == null) {
                response = { "resultado": "usuario inexistente" };
                res.json(response);
            } else {
                dados = { "usuarios": [data] };
                if (dados.usuarios[0].nome == nome && dados.usuarios[0].email == email && dados.usuarios[0].telefone == telefone) {
                    var data = { "senha": novasenha, "email": email, "telefone": telefone };
                    mongoOp.findOneAndUpdate(query, data, function(erro, data) {
                        if (erro) {
                            response = { "resultado": "falha de acesso ao DB" };
                            res.json(response);
                        } else {
                            response = { "resultado": "senha atualizada" };
                            res.json(response);
                        }
                    })
                } else {
                    response = { "resultado": "informações erradas" }
                    res.json(response);
                }
            }
        })
    })
    .delete(function(req, res) {
        if (checkAuth(req, res) != 'admin') {
            res.status(401).send('Unauthorized');
            return;
        }
        var response = {};
        var query = { "nome": req.params.nome };
        mongoOp.findOneAndRemove(query, function(erro, data) {
            if (erro) response = { "resultado": "falha de acesso ao DB" };
            else if (data == null) response = { "resultado": "usuario inexistente" };
            else response = { "resultado": "usuario removido" };
            res.json(response);
        })
    });

router.route('/authentication')
    .get(function(req, res) {
        var path = 'login.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, { "root": "./" });
    })
    .post(function(req, res) {
        var nome = req.body.nome;
        var senha = req.body.senha;
        if (nome == 'admin' && senha == 'onibus') {
            var content = { "key": "secret", "role": "admin" };
            res.cookie('nomeAuth', JSON.stringify(content), { 'maxAge': 3600000 * 24 * 5 });
            res.status(200).send('Sucesso');
        } else {
            var response = {};
            var query = { "nome": nome };
            mongoOp.findOne(query, function(erro, data) {
                if (erro) response = { "resultado": "falha de acesso ao BD" };
                else if (data == null) {
                    response = { "resultado": "usuarios inexistente" };
                } else {
                    dados = { "usuarios": [data] };
                    if (dados.usuarios[0].nome == nome && dados.usuarios[0].senha == senha) {
                        var content = { "key": "secret", "role": "nome" };
                        res.cookie('nomeAuth', JSON.stringify(content), { 'maxAge': 3600000 * 24 * 5 });
                        response = { "resultado": "login efetuado com sucesso" }
                    } else {
                        response = { "resultado": "nome ou senha incorretos" }
                    }
                }
                res.json(response);
            })
        }
    })
    .delete(function(req, res) {
        if (checkAuth(req, res) != 'unauthorized') {
            res.clearCookie('nomeAuth');
            res.status(200).send('Sucesso');
        } else {
            res.status(401).send('Unauthorized');
            return;
        }
    });

module.exports = router;