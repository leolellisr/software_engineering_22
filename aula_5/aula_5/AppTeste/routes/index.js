var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.route('/*') 
 .options(function(req, res) {  // OPTIONS
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Request-With');
   res.sendStatus(200);
   }
 );

// index.html
router.route('/')
 .get(function(req, res) {  // GET
   var path = 'index.html';
   res.header('Cache-Control', 'no-cache');
   res.sendFile(path, {"root": "./"});
   }
 );

// base de alunos (Hash Map)
var alunosMap = new Map();

router.route('/alunos')   // operacoes sobre todos os alunos
  .get(function(req, res) {  // GET
      var response = {"alunos": []};
      if (alunosMap.size == 0) {
       res.json(response);
       return;
      }
      for (var [key, value] of alunosMap) {
        response.alunos.push(value);
      }
      res.json(response);
      }
   )
  .post(function(req, res) {   // POST (cria)
      var aluno = req.body;
      var response = {};
      if(alunosMap.get(aluno.ra) == undefined) {
        alunosMap.set(aluno.ra, aluno);   // armazena JSON
        response = {"resultado": "aluno inserido"};
      } else response = {"resultado": "aluno ja existente"};
      res.json(response);
    }
 );

router.route('/alunos/:id')   // operacoes sobre um aluno (ID)
  .get(function(req, res) {   // GET
      var response = {};
      if(alunosMap.get(req.params.id) != undefined) 
         response = alunosMap.get(req.params.id);
      else response = {"resultado": "aluno inexistente"};
      res.json(response);   
      }
  )
  .put(function(req, res) {   // PUT (altera)
      var response = {};
      if(alunosMap.get(req.params.id) != undefined) {
         alunosMap.set(req.params.id, req.body);
         response = {"resultado": "aluno atualizado"};
      } else response = {"resultado": "aluno inexistente"};
      res.json(response);   
    }
  )
  .delete(function(req, res) {   // DELETE (remove)
      var response = {};
      if(alunosMap.get(req.params.id) != undefined) {
         alunosMap.delete(req.params.id);
         response = {"resultado": "aluno removido"};
      } else response = {"resultado": "aluno inexistente"};
      res.json(response);
    }
  );






module.exports = router;
