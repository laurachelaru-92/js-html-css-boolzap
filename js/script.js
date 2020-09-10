$(document).ready(function(){

// Al caricamento della pagina, è attivo il primo contatto della nostra lista
// $("#contacts-container .contact:first-child").addClass("active");
showActive($("#contacts-container .contact:first-child"));

// Definiamo una funzione che mostra in pagina il contatto attivo
function showActive(contact) {
  contact.addClass("active");
  var contattoAttivo = $("#contacts-container .contact.active");
  $("#main-header-text h4").text(contattoAttivo.find(".contact-name").text());
  // L'ultimo accesso in main header è quello del contatto attivo
  var accessoAttivo = contattoAttivo.find(".last-message-time").text();
  $("#main-header-text #last-access").text("Ultimo accesso alle " + accessoAttivo);
  // La foto profilo è quella del contatto attivo
  var immagineProfilo = contattoAttivo.find("img").attr("src");
  $("main header img").attr("src",immagineProfilo);
  // Il contatto attivo è quello la cui conversazione è visibile
  var datoAttivo = contattoAttivo.attr("data-contact");
  console.log(datoAttivo);
  var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
  chatAttiva.removeClass("d-none");
  chatAttiva.addClass("active");
  // Rimuoviamo le chat degli altri contatti
  $("#conversation-window .balloons").not(chatAttiva).addClass("d-none");
}

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
  })

// Funzione per ore e minuti minori di 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

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
    var d = new Date();
    balloonVerde.children("span").text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
    // Appendiamo il balloon nella finestra di conversazione
    $("#conversation-window .balloons.active").append(balloonVerde);
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
  var d = new Date();
  balloonBianco.children("span").text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
  $("#conversation-window .balloons.active").append(balloonBianco);
}

// Creiamo la funzione che cambia il testo nell'header in "ultimo accesso"
function ultimoAccesso() {
  var d = new Date();
  $("main header #last-access").text("Ultimo accesso alle " + addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
  $("#contacts-container .contact.active .last-message-time").text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
}

// Al click su un figlio di "contacts-container", cambia il contenuto della Finestra
$("#contacts-container .contact").click(
  function() {
    // Viene visualizzato come attivo il contatto cliccato
    $("#contacts-container .contact").removeClass("active");
    showActive($(this));
  }
);


// Mettiamo i contatti in un array
var arrayContatti = [];
$("#contacts-container > .contact").each(
  function() {
    var contatto = $(this).find(".contact-name").text();
    arrayContatti.push(contatto.toLowerCase());
  }
);
console.log(arrayContatti);

// Definiamo una funzione che "riordina" in base a un input
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

// Quando scriviamo nell'input, sortiamo la lista contatti
$("#search input").keyup(
  function() {
    // Viene letto il valore dell'input, reso minuscolo e messo in una variabile
    var inputValue = $("#search input").val().toLowerCase();
    // Viene creato un array dei contatti che contengono l'input
    var arrayContattiTrovati = sortare(arrayContatti,inputValue);
    // Iteriamo nel nostro contenitore di contatti
    $("#contacts-container .contact").each(
      function() {
        // Se l'array appena creato non contiene uno dei nomi dei contatti...
        if(!arrayContattiTrovati.includes($(this).find(".contact-name").text().toLowerCase())) {
          // ..rimuoverlo
          $(this).addClass("d-none");
        } else {
          // ..altrimenti, renderlo visibile
          $(this).removeClass("d-none");
        }
      }
    );
  }
);

});
