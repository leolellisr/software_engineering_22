var express = require('express');
var router = express.Router();

var mongoOp = require('../models/mongo');
var mongoOp2 = require('../models/mongo2');

// Código abaixo adicionado para o processamento das requisições
// HTTP GET, POST, PUT, DELETE

function checkAuth(req, res) {
  cookies = req.cookies;
  console.log(cookies);
  if(! cookies || ! cookies.userAuth) return 'unauthorized';
  cauth = cookies.userAuth;
  var content = JSON.parse(cauth);
  var key = content.key;
  var role = content.role;
  if(key == 'secret') return role
  return 'unauthorized';
}

// index.html
router.route('/') 
 .get(function(req, res) {  // GET
    var path = 'index.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, {"root": "./"});
  });

router.route('/alunos')     // Operaçõess sobre todos os alunos
 .get(function(req, res) {  // GET
    if(checkAuth(req, res) == 'unauthorized') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    mongoOp.find({}, function(erro, data) {
      if(erro)
        response = {"resultado": "Falha de acesso ao BD!"};
      else
        response = {"alunos": data};
        res.json(response);
    })
  })
  .post(function(req, res) {   // POST (cria)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var query = {"ra": req.body.ra};
    var response = {};
    mongoOp.findOne(query, function(erro, data) {
      if (data == null) {
        var db = new mongoOp();
        db.ra = req.body.ra;
        db.nome = req.body.nome;
        db.curso = req.body.curso;
        db.save(function(erro) {
          if(erro) {
            response = {"resultado": "Falha de acesso ao BD!"};
            res.json(response);
          } else {
              response = {"resultado": "Aluno inserido com sucesso!"};
              res.json(response);
            }
        })
      } else {
	        response = {"resultado": "Aluno já existente!"};
          res.json(response);
        }
    })
  });

router.route('/alunos/:ra')   // Operaçõess sobre um aluno (RA)
  .get(function(req, res) {   // GET
    if(checkAuth(req, res) == 'unauthorized') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"ra": req.params.ra};
    mongoOp.findOne(query, function(erro, data) {
        if(erro) response = {"resultado": "Falha de acesso ao BD!"};
      else if (data == null) response = {"resultado": "Aluno inexistente!"};
	      else response = {"alunos": [data]};
        res.json(response);
    })
  })
  .put(function(req, res) {   // PUT (altera)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"ra": req.params.ra};
    var data = {"nome": req.body.nome, "curso": req.body.curso};
    mongoOp.findOneAndUpdate(query, data, function(erro, data) {
        if(erro) response = {"resultado": "Falha de acesso ao DB!"};
	    else if (data == null) response = {"resultado": "Aluno inexistente!"};
        else response = {"resultado": "Aluno atualizado com sucesso!"};
        res.json(response);
    })
  })
  .delete(function(req, res) {   // DELETE (remove)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"ra": req.params.ra};
    mongoOp.findOneAndRemove(query, function(erro, data) {
        if(erro) response = {"resultado": "Falha de acesso ao DB!"};
	    else if (data == null) response = {"resultado": "Aluno inexistente!"};
        else response = {"resultado": "Aluno removido com sucesso!"};
        res.json(response)
    })
  });

router.route('/teste')
  .get(function(req, res) {
    var path = 'index2.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, {"root": "./"});
  });

router.route('/authentication')   // Autenticação
  .get(function(req, res) {       // GET
    var path = 'login.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, {"root": "./"});
  })
  .post(function(req, res) { 
    var user = req.body.user;
    var pass = req.body.pass;
    var query = {"usuario": user};
    mongoOp2.findOne(query, function(erro, data) {
        var achou = false;
        if(erro) response = {"resultado": "Falha de acesso ao BD!"};
      else if (data == null) response = {"resultado": "Aluno inexistente!"};
        else {
          response = {"usuarios": [data]};
          achou = true;
        }
        if (achou == true) {
          var userDB = (response.usuarios[0].usuario);
          var papelDB = (response.usuarios[0].papel);
          var passDB = (response.usuarios[0].password);
          // verifica usuario e senha na base de dados
          if(user == userDB && papelDB == 'user' && pass == passDB) { 
            var content = {"key":"secret", "role":"user", "nome": user};
            res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
            res.status(200).send('Sucesso');  // OK
          } else if(user == userDB && papelDB == 'admin' && pass == passDB) {
              var content =  {"key":"secret", "role":"admin", "nome": user};
              res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
              res.status(200).send('Sucesso');  // OK
            } else {
                res.status(401).send('Falha de autenticacao');   // unauthorized
              }
          } else res.status(401).send('Falha de autenticacao');   // unauthorized
      })
  })
  .delete(function(req, res) {
    if(checkAuth(req, res) != 'unauthorized') {
      res.clearCookie('userAuth');	 // remove cookie no cliente
      res.status(200).send('Sucesso');
    } else {
        res.status(401).send('Unauthorized');
        return;
      } 
  });

router.route('/cadastrar') 
  .get(function(req, res) {  // GET
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var path = 'cadastro.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, {"root": "./"});
  })
  .post(function(req, res) {   // POST (cria)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var query = {"usuario": req.body.usuario};
    var response = {};
    mongoOp2.findOne(query, function(erro, data) {
      if (data == null) {
        var db = new mongoOp2();
        db.usuario = req.body.usuario;
        db.papel = req.body.papel;
        db.password = req.body.password;
        db.save(function(erro) {
          if(erro) response = {"resultado": "Falha de acesso ao BD!"};
          else response = {"resultado": "Usuário inserido com sucesso!"};
          res.json(response);
         })
      } else {
          response = {"resultado": "Usuário já existente!"};
          res.json(response);
        }
    })
  });

router.route('/usuarios/:usuario')   // Operações sobre um aluno (RA)
 .get(function(req, res) {           // GET
  if(checkAuth(req, res) != 'admin') {
    res.status(401).send('Unauthorized');
    return;
  }  
  var response = {};
    var query = {"usuario": req.params.usuario};
    mongoOp2.findOne(query, function(erro, data) {
        if(erro) response = {"resultado": "Falha de acesso ao BD!"};
      else if (data == null) response = {"resultado": "Usuário inexistente!"};
        else response = {"usuarios": [data]};
        res.json(response);
    })
  })
 .put(function(req, res) {   // PUT (altera)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"usuario": req.params.usuario};
    var data = {"papel": req.body.papel, "password": req.body.password};
    mongoOp2.findOneAndUpdate(query, data, function(erro, data) {
        if(erro) response = {"resultado": "Falha de acesso ao DB!"};
      else if (data == null) response = {"resultado": "Usuário inexistente!"};
        else response = {"resultado": "Usuário atualizado com sucesso!"};
        res.json(response);  
    })
  }) 
 .delete(function(req, res) {   // DELETE (remove)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"usuario": req.params.usuario};
    mongoOp2.findOneAndRemove(query, function(erro, data) {
        if(erro) response = {"resultado": "Falha de acesso ao DB!"};
      else if (data == null) response = {"resultado": "Usuário inexistente!"};
        else response = {"resultado": "Usuário removido com sucesso!"};
        res.json(response);
    })
  });

router.route('/usuarios')     // Operações sobre todos os usuários
  .get(function(req, res) {   // GET
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    mongoOp2.find({}, function(erro, data) {
      if(erro) 
        response = {"resultado": "Falha de acesso ao BD!"};
      else
        response = {"usuarios": data};
        res.json(response);
    })
  })

module.exports = router;
