var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOp = require('../models/mongo');
var mongoOp2 = require('../models/mongo2');

// codigo abaixo adicionado para o processamento das requisições
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
   }
 );

router.route('/alunos')   // operacoes sobre todos os alunos
 .get(function(req, res) {  // GET
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
  )
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
  );


router.route('/alunos/:ra')   // operacoes sobre um aluno (RA)
  .get(function(req, res) {   // GET
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
  )
  .put(function(req, res) {   // PUT (altera)
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
  )
  .delete(function(req, res) {   // DELETE (remove)
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
  );

router.route('/authentication')   // autenticação
  .get(function(req, res) {  // GET
     var path = 'login.html';
     res.header('Cache-Control', 'no-cache');
     res.sendFile(path, {"root": "./"});
     }
  )
  .post(function(req, res) { 
      // verifica usuario e senha na base de dados
      var query = {"user": req.body.user, "pass": req.body.pass};
      mongoOp2.findOne(query, function(erro, data) {
        if (data == null) {
           res.status(401).send('Falha de autenticacao');
        } else {
	    var content =  {"user": data.user,"key":"secret", "role": data.cargo};
	    res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
 	    res.status(200).send('Sucesso');
          }
      })
    }
  )
  .delete(function(req, res) {
      if(checkAuth(req, res) != 'unauthorized') {
        res.clearCookie('userAuth');	 // remove cookie no cliente
        res.status(200).send('Sucesso');
      } else {
         res.status(401).send('Unauthorized');
         return;
      } 
    }
  );

router.route('/registrationPage')   // autenticação
  .get(function(req, res) {  // GET
     var path = 'register.html';
     res.header('Cache-Control', 'no-cache');
     res.sendFile(path, {"root": "./"});
     }
  );
  
router.route('/CSS/main.css')
 .get(function(req, res) {  // GET
   var path = 'CSS/main.css';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );
  
router.route('/registration')   // autenticação
  .get(function(req, res) {  // GET
     if(checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');
       return;
     }
     var response = {};
     mongoOp2.find({}, function(erro, data) {
       if(erro)
          response = {"resultado": "Falha de acesso ao BD"};
       else
          response = {"users": data, "resultado": "Lista de usuários"};
          res.json(response);
        }
      )
    }
  )
  .post(function(req, res) { 
      if(checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');
       return;
      }
      var user = req.body.user;
      var pass = req.body.pass;
      var cargo = req.body.cargo;
      var response = {};
      var query = {"user": req.body.user};
      mongoOp2.findOne(query, function(erro, data) {
        if (data == null) {
           var db = new mongoOp2();
           db.user = req.body.user;
           db.pass = req.body.pass;
           db.cargo = req.body.cargo;
           db.save(function(erro) {
             if(erro) {
                 response = {"resultado": "Falha de acesso ao BD"};
                 res.json(response);
             } else {
                 response = {"resultado": "Usuário inserido"};
                 res.json(response);
              }
            }
          )
        } else {
	    response = {"resultado": "Usuário ja existente"};
            res.json(response);
          }
        })
    }
  )
  .put(function(req, res) {   // PUT (altera)
       if(checkAuth(req, res) != 'admin') {
         res.status(401).send('Unauthorized');
         return;
      }
      var response = {};
      var query = {"user": req.body.user};
      var data = {"nome": req.body.nome, "pass": req.body.pass, "cargo": req.body.cargo};
      mongoOp2.findOneAndUpdate(query, data, function(erro, data) {
          if(erro) response = {"resultado": "Falha de acesso ao DB"};
	  else if (data == null) response = {"resultado": "Usuário inexistente"};
          else response = {"resultado": "Usuário atualizado"};
          res.json(response);
        }
      )
    }
  )
  .delete(function(req, res) {   // DELETE (remove)
     if(checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');
       return;
     }
     var response = {};
     var query = {"user": req.body.user, "pass": req.body.pass};
      mongoOp2.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "Falha de acesso ao DB"};
	 else if (data == null) response = {"resultado": "Usuário inexistente"};
         else response = {"resultado": "Usuário removido"};
         res.json(response)
         }
       )
     }
  );

module.exports = router;
