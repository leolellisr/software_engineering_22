/*Cria a data que vai ser colocada na parte principal*/
var d = new Date();
document.getElementById("data_local").innerHTML = d;

/*Verifica se a entrada é composta só de letras*/ 
function soLetras(event) {
    return (event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123);
}

/*Verifica se a entrada é composta só de numeros*/
function soNumeros (event) {
    return (event.charCode > 47 && event.charCode < 58);
}

/*Verifica se o formulário foi preenchido corretamente e "envia" ele */
function validarFormulario(){
    
    /*Cria uma variavel para cada campo a ser preenchido no forms*/
    var nome = document.forms["formulario"]["name"].value;
    var dataNascimento = document.forms["formulario"]["data"].value;
    var numRa = document.forms["formulario"]["ra"].value;
    var naturalidadePessoa = document.forms["formulario"]["naturalidade"].value;
    var cursoPessoa = document.forms["formulario"]["curso"].value;
    var universidadePessoa = document.forms["formulario"]["universidade"].value;
    var semestrePessoa = document.forms["formulario"]["semestre"].value;
    
    /*Verifica se o campo nao esta vazio*/
    if (nome == "") {
        alert("O campo Nome não pode ficar em branco");
        return false;     
    }
    if (dataNascimento == "") {
        alert("O campo 'Data de Nascimento' não pode ficar em branco");
        return false;     
    }
    if (numRa == "") {
        alert("O campo RA não pode ficar em branco");
        return false;     
    }
    if (naturalidadePessoa == "") {
        alert("O campo Naturalidade não pode ficar em branco");
        return false;     
    }
    if (cursoPessoa == "") {
        alert("O campo Curso não pode ficar em branco");
        return false;     
    }
    if (universidadePessoa == "") {
        alert("O campo Universidade não pode ficar em branco");
        return false;     
    }
    if (semestrePessoa == "") {
        alert("O campo Semestre não pode ficar em branco");
        return false;     
    }
    else{
        alert("Formulário submetido com sucesso");
        return true;
    }
}