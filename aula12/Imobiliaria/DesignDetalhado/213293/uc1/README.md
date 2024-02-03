## Caso de Uso 1

Responsável: Arthur Nogueira - 213293

Funcionalidade: Cadastro de Imóveis

Nesse caso de uso, o usuário pode cadastrar um imóvel no catálogo da imobiliária para aluguel ou compra

## Design das Interfaces Gráficas

O grupo optou por seguir a seguinte paleta de cores durante o desenvolvimento dos casos de uso: [Paleta de Cores](https://www.schemecolor.com/purple-blue.php)

A fonte utilizada foi a ```Montserrat```

## Pré-condições necessárias

As pré-condições necessárias para esse caso de uso são:

* index.html: implementa página inicial que direciona o usuário para a página responsável pela inicialização do caso de uso
* index.js: implementa funções necessárias para funcionamento correto do caso de uso



## Design do Banco de Dados

O banco de dados é implementado da seguinte maneira:

```
{
  adress: String,
  size: Number,
  furnished: Boolean,
  price: Number,
}
```

Abaixo, segue o diagrama de classes que implementa o banco de dados:

![Diagrama de Classes 1 213293](aula12/Imobiliaria/DesignDetalhado/213293/uc1/assets/BancodeDados_uc1.png)

## Design do Repertório de Objetos

O diagrama que representa o design do repertório de objetos:

![Repertório de Objetos 1 213293](aula12/Imobiliaria/DesignDetalhado/213293/uc1/assets/RepertorioObjetos_uc1.png)

## Execução do Caso de Uso

Para executar esse caso de uso, é necessário que o usuário execute os seguntes comandos:

```
  cd App
  chmod ugo+x mongo.sh node.sh start.sh
  ./start
```

E acessar a URL:

```
  http://localhost:3000/
```

Ao clicar em `Cadastrar Imóvel`, o usuário é direcionado para a página que executa o caso de uso uc1.

## Prints de Tela do Aplicativo

![Pagina Menu1 213293](aula12/Imobiliaria/DesignDetalhado/213293/uc1/assets/pagina_menu_1.png)
![Pagina Cadastro Imovel 213293](aula12/Imobiliaria/DesignDetalhado/213293/uc1/assets/pagina_cadastro_imovel.png)
