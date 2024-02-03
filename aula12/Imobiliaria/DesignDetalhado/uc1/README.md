## Caso de Uso 1

Responsável: Giulia Steck - 173458

Funcionalidade: Cadastro de Usuários

Nesse caso de uso, o usuário pode realizar um cadastro no sistema da imobiliária, de forma a poder obter um login e uma senha para acessar todas as funcionalidades do sistema

## Design das Interfaces Gráficas

O grupo optou por seguir a seguinte paleta de cores durante o desenvolvimento dos casos de uso: [Paleta de Cores](https://www.schemecolor.com/purple-blue.php)

A fonte utilizada foi a ```Montserrat```

## Pré-condições necessárias

As pré-condições necessárias para esse caso de uso são:

* index.html: implementa página inicial que direciona o usuário para a página responsável pela inicialização do caso de uso
* index.js: implementa funções necessárias para funcionamento correto do caso de uso

obs: A página /cadastro possui um link "Fazer Login", que direciona para a página /login, que nesse caso de uso ainda não é implementada. Entretanto, o arquivo login.html não é colocado como pré-condição necessária uma vez que esse aspecto não prejudica o funcionamento desse caso de uso.

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

![Diagrama de Classes 1 173458](aula12/Imobiliaria/DesignDetalhado/uc1/assets/BancodeDados_uc1.png)

## Design do Repertório de Objetos

O diagrama que representa o design do repertório de objetos:

![Repertório de Objetos 1 173458](aula12/Imobiliaria/DesignDetalhado/uc1/assets/RepertorioObjetos_uc1.png)

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

Ao clicar em `Realizar Cadastro`, o usuário é direcionado para a página que executa o caso de uso uc1.

## Prints de Tela do Aplicativo

![Pagina Menu1 173458](aula12/Imobiliaria/DesignDetalhado/uc1/assets/pagina_menu_1.png)
![Pagina Cadastro 173458](aula12/Imobiliaria/DesignDetalhado/uc1/assets/pagina_cadastro.png)
