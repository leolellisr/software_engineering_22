Responsável: Auguto Piato Amstalden
R.A.: 213364
Inicialização do caso de uso:
        Para rodar e testar o  caso de uso, primeiro é necessário  ter completado o caso de uso 5,
    ou seja,  é necessário  que  uma comanda já tenha  sido criada e  inserida no sistema, e que o 
    usuário já esteja na página de edição de comanda.  Para  tal, pode-se apenas  seguir os passos
    de criação  de comanda e edição instruidos.
        Tendo  feito  isso,  é  agora  necessário  rodar  os arquivos executáveis "insertPrat.sh", 
    "insertSobre.sh" e "insertBeb.sh",  com dados de entrada na seguinte ordem: nome do produto  e
    preco do  produto (sendo que a  separação de casas  decimais do peso deve ser feito utilizando
    "."). Cada um  desses arquivos irá inserir manualmente itens no cardápio utilizado, por onde o
    sistema irá mostrar os itens que podem ser adicionados na comanda.
        Finalmente, para de fato testar o caso de uso, basta escolher entre as três categorias  de
    produtos na  tela de  edição de comanda,  com  isso o sistema  irá mostrar  uma lista de itens
    presentes,  sendo que para  adicionar algum deles à comanda  basta  apertar o botão "Adicionar 
    Item" ao lado do desejado.
        Se o item adicionado aparecer imediatamente na  lista de itens da comanda no lado esquerdo
    da interface significa que o caso de uso foi um sucesso, caso contrário, houve algum erro.