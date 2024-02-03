var express = require('express');
var router = express.Router();
module.exports = router;

var mongoOp = require('../models/mongo_comanda');

router.route('/')
    .get(function(rep, res) {
        var path = 'garçom-main.html';
        res.header('Cache-Control', 'no-cache');
        res.sendFile(path, {"root": "./"});
    });

router.route('/comanda')
    .post(function(req, res) {
        var query = {"id": req.body.id};
        var response = {};
        mongoOp.findOne(query, function(erro, data) {
            if (data == null) {
                var db = new mongoOp();
                db.id = req.body.id;
                db.preco_total = "0.00";
                db.preco_pago = "0.00";
                db.save(function(erro) {
                    if(erro) {
                        response = {"resultado": "Falha de acesso ao BD"};
                        res.json(response);
                    } else {
                        response = {"resultado": "Comanda inserida"};
                        res.json(response);
                    }
                })
            }
            else {
                response = {"resultado": "Comanda ja existente"};
                res.json(response);
            }
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
                response = {"resultado": "Comanda válida", "coms": data};
                res.json(response);
            }
        })
    });

router.route('/page/:id')
    .get(function(req, res) {
        if(req.params.id == "com-edit") {
            var path = 'garçom-edit-comanda.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
        else if(req.params.id == "gar-main") {
            var path = 'garçom-main.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
        else if(req.params.id == "main") {
            var path = 'main.html';
            res.header('Cache-Control', 'no-cache');
            res.sendFile(path, {"root": "./"});
        }
    });