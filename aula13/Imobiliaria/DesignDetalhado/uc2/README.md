## Caso de Uso 2

Responsável: Giulia Steck - 173458

Funcionalidade:  Autenticação de Usuários

Nesse caso de uso, o usuário pode logar no sistema com a senha e usuária criados no caso de uso 1, além de poder alterar sua senha.

## Design das Interfaces Gráficas

O grupo optou por seguir a seguinte paleta de cores durante o desenvolvimento dos casos de uso: [Paleta de Cores](https://www.schemecolor.com/purple-blue.php)

A fonte utilizada foi a ```Montserrat```

## Pré-condições necessárias

As pré-condições necessárias para esse caso de uso são:

* index.html: implementa página inicial que direciona o usuário para a página responsável pela inicialização do caso de uso
* index.js: implementa funções necessárias para funcionamento correto do caso de uso
* cadastro.html: página responsável por viabilizar que usuário crie sua conta para posteriormente realizar o login

## Design do Banco de Dados

O banco de dados é implementado da seguinte maneira:

```
{
  name: String,
  age: Number,
  rg: Number,
  cpf: Number,
  email: String,
  phone: Number,
  user: String,
  password: String,
}
```

Abaixo, segue o diagrama de classes que implementa o banco de dados:

![Diagrama de Classes2 173458](aula13/Imobiliaria/DesignDetalhado/uc2/assets/BancodeDados_uc2.png)

## Design do Repertório de Objetos

O diagrama que representa o design do repertório de objetos:

![Repertório de Objetos2 173458](aula13/Imobiliaria/DesignDetalhado/uc2/assets/RepertorioObjetos_uc2.png)

## Execução do Caso de Uso

Para executar esse caso de uso, é necessário que o usuário execute os seguntes comandos:

```
  cd App
  chmod ugo+x mongo.sh node.sh start.sh
  ./start
```

E, em seguida, digitar o seguinte na URL de seu navegador de preferência:

```
  http://localhost:3000/
```

Ao clicar em `Fazer Login`, o usuário é direcionado para a página que executa o caso de uso uc2. Caso ainda não possua um cadastro no site, é necessário que ele selecione antes `Realizar Cadastro` para, então, autenticar-se.

## Prints de Tela do Aplicativo

![Pagina Menu2 173458](aula13/Imobiliaria/DesignDetalhado/uc2/assets/pagina_menu.png)
![Pagina Login 173458](aula13/Imobiliaria/DesignDetalhado/uc2/assets/pagina_login.png)
![Pagina Alterar 173458](aula13/Imobiliaria/DesignDetalhado/uc2/assets/pagina_alterarsenha.png)
