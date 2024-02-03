var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOp = require('../models/mongo');



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

function sendIndexFile(req, res) {  // GET
  var path = 'index.html';
  res.header('Cache-Control', 'no-cache');
  res.sendFile(path, {"root": "./"});
  }

function getAlunos(req, res) {  // GET
    if(checkAuth(req, res) == 'unauthorized') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    mongoOp.find({}, function(erro, data) {
      if(erro)
         response = {"resultado": "falha de acesso ao BD"};
      else
         response = {"alunos": data};
       res.json(response);
       }
     )
}

function createAluno(req, res) {   // POST (cria)
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
                response = {"resultado": "falha de acesso ao BD"};
                res.json(response);
            } else {
                response = {"resultado": "aluno inserido"};
                res.json(response);
            }
          }
         )
       } else {
        response = {"resultado": "aluno ja existente"};
        res.json(response);
       }
       }
     )
}   

function getAluno(req, res) {   // GET
    if(checkAuth(req, res) == 'unauthorized') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"ra": req.params.ra};
    mongoOp.findOne(query, function(erro, data) {
       if(erro) response = {"resultado": "falha de acesso ao BD"};
       else if (data == null) response = {"resultado": "aluno inexistente"};
       else response = {"alunos": [data]};
       res.json(response);
      }
    )
}   

function alteraAluno(req, res) {   // PUT (altera)
    if(checkAuth(req, res) != 'admin') {
      res.status(401).send('Unauthorized');
      return;
    }
    var response = {};
    var query = {"ra": req.params.ra};
    var data = {"nome": req.body.nome, "curso": req.body.curso};
    mongoOp.findOneAndUpdate(query, data, function(erro, data) {
       if(erro) response = {"resultado": "falha de acesso ao DB"};
       else if (data == null) response = {"resultado": "aluno inexistente"};
       else response = {"resultado": "aluno atualizado"};
       res.json(response);
     }
    )
}

function deletaAluno(req, res) {   // DELETE (remove)
  if(checkAuth(req, res) != 'admin') {
     res.status(401).send('Unauthorized');
     return;
  }
  var response = {};
  var query = {"ra": req.params.ra};
   mongoOp.findOneAndRemove(query, function(erro, data) {
      if(erro) response = {"resultado": "falha de acesso ao DB"};
      else if (data == null) response = {"resultado": "aluno inexistente"};
      else response = {"resultado": "aluno removido"};
      res.json(response)
      }
    )
}

function getLoginPage(req, res) {  // GET
    var path = 'login.html';
    res.header('Cache-Control', 'no-cache');
    res.sendFile(path, {"root": "./"});
}

function verifyUserCredentials(req, res) { 
      var user = req.body.user;
      var pass = req.body.pass;
      // verifica usuario e senha na base de dados
      if(user == 'ea202' && pass == 'unicamp') {
          var content =  {"key":"secret", "role":"user"};
	        res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
	        res.status(200).send('Sucesso');  // OK
      } else if(user == 'root' && pass == 'campinas') {
          var content =  {"key":"secret", "role":"admin"};
	        res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
 	        res.status(200).send('Sucesso');  // OK
      } else {
	        res.status(401).send('Falha de autenticacao');   // unauthorized
      }
}    

function logoutCurrentUser(req, res) {
      if(checkAuth(req, res) != 'unauthorized') {
        res.clearCookie('userAuth');	 // remove cookie no cliente
        res.status(200).send('Sucesso');
      } else {
         res.status(401).send('Unauthorized');
         return;
      } 
}    

// codigo abaixo adicionado para o processamento das requisições
// HTTP GET, POST, PUT, DELETE

// index.html
router.route('/') 
 .get(sendIndexFile);

router.route('/alunos')   // operacoes sobre todos os alunos
  .get(getAlunos)
  .post(createAluno);

router.route('/alunos/:ra')   // operacoes sobre um aluno (RA)
  .get(getAluno)
  .put(alteraAluno)
  .delete(deletaAluno);

router.route('/authentication')   // autenticação
  .get(getLoginPage)
  .post(verifyUserCredentials)
  .delete(logoutCurrentUser);

module.exports = router;
