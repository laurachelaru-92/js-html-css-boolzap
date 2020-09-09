$(document).ready(function(){

// Al click su "send"...
$("#typing-container .send").click(
  function() {
    // Viene richiamata la funzione newGreenBalloon
    newGreenBalloon();
    // Dopo un secondo, il testo nel header diventa "sta scrivendo..."
    setTimeout(staScrivendo,800);
    // Dopo un secondo, inviamo la risposta
    setTimeout(risposta, 1500);
    // Segniamo l'ultimo accesso nell'header
    setTimeout(ultimoAccesso, 1800);
  });

// Al tasto "invio" viene richiamata la funzione newGreenBalloon
$("#typing-container").keypress(
  function(event) {
    if(event.which == 13) {
      // Viene richiamata la funzione newGreenBalloon
      newGreenBalloon();
      // Dopo un secondo, il testo nel header diventa "sta scrivendo..."
      setTimeout(staScrivendo,800);
      // Dopo un secondo, inviamo la risposta
      setTimeout(risposta, 1500);
      // Segniamo l'ultimo accesso nell'header
      setTimeout(ultimoAccesso, 1800);
    }
  }
);

// Creiamo la funzione che crea un nuovo balloon verde
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
  var balloonBianco = $(".template-white .white-balloon").clone();
  balloonBianco.children("p").text("ok");
  var currentTime = new Date();
  balloonBianco.children("span").text(currentTime.getHours() + ":" + currentTime.getMinutes());
  $("#conversation-window").append(balloonBianco);
}

// Creiamo la funzione che cambia il testo nell'header in "ultimo accesso"
function ultimoAccesso() {
  var currentTime = new Date();
  $("main header #last-access").text("Ultimo accesso alle " + currentTime.getHours() + ":" + currentTime.getMinutes());
  $("#contacts-container .last-message-time").text(currentTime.getHours() + ":" + currentTime.getMinutes());
}

// Al click su un figlio di "contacts-container", cambia il contenuto della Finestra
$("#contacts-container .contact").click(
  function() {
    var nomeContatto = $(this).find("h4").text();
    if($("#main-header-text h4").text() != nomeContatto) {
      $("#main-header-text h4").text(nomeContatto);
      $("#conversation-window").empty();
      var balloonsAttuali = $(this).find(".balloons").html();
      $("#conversation-window").append(balloonsAttuali);
    }
  }
);


// Mettiamo i contatti in un array
var arrayContatti = [];
$("#contacts-container > .contact").each(
  function() {
    arrayContatti.push($(this).find(".contact-name").text());
  }
);
console.log(arrayContatti);

// Definiamo una funzione che riordina in base a un input
function sortare(arrayGenerico,inputGenerico) {
  var arrayGiusto = [];
  for(var i = 0; i < arrayGenerico.length; i++) {
    arrayGenerico[i]
    if(arrayGenerico[i].includes(inputGenerico)) {
      arrayGiusto.push(arrayGenerico[i]);
    }
  }
  return arrayGiusto;
}
var inputto = "au";
console.log(sortare(arrayContatti,inputto));



});
