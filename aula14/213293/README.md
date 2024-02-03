### Atividade 7 e 14
Arthur Nogueira 213293

Para rodar a aplicação basta digitar ```./start.sh``` no terminal
Com o app funcionando em segundo plano digite os comandos
```./insertuser.sh <usuário> <papel> <password>```
para inserir novos usuários e
```./cypress.sh```
para rodar os testes

login_spec.js -> Testa um login válido
wlogin_spec.js -> Testa um login inválido
naccess_spec.js -> Testa um acesso não autorizado
newaluno_spec.js -> Testa a criaação de um novo aluno no catálogo
updatealuno_spec.js -> Testa a atualização do curso de um aluno
registe_spec.js -> testa o registro de um novo user
samealuno_spec.js -> Testa a criação de um cadastro já existente