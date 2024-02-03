document.getElementById("enviar").addEventListener("click", validaformulario); 

function validaformulario(){

  var name_test = document.getElementById("name_input").value;
  var name_re = new RegExp("^[a-zA-Z][a-zA-Z\\s]*$");

  var birth_test = document.getElementById("birth_input").value;
  var birth_re = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

  var ra_test = document.getElementById("ra_input").value;
  var ra_re = new RegExp("[0-9]{6}");

  var city_test = document.getElementById("city_input").value;
  var city_re = new RegExp("^[a-zA-Z][a-zA-Z\\s]*$");
  
  if (name_test == ""){
    alert("O campo Nome não pode ficar em branco")
    return false;
  }
  else if(!name_re.test(name_test)){
    alert("O campo Nome foi preenchido incorretamente")
    return false;
  }
  else if (birth_test == ""){
    alert("O campo Data Nascimento não pode ficar em branco")
    return false;
  }
  else if(!birth_re.test(birth_test)){
    alert("O campo Data Nascimento foi preenchido incorretamente")
    return false;
  }
  else if (document.getElementById("university_input").value == ""){ 
    alert("O campo Universidade não pode ficar em branco") 
    return false;
  }
  else if (document.getElementById("course_input").value == ""){ 
    alert("O campo Curso não pode ficar em branco") 
    return false;
  }
  else if (ra_test == ""){ 
    alert("O campo RA não pode ficar em branco") 
    return false;
  }
  else if(!ra_re.test(ra_test)){
    alert("O campo RA foi preenchido incorretamente")
    return false;
  }
  else if (city_test == ""){ 
    alert("O campo Naturalidade não pode ficar em branco")
    return false; 
  }
   else if(!city_re.test(city_test)){
    alert("O campo Naturalidade foi preenchido incorretamente")
    return false;
  }
  else if (document.getElementById("semester_input").value == ""){ 
    alert("O campo Semestre não pode ficar em branco") 
    return false;
  }
  else if (document.getElementById("course_input").value == ""){ 
    alert("O campo Curso não pode ficar em branco") 
    return false;
  }
  else{
    alert("Formulário submetido com sucesso!")
    return true;
  }
}