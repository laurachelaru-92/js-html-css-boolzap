$(document).ready(function(){

// Al caricamento della pagina, è attivo il primo contatto della nostra lista
showActive($("#contacts-container .contact:first-child"));

// Nella parte sinistra, sotto il nome del contatto, appare il testo dell'ultimo messaggio
$("#contacts-container .contact").each(
  function() {
    var datoAttivo = $(this).attr("data-contact");
    var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
    var ultimoMessaggio = chatAttiva.find(".pos-rel:last-of-type p").text();
    $(this).find(".last-message").text(ultimoMessaggio);
    var ultimoAccesso = chatAttiva.find(".pos-rel:last-of-type .balloon-time").text();
    $(this).find(".last-message-time").text(ultimoAccesso);
  }
);

// Definiamo una funzione che mostra in pagina il contatto attivo
function showActive(contact) {
  contact.addClass("active");
  var contattoAttivo = $("#contacts-container .contact.active");
  $("#main-header-text h4").text(contattoAttivo.find(".contact-name").text());
  // La foto profilo è quella del contatto attivo
  var immagineProfilo = contattoAttivo.find("img").attr("src");
  $("main header img").attr("src",immagineProfilo);
  // Il contatto attivo è quello la cui conversazione è visibile
  var datoAttivo = contattoAttivo.attr("data-contact");
  var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
  chatAttiva.removeClass("d-none");
  chatAttiva.addClass("active");
  // Rimuoviamo le chat degli altri contatti
  $("#conversation-window .balloons").not(chatAttiva).addClass("d-none");
  // L'ultimo accesso in main header è quello del contatto attivo
  var ultimoAccesso = chatAttiva.find(".pos-rel:last-of-type .balloon-time").text();
  $("#main-header-text #last-access").text("Ultimo accesso alle " + ultimoAccesso);
  // Facciamo scorrere la finestra di conversazione al fondo
  var altezzaChat = $(".balloons.active").prop("scrollHeight");
  $("#conversation-window").scrollTop(altezzaChat);
}

// NUOVO MESSAGGIO //
// Al focus sull'input, sparisce il microfono e appare l'aeroplanino
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
  });

// Creiamo la funzione che crea un nuovo balloon verde
function newGreenBalloon() {
  // Cloniamo il template con balloon verde
  var balloonVerde = $(".template-green .green-balloon").clone();
  // Mettiamo il contenuto dell'input in una variabile
  var messaggio = $("#typing-container input").val();
  // Se il contenuto del messaggio non è vuoto...
  if(messaggio != "") {
    // Appendiamo il messaggio nel paragrafo del balloon verde
    balloonVerde.children("p").text(messaggio);
    // Segniamo l'ora attuale nel balloon verde
    var d = new Date();
    balloonVerde.find(".balloon-time").text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
    // Appendiamo il balloon nella finestra di conversazione
    var contattoAttivo = $("#contacts-container .contact.active");
    var datoAttivo = contattoAttivo.attr("data-contact");
    var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
    chatAttiva.append(balloonVerde);
    // Appendiamo il messaggio anche nella finestra a sinistra
    $("#contacts-container .contact.active").find(".last-message").text(messaggio);
    // Puliamo il valore di input
    $("#typing-container input").val("");
  }
  // Facciamo scorrere la finestra di conversazione al fondo
  var altezzaChat = $(".balloons.active").prop("scrollHeight");
  $("#conversation-window").scrollTop(altezzaChat);
}

// RISPOSTA //
// Creiamo la funzione che indica che l'altra persona sta scrivendo
function staScrivendo() {
  $("main header #last-access").text("sta scrivendo...");
}

// Creiamo la funzione che genera un nuovo balloon bianco
function risposta() {
  // Prendiamo il template del balloon bianco e vi scriviamo "ok"
  var balloonBianco = $(".template-white .white-balloon").clone();
  balloonBianco.children("p").text("ok");
  // Scriviamo l'ora attuale nel balloon
  var d = new Date();
  balloonBianco.find(".balloon-time").text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
  // Appendiamo il balloon nella chat attiva
  var contattoAttivo = $("#contacts-container .contact.active");
  var datoAttivo = contattoAttivo.attr("data-contact");
  var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
  chatAttiva.append(balloonBianco);
  // Scriviamo sulla finistra come ("ultimo messaggio")
  contattoAttivo.find(".last-message").text("ok");
  // Facciamo scorrere la finestra di conversazione al fondo
  var altezzaChat = $(".balloons.active").prop("scrollHeight");
  $("#conversation-window").scrollTop(altezzaChat);
}

// Funzione per ore e minuti minori di 10
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Creiamo la funzione che cambia il testo nell'header in "ultimo accesso"
function ultimoAccesso() {
  var d = new Date();
  $("main header #last-access").text("Ultimo accesso alle " + addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
  $("#contacts-container .contact.active .last-message-time").text(addZero(d.getHours()) + ":" + addZero(d.getMinutes()));
}

// CAMBIO CONTATTO
// Al click su un figlio di "contacts-container", cambia il contenuto della Finestra
$("#contacts-container .contact").click(
  function() {
// Viene visualizzato come attivo il contatto cliccato
$("#contacts-container .contact").removeClass("active");
$("#conversation-window .balloons").removeClass("active");
showActive($(this));
  }
);


// CERCA TRA I CONTATTI //
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
    var searchValue = $("#search input").val().toLowerCase();
    // Viene creato un array dei contatti che contengono l'input
    var arrayContattiTrovati = sortare(arrayContatti,searchValue);
    console.log(arrayContattiTrovati);
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


// ELIMINARE UN MESSAGGIO
// Al click sulla freccia del messaggio, questo mostra il menu e al click su "cancella messaggio" lo cancella
$(document).on("click", ".white-balloon .fa-chevron-down, .green-balloon .fa-chevron-down",
function() {
  var menuMessaggio = $(this).siblings("ul");
  menuMessaggio.toggleClass("d-none");
  $(menuMessaggio).children(".delete").click(
    function() {
      $(this).parents(".pos-rel").remove();
      // Rivedere qual è il testo dell'ultimo messaggio e scriverlo nell'aside
      var ultimoMessaggio = $("#conversation-window .balloons.active").find(".pos-rel:last-of-type p").text();
      $("#contacts-container .contact.active").find(".last-message").text(ultimoMessaggio);
    }
  );
  // Far sparire il menuMessaggio al mouseleave
  $(".white-balloon ul, .green-balloon ul").mouseleave(
    function() {
      $(this).addClass("d-none");
    }
  );

}
);

// Far sparire il menuMessaggio al click su qualsiasi altra parte del documento
$("body").click(
  function(e) {
    if(e.target.id != ".fa-chevron-down") {
      $(".white-balloon ul, .green-balloon ul").addClass("d-none");
    }
  }
);


});
