$(document).ready(function(){

// Al click su "send" viene richiamata la funzione newGreenBalloon
$("#typing-container .send").click(newGreenBalloon);

// Al tasto "invio" viene richiamata la funzione newGreenBalloon
$("#typing-container").keypress(
  function(event) {
    if(event.which == 13) {
      newGreenBalloon();
    }
  }
);

// Definizione della funzione che crea un nuovo balloon verde
function newGreenBalloon() {
  // Cloniamo il templace con balloon verde
  var balloonVerde = $(".template-green .green-balloon").clone();
  // Mettiamo il contenuto dell'input in una variabile
  var messaggio = $("#typing-container input").val();

  if(messaggio != "") {
    // Appendiamo il messaggio nel paragrafo del balloon verde
    balloonVerde.children("p").text(messaggio);
    // Appendiamo il balloon verde nella finestra di conversazione
    $("#conversation-window").append(balloonVerde);
    // Puliamo il valore di input
    $("#typing-container input").val("");
  }
}

// Al focus sull'input, 



});
