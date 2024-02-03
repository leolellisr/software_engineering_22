function menuClick (id) {
    switch(id.innerHTML){
        case "HOME":
            window.location.reload();
        break;

        case "Moodle":
            window.open("https://moodle.ggte.unicamp.br/");
        break;

        case "HTML":
            window.open("https://www.w3schools.com/html/default.asp");
        break;

        case "CSS":
            window.open("https://www.w3schools.com/css/default.asp");
        break;

        case "JS":
            window.open("https://www.w3schools.com/js/default.asp");
        break; 
    }
    id.id = "clickeditem";
}