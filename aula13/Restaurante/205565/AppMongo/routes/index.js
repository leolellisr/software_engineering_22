var express = require('express');
var router = express.Router();
module.exports = router;

var mongoOp = require('../models/mongo');
var cardapio = require('../models/cardapio');

router.route('/style.css')
    .get(function(rep, res) {
        var path = 'style.css';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, {"root": "./"});
})

router.route('/')
    .get(function(rep, res) {
        var path = 'main-atendente.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, {"root": "./"});
})

router.route('/comanda')
    .post(function(req, res) {
        var response = {};
        mongoOp.find({}, function(erro, data) {
            //console.log(data.length);
            //console.log(data);
            var db = new mongoOp();
            db.id = data.length+1;
            var test = data.find(element => element.id == db.id);
            while(test){
                db.id = db.id + 1;
                test = data.find(element => element.id == db.id);
                console.log(test);
            }
            db.itens = [];
            db.save(function(erro) {
                if(erro) {
                    response = {"resultado": "Falha de acesso ao BD"};
                    res.json(response);
                } else {
                    response = {"resultado": "Comanda inserida"};
                    res.json(response);
                }
            })
        })
    })
    .get(function(req, res) {
        var response = {};
        mongoOp.find({}, function(erro, data) {
            if(erro) 
                response = {"resultado": "Falha de acesso ao BD"};
            else
                response = {"comandas": data};
            res.json(response);
        })
    });

router.route('/comanda/:id')
    .get(function(req, res) {
        var response = {};
        var query = {"id": req.params.id};
        mongoOp.findOne(query, function(erro, data) {
            if(data == null) {
                response = {"resultado": "Comanda inexistente"};
                res.json(response);
            }
            else {
                response = {"resultado": "Comanda vÃ¡lida", "coms": data};
                res.json(response);
            }
        })
    })
    .post(function(req, res) {
        var response = {};
        var query = {"id": req.params.id};
        mongoOp.findOne(query, function(erro, data) {
            if(data == null) {
                response = {"resultado": "Comanda inexistente"};
                res.json(response);
                return;
            }
        })
        data.itens.append(req.body);
        data.preco_total += req.body.preco*req.body.quant;
        var data_act = {"preco_total": data.preco_total, "preco_pago": data.preco_pago, "itens": data.itens};
        mongoOp.findOneAndUpdate(query, data_act, function(erro, data) {
            if(erro) { 
                response = {"resultado": "Falha de acesso ao DB"};
            }
	        else if(data == null) {
                response = {"resultado": "Comanda inexistente"};
            }
            else {
                response = {"resultado": "Item inserido"};
            }
            res.json(response);
        })
    })
    .delete(function(req, res) {   // DELETE (remove)
        var response = {};
        var query = {"id": req.params.id};
        mongoOp.findOneAndRemove(query, function(erro, data) {
            if(erro) response = {"resultado": "falha de acesso ao DB"};
            else if (data == null) response = {"resultado": "comanda inexistente"};
            else response = {"resultado": "comanda removida"};
            console.log(data);
            res.json(response);
        })
    })
    .put(function(req, res) {
        var response = {};
        var query = {"id": req.params.id};
        mongoOp.findOne(query, function(erro, data) {
            if(data.itens.length == 0) {
                if(req.body.quantidade == -1){
                    response = {"resultado": "A comanda esta vazia"};
                    res.json(response);
                    return;
                }
                else {
                    data.itens = [{"item": req.body.item, "preco": req.body.preco, "quantidade": 1}];
                }
            }
            else {
                let itens = data.itens.find(element => element.item == req.body.item);
                if(itens == null){
                    if(req.body.quantidade == -1){
                        response = {"resultado": "A comanda nao possui este item"};
                        res.json(response);
                        return;
                    }
                    else {
                        let aux = {"item": req.body.item, "preco": req.body.preco, "quantidade": 1};
                        data.itens.push(aux);
                    }
                }
                else {
                    itens.quantidade = itens.quantidade + req.body.quantidade;
                    if(itens.quantidade == 0){
                        data.itens.remove(itens);
                    }
                }
            }
            data.save(function(erro) {
                if(erro) {
                    response = {"resultado": "Falha de acesso ao BD"};
                    res.json(response);
                } else {
                    console.log(data);
                    if(req.body.quantidade == 1)
                        response = {"resultado": "Item adicionado"};
                    else
                        response = {"resultado": "Item removido"};
                    res.json(response);
                }
            })
        }
      )
    });

router.route('/cardapio')
    .get(function(req, res) {
        var response = {};
        cardapio.find({}, function(erro, data) {
            if(erro) 
                response = {"resultado": "Falha de acesso ao BD"};
            else
                response = {"cardapio": data};
            res.json(response);
        })
    }).post(function(req, res) {
        var query = {"nome": req.body.nome};
        //console.log(req.body.nome);
        var response = {};
        cardapio.findOne(query, function(erro, data) {
            if (data == null) {
                var db = new cardapio();
                db.nome = req.body.nome;
                db.preco = parseFloat(req.body.preco);
                db.prato = req.body.prato;
                console.log(db);
                db.save(function(erro) {
                    if(erro) {
                        response = {"resultado": "Falha de acesso ao BD","erro" : erro};
                        res.json(response);
                    } else {
                        response = {"resultado": "Item do cardapio inserido"};
                        res.json(response);
                    }
                })
            }
            else {
                response = {"resultado": "Item ja existente"};
                res.json(response);
            }
        })
    }).delete(function(req, res) {   
        var response = {};
        var query = {"id": req.params.id};
        mongoOp.findOneAndRemove(query, function(erro, data) {
            if(erro) response = {"resultado": "falha de acesso ao DB"};
            else if (data == null) response = {"resultado": "cardapio inexistente"};
            else response = {"resultado": "cardapio removido"};
            console.log(data);
            res.json(response);
        })
    });

router.route('/page/:id')
    .get(function(req, res) {
        if(req.params.id == "finish") {
            var path = 'finish.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
        else if(req.params.id == "comandas") {
            var path = 'comandas.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
        else if(req.params.id == "main") {
            var path = 'main-atendente.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
        else if(req.params.id == "conclusao") {
            var path = 'conclusao.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
    });
