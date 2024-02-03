Caso de Uso: Autenticação de Usuários e Criação de conta

Caio Ruiz Coldebella
RA: 232621

Neste caso de uso o usuário tem a opção de fazer um login da sua conta no sistema a partir da página inicial, 
e apartir da página de login ele pode criar uma nova conta e alterar a senha dessa nova conta posteriormente.

As pré condições necessárias para a implementação desse caso de uso são a existência do index.js, além do index.html.

O banco de dados é descrito da seguinte maneira:

{
    "nome" : String
    "senha" : String
    "email" : String
    "telefone" : String
    "IDpassagens" : []
}

Para a execução do código, deve-se entrar na pasta /uc1/AppTransporte/ e executar o arquivo start.sh
Caso não esteja instalada a rede ea202 é necessário primeiramente executar install.sh
