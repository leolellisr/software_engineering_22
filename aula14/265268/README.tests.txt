01_Teste_de_login_1.spec.js:

- Visitando o servidor: abre a página inicial
- Teste de login: faz login como administrador e verifica a mensagem de sucesso



02_Teste_de_login_2.spec.js:

- Visitando o servidor: abre a página inicial
- Teste de login: tenta fazer login como administrador usando a senha errada e verifica a mensagem de erro



03_Tentativa_de_cadastro_de_usuario_com_nome_proibido.spec.js:

- Login como administrador: faz login como administrador e verifica a mensagem de sucesso
- Confirmação do login: clica no botão "Logado como" e confirma que está logado com poderes de administrador
- Tentativa de cadastro de um novo usuário com nome proibido: tenta cadastrar um novo usuário com o username "admin", o que é proibido, e verifica a mensagem de erro
- Tentativa de cadastro de um novo administrador com nome proibido: tenta cadastrar um novo administrador com o username "admin", o que é proibido, e verifica a mensagem de erro



04_Cadastro_e_remocao_de_usuario.spec.js:

- Confirmação de não logado: clica no botão "Logado como" e confirma que não está logado
- Cadastro de um novo usuário: cadastra um novo usuário e verifica a mensagem de sucesso, em seguida clica o botão "ACESSA" e verifica que não está autenticado ou não está autorizado
- Login como o novo usuário: faz login como o novo usuário e verifica a mensagem de sucesso
- Confirmação do login: clica no botão "Logado como" e confirma que está logado como o novo usuário
- Remoção do novo usuário: o novo usuário se auto-deleta, e ao fazer isso ele sofre logout automaticamente pois não é permitido continuar logado como um usuário que não existe mais na base de dados
- Confirmação de não logado: clica no botão "Logado como" e confirma que não está mais logado



05_Cadastro_e_remocao_de_administrador.spec.js:

- Login como administrador: faz login como administrador e verifica a mensagem de sucesso
- Confirmação do login: clica no botão "Logado como" e confirma que está logado com poderes de administrador
- Cadastro de um novo administrador: cadastra um novo administrador e verifica a mensagem de sucesso, em seguida clica o botão "ACESSA" e verifica na tabela exibida o novo administrador
- Remoção do novo administrador: clica o botão "REMOVE" na tabela para remover o novo administrador e verifica a mensagem de sucesso, em seguida clica o botão "ACESSA" e verifica que aquele administrador deletado não existe mais na base de dados
- Confirmação do login: clica no botão "Logado como" e confirma que ainda está logado com a mesma conta que estava no início



06_Cadastro_e_remocao_de_aluno.spec.js:

- Confirmação de não logado: clica no botão "Logado como" e confirma que não está logado
- Tentativa #1 de cadastro de um novo aluno: tenta cadastrar um novo aluno, mas como não está logado recebe uma mensagem de erro
- Cadastro de um novo usuário: cadastra um novo usuário e verifica a mensagem de sucesso
- Login como o novo usuário: faz login como o novo usuário e verifica a mensagem de sucesso
- Confirmação do login: clica no botão "Logado como" e confirma que está logado como o novo usuário
- Tentativa #2 de cadastro de um novo aluno: tenta cadastrar um novo aluno, mas como está logado sem poderes de administrador recebe uma mensagem de erro
- Login como administrador: faz login como administrador e verifica a mensagem de sucesso
- Confirmação do login: clica no botão "Logado como" e confirma que está logado com poderes de administrador
- Cadastro de um novo aluno: cadastra um novo aluno e verifica a mensagem de sucesso
- Remoção do novo aluno: pesquisa pelo novo aluno, clica o botão "REMOVE" para removê-lo e verifica a mensagem de sucesso
- Remoção do novo usuário: pesquisa pelo novo usuário, clica o botão "REMOVE" para removê-lo e verifica a mensagem de sucesso
