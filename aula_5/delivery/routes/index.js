var express = require('express');
var router = express.Router();
var fs = require('fs'); 

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

router.route('/alunos')   // operacoes sobre todos os alunos
  .get(function(req, res) {  // GET
    fs.readFile('./arquivo/estudantes.json', 'utf8', (err, data) => {
      if(err) {
        var response = {"resultado":err};
        res.json(response);
      }
      else {
        res.send(JSON.parse(data));
      }
  });
  }
  )

  .post(function(req, res) {   // POST (cria)
      var aluno = req.body;
      var response = {};

      fs.readFile('./arquivo/estudantes.json', 'utf8', function(err, data){
        if(err) {
          response = {"resultado": err};
          res.json(response);
        } else {
          var d = JSON.parse(data);
          if (d[aluno.ra] != undefined) {
            response = {"resultado": "aluno ja inserido"};
            res.json(response);
            return;
          }
          d[aluno.ra] = aluno;
          fs.writeFile("./arquivo/estudantes.json", JSON.stringify(d), function(err) {
          if (err) {
            response = {"resultado": err};
            res.json(response);
          } else {
            response = {"resultado": "aluno inserido com sucesso"};
            res.json(response);
          }
          });
        }
      }); 
    }
 );

router.route('/alunos/:id')   // operacoes sobre um aluno (ID)
  .get(function(req, res) {   // GET
    var response = {};
    fs.readFile('./arquivo/estudantes.json', 'utf8', function(err, data) {
      if(err) {
        response = {"resultado": err};
        res.json(response);
      } 
      else {
        var d = JSON.parse(data);
        var id = req.params["id"];
        if (d[id] != undefined) {
          response = d[id];
          res.json(response);
        }
        else {
          response = {"resultado": "aluno inexistente"};
          res.json(response);
        }
      }
    });  
  }
  )
  .put(function(req, res) {   // PUT (altera)
    var response = {};
    fs.readFile('./arquivo/estudantes.json', 'utf8', function(err, data) {
      if(err) {
        response = {"resultado": err};
      } 
      else {
        var d = JSON.parse(data);
        var id = req.params["id"];
        if (d[id] != undefined) {
          d[id] = req.body;
          response = {"resultado": "aluno atualizado"};
          res.json(response);
        }
        else {
          response = {"resultado": "aluno inexistente"};
          res.json(response);
        }
        fs.writeFile('./arquivo/estudantes.json', JSON.stringify(d), function(err) {
          if (err) {
            response = {"resultado": err};
            res.json(response);
          }
        });
      }
      });
    }
  )
  .delete(function(req, res) {   // DELETE (remove)
      var response = {};
      fs.readFile('./arquivo/estudantes.json', 'utf8', function(err, data) {
        if(err) {
          response = {"resultado": err};
          res.json(response);
        } else {
          var d = JSON.parse(data);
          var id = req.params["id"];
          if (d[id] == undefined) {
            response = {"resultado": "aluno inexistente"};
            res.json(response);
          }
          else {
            delete d[id];
            response = {"resultado": "aluno removido"};
            res.json(response);
          }
          fs.writeFile('./arquivo/estudantes.json', JSON.stringify(d), function(err) {
            if (err) {
              response = {"resultado": err};
              res.json(response);
            }
          });
        }
      });
    }
  );
 


module.exports = router;
