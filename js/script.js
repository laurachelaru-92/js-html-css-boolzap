$(document).ready(function(){

// Al click su "send"...
$("#typing-container .send").click(
  function() {
    // Viene richiamata la funzione newGreenBalloon
    newGreenBalloon();
    // Dopo un secondo, il testo nel header diventa "sta scrivendo..."
    setTimeout(staScrivendo,1000);
    // Dopo un secondo, inviamo la risposta
    setTimeout(risposta, 1000);
  });

// Al tasto "invio" viene richiamata la funzione newGreenBalloon
$("#typing-container").keypress(
  function(event) {
    if(event.which == 13) {
      // Viene richiamata la funzione newGreenBalloon
      newGreenBalloon();
      // Dopo un secondo, il testo nel header diventa "sta scrivendo..."
      setTimeout(staScrivendo,1000);
      // Dopo un secondo, inviamo la risposta
      setTimeout(risposta, 1000);
    }
  }
);

// Definizione della funzione che crea un nuovo balloon verde
function newGreenBalloon() {
  // Cloniamo il templace con balloon verde
  var balloonVerde = $(".template-green .green-balloon").clone();
  // Mettiamo il contenuto dell'input in una variabile
  var messaggio = $("#typing-container input").val();
  // Se il contenuto del messaggio non è vuoto...
  if(messaggio != "") {
    // Appendiamo il messaggio nel paragrafo del balloon verde
    balloonVerde.children("p").text(messaggio);
    // Segniamo l'ora attuale nello span apposito
    var currentTime = new Date();
    balloonVerde.children("span").text(currentTime.getHours() + ":" + currentTime.getMinutes());
    // Appendiamo il balloon verde nella finestra di conversazione
    $("#conversation-window").append(balloonVerde);
    // Puliamo il valore di input
    $("#typing-container input").val("");
  }
}

// Al focus sull'input, sparisce il microphono e appare l'aeroplanino
$("#typing-container input").focus(
  function() {
    $(".send i.fa-paper-plane").removeClass("d-none");
    $(".send i.fa-microphone").addClass("d-none");
  }
);
// Al focusout, succede il contrario
$("#typing-container input").focusout(
  function() {
    $(".send i.fa-paper-plane").addClass("d-none");
    $(".send i.fa-microphone").removeClass("d-none");
  }
);

// Creiamo la funzione che indica che l'altra persona sta scrivendo
function staScrivendo() {
  $("main header #last-access").text("sta scrivendo...");
}

// Creiamo la funzione che genera un nuovo balloon bianco
function risposta() {
  var balloonBianco = $(".white-balloon").clone();
  balloonBianco.children("p").text("ok");
  var currentTime = new Date();
  balloonBianco.children("span").text(currentTime.getHours() + ":" + currentTime.getMinutes());
  $("#conversation-window").append(balloonBianco);
}


});
