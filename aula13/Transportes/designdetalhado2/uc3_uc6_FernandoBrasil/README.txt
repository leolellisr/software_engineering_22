Casos de uso #3 e #6: Inclusão e exclusão de viagens e de rodoviárias de origem e destino no banco de dados

Aluno: Fernando Brasil Sales
RA: 265268





Para iniciar a aplicação: execute o comando "./server.sh" na pasta da aplicação. Após terminada a inicialização do servidor, abra uma janela do navegador de internet na página "http://localhost:3000/". Clique no link "Incluir e excluir viagens".

Para pausar o servidor: na janela do Terminal, digite CTRL C no teclado. Isso não destrói o banco de dados.

Para reiniciar o servidor após ser pausado: no Terminal, execute o comando "./start.sh".

Para parar o servidor e o banco de dados: na janela do Terminal, digite CTRL C no teclado. Em seguida, execute o comando "./stop.sh". Isso não destrói o banco de dados. Para reiniciar o servidor e o banco de dados, execute o comando "./server.sh".



Instruções de uso da página de inclusão e exclusão de viagens:

É preciso estar logado como administrador para poder manipular o banco de dados de viagens. Clique nos botões "Login como admin" e "Logout" para fazer login como administrador e fazer logout, respectivamente.

Manipule o banco de dados por meio dos botões "Pesquisar", "Limpar", "Incluir viagem" e "Excluir viagem".

Antes de usar o banco de dados de viagens pela primeira vez, é preciso incluir rodoviárias de origem e destino. Para isso, clique no botão "Cadastrar rodoviárias", isso deverá abrir uma nova janela "Cadastro de rodoviárias". Nessa janela, preencha o campo "Rodoviária" e em seguida clique em "INSERE". Repita este procedimento para todas as rodoviárias que se deseja incluir no banco de dados. O botão "ACESSA" exibe uma tabela com todas as rodoviárias já cadastradas, com um botão "REMOVE" à direita de cada rodoviária caso se deseje excluir uma rodoviária específica. Após terminar, feche a janela "Cadastro de rodoviárias". De volta à janela "Inclusão e exclusão de viagens", clique no botão "Obter rodoviárias" para importar as rodoviárias cadastradas.

Para pesquisar por todas as viagens, clique em "Limpar" e depois em "Pesquisar". Isso irá gerar uma tabela com o resultado da pesquisa. Essa tabela inicialmente é ordenada pelo "Id da viagem" de forma decrescente, mas pode ser ordenada por qualquer coluna bastando para isso clicar na coluna desejada na primeira linha.

Para pesquisar por uma viagem específica, primeiro preencha o campo "Id da viagem" e em seguida clique em "Pesquisar".

Para incluir uma nova viagem, primeiro apague o campo "Id da viagem" (ou, alternativamente, digite o "Id da viagem" desejado, mas isso em geral não é recomendável). Em seguida, preencha todos os demais campos e clique em "Incluir viagem".

Para excluir uma viagem, há duas maneiras distintas: 1) preencha o campo "Id da viagem" e em seguida clique em "Excluir viagem"; ou 2) pesquise por todas as viagens ou por uma viagem específica, isso irá gerar uma tabela caso alguma viagem seja encontrada, em seguida clique no botão "Excluir viagem" do lado direito da viagem a ser excluída na tabela.





Exemplo do banco de dados após a inclusão de duas viagens, a primeira viagem com 3 passagens (poltronas) disponíveis, a segunda viagem com 5 passagens disponíveis:

{ [

    { "passagens": [ { "idPassagem": "1P1", "ocupado": false },
                     { "idPassagem": "1P2", "ocupado": false },
                     { "idPassagem": "1P3", "ocupado": false } ],
      "idViagem": 1,
      "qtdePassagens": 3,
      "origem": "Campinas - SP",
      "destino": "Sao Paulo - SP",
      "partida": "2021-12-20T15:30",
      "chegada": "2021-12-20T17:00"
    },

    { "passagens": [ { "idPassagem": "2P1", "ocupado": false },
                     { "idPassagem": "2P2", "ocupado": false },
                     { "idPassagem": "2P3", "ocupado": false },
                     { "idPassagem": "2P4", "ocupado": false },
                     { "idPassagem": "2P5", "ocupado": false } ],
      "idViagem": 2,
      "qtdePassagens": 5,
      "origem": "Rio de Janeiro - RJ",
      "destino": "Salvador - BA",
      "partida": "2021-12-01T08:00",
      "chegada": "2021-12-02T08:00"
    }

] }

Nos campos partida e chegada, temos as datas no formato ano-mês-dia, em seguida a letra "T", e por fim hora:minuto.

Cada poltrona possui uma string "idPassagem" que é composta de: um número que identifica a viagem (idViagem), em seguida a letra "P" (de poltrona), por fim o número da poltrona. Por exemplo, "2P5" corresponde à poltrona número 5 da viagem número 2.

Quando um cliente compra uma passagem (em outro caso de uso, não coberto aqui), o boolean "ocupado" relativo àquela poltrona muda de false para true. E aquela passagem é incorporada aos dados do cliente que a comprou. Os dados dos clientes estão em outra coleção do banco de dados, em outro caso de uso.
