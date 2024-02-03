var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

var mongoOpAlunos = require('../models/mongo');
var mongoOpUsuarios = require('../models/mongo-usuarios');

function checkAuth(req, res) {
  cookies = req.cookies;
  console.log(cookies);
  if(!cookies || !cookies.userAuth)
    return 'unauthorized';
  cauth = cookies.userAuth;
  var content = JSON.parse(cauth);
  var nome = content.nome;
  var papel = content.papel;
  if (papel == 'admin')
    return papel;
  if (papel == 'user')
    return nome;
  return 'unauthorized';
}

function checkAuthNome(req, res) {
  cookies = req.cookies;
  console.log(cookies);
  if(!cookies || !cookies.userAuth)
    return 'unauthorized';
  cauth = cookies.userAuth;
  var content = JSON.parse(cauth);
  return content.nome;
}

// codigo abaixo adicionado para o processamento das requisições
// HTTP GET, POST, PUT, DELETE

// index.html
router.route('/') 
 .get(function(req, res) {  // GET
   var path = 'index.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
 }
 );

// GET LOGIN
router.route('/get-login')
 .get(function(req, res) {  // GET
   cookies = req.cookies;
   var response = '';
   if(cookies && cookies.userAuth) {
      var content = JSON.parse(cookies.userAuth);
      response = {"nome":content.nome, "papel":content.papel};
   }
   res.json(response);
 }
 );

router.route('/alunos')      // operacoes sobre todos os alunos
 .get(function(req, res) {   // GET
     if(checkAuth(req, res) == 'unauthorized') {
       res.status(401).send('Unauthorized');
       return;
     }
     var response = {};
     mongoOpAlunos.find({}, function(erro, data) {
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
     mongoOpAlunos.findOne(query, function(erro, data) {
        if (data == null) {
           var db = new mongoOpAlunos();
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
      mongoOpAlunos.findOne(query, function(erro, data) {
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
      mongoOpAlunos.findOneAndUpdate(query, data, function(erro, data) {
          if(erro) response = {"resultado": "falha de acesso ao BD"};
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
     mongoOpAlunos.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "aluno inexistente"};
         else response = {"resultado": "aluno removido"};
         res.json(response)
         }
       )
     }
  );

router.route('/authentication')   // autenticação
  .get(function(req, res) {       // GET
     var path = 'login.html';
     res.header('Cache-Control', 'no-cache');
     res.sendFile(path, {"root": "./"});
     }
  )
  .post(function(req, res) { 
      var user = req.body.user;
      var pass = req.body.pass;
      if (user == 'admin') {
          res.status(401).send('Proibido usar o nome "admin"');   // unauthorized
          return;
      }
      // verifica usuario e senha na base de dados
      var query = {'nome': user, 'senha': pass};
      mongoOpUsuarios.findOne(query, function(erro, data) {
          if(!erro && data) {
              var content = {"nome":data.nome, "papel":data.papel};
              res.cookie('userAuth', JSON.stringify(content), {'maxAge': 3600000*24*5});
              res.status(200).send('Sucesso');
          }
          else {
              res.status(401).send('Erro de autenticação');   // unauthorized
          }
      }
      )
    }
  )
  .delete(function(req, res) {
      if (checkAuth(req, res) != 'unauthorized') {
         res.clearCookie('userAuth');	 // remove cookie no cliente
         res.status(200).send('Sucesso');
         return;
      }
      else {
         res.status(401).send('Falha de logout');
         return;
      } 
    }
  );

router.route('/usuarios_window')   // gerenciamento de usuarios
  .get(function(req, res) {        // GET
     var path = 'usuarios.html';
     res.header('Cache-Control', 'no-cache');
     res.sendFile(path, {"root": "./"});
     }
  );

router.route('/usuarios')   // operacoes sobre todos os usuarios
 .get(function(req, res) {  // GET
     if (checkAuth(req, res) != 'admin') {    // só um admin pode pesquisar a base de dados inteira de usuários
       res.status(401).send('Unauthorized');
       return;
     }
     var response = {};
     mongoOpUsuarios.find({}, function(erro, data) {
       if (erro)
          response = {"resultado": "falha de acesso ao BD"};
       else
          response = {"usuarios": data};
       res.json(response);
     }
     )
  }
  )
  .post(function(req, res) {   // POST (cria)
     if (req.body.papel == 'admin' && checkAuth(req, res) != 'admin') {
       res.status(401).send('Unauthorized');    // só um admin pode criar outro admin
       return;
     }
     if (req.body.nome == 'admin') {    // é proibido usar o nome 'admin'
       res.status(401).send('Unauthorized');
       return;
     }
     var query = {"nome": req.body.nome};
     var response = {};
     mongoOpUsuarios.findOne(query, function(erro, data) {
        if (data == null) {
           var db = new mongoOpUsuarios();
           db.nome = req.body.nome;
           db.senha = req.body.senha;
           db.papel = req.body.papel;
           db.save(function(erro) {
             if(erro) {
                 response = {"resultado": "falha de acesso ao BD"};
                 res.json(response);
             } else {
                 response = {"resultado": "usuário inserido"};
                 res.json(response);
             }
           }
           )
        }
        else {
	       response = {"resultado": "usuário já existente"};
           res.json(response);
        }
     }
     )
  }
  );


router.route('/usuarios/:nome')   // operacoes sobre um usuário
  .get(function(req, res) {       // GET
      var check = checkAuth(req, res);
      if(check != 'admin' && check != req.params.nome) {    // só um admin ou o próprio usuário pode pesquisar um usuário
        res.status(401).send('Unauthorized');
        return;
      }
      var response = {};
      var query = {"nome": req.params.nome};
      mongoOpUsuarios.findOne(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "usuário inexistente"};
         else response = {"usuarios": [data]};
         res.json(response);
      }
      )
  }
  )
  .put(function(req, res) {   // PUT (altera a senha)
      var check = checkAuth(req, res);
      if(check != 'admin' && check != req.params.nome) {    // só um admin ou o próprio usuário pode alterar a senha de um usuário
         res.status(401).send('Unauthorized');
         return;
      }
      var response = {};
      var query = {"nome": req.params.nome};
      var data = {"senha": req.body.senha, "papel": req.body.papel};
      mongoOpUsuarios.findOneAndUpdate(query, data, function(erro, data) {
          if(erro) response = {"resultado": "falha de acesso ao BD"};
          else if (data == null) response = {"resultado": "usuário inexistente"};
          else response = {"resultado": "usuário atualizado"};
          res.json(response);
      }
      )
  }
  )
  .delete(function(req, res) {   // DELETE (remove)
     var check = checkAuth(req, res);
     if(check != 'admin' && check != req.params.nome) {     // só um admin ou o próprio usuário pode deletar um usuário
        res.status(401).send('Unauthorized');
        return;
     }
     var response = {};
     if (checkAuthNome(req, res) == req.params.nome)     // se um admin ou usuário está se deletando...
        res.clearCookie('userAuth');     // ... então remove cookie
     var query = {"nome": req.params.nome};
     mongoOpUsuarios.findOneAndRemove(query, function(erro, data) {
         if(erro) response = {"resultado": "falha de acesso ao BD"};
         else if (data == null) response = {"resultado": "usuário inexistente"};
         else response = {"resultado": "usuário removido"};
         res.json(response)
     }
     )
  }
  );

module.exports = router;
