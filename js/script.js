$(document).ready(function(){

// Stabiliamo chi è il contatto attivo
var contattoAttivo = $("#contacts-container .contact:first-child");

// Al caricamento della pagina, è attivo il primo contatto della nostra lista
showActive(contattoAttivo);

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
  // Diamo al contato attivo la classe active (per background grigio scuro)
  contact.addClass("active");
  // Togliamo a tutti gli altri contatti la classe active
  $("#contacts-container .contact").not(contact).removeClass("active");
  $("#main-header-text h4").text(contact.find(".contact-name").text());
  // La foto profilo è quella del contatto attivo
  var immagineProfilo = contact.find("img").attr("src");
  $("main header img").attr("src",immagineProfilo);
  // Il contatto attivo è quello la cui conversazione è visibile
  var datoAttivo = contact.attr("data-contact");
  var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
  chatAttiva.removeClass("d-none");
  chatAttiva.addClass("active");
  // chatAttiva.addClass("active");
  // Rimuoviamo le chat degli altri contatti
  $("#conversation-window .balloons").not(chatAttiva).addClass("d-none");
  // L'ultimo accesso in main header è quello del contatto attivo
  var lastMessageTime = chatAttiva.find(".pos-rel:last-of-type .balloon-time").text();
  $("#main-header-text #last-access").text("Ultimo accesso alle " + lastMessageTime);
  // Facciamo scorrere la finestra di conversazione al fondo
  var altezzaChat = chatAttiva.prop("scrollHeight");
  $("#conversation-window").scrollTop(altezzaChat);
}

// CAMBIO CONTATTO
// Al click su un contatto, cambia il contatto attivo e il contenuto in finestra
$("#contacts-container .contact").click(
  function() {
    contattoAttivo = $(this);
    // Viene visualizzato come attivo il contatto cliccato
    showActive($(this));
  }
);

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
    var contatto = contattoAttivo;
    // Viene richiamata la funzione newGreenBalloon
    newGreenBalloon(contatto);
    // Dopo un secondo, il testo nel header diventa "sta scrivendo..."
    setTimeout(function(){staScrivendo(contatto)},800);
    // Dopo un secondo, inviamo la risposta
    setTimeout(function(){risposta(contatto)},1500);
    // Segniamo l'ultimo accesso nell'header
    setTimeout(function(){ultimoAccesso(contatto)} ,1800);
  });

// Al tasto "invio" viene richiamata la funzione newGreenBalloon
$("#typing-container").keypress(
  function(event) {
    if(event.which == 13) {
      var contatto = contattoAttivo;
      // Viene richiamata la funzione newGreenBalloon
      newGreenBalloon(contatto);
      // Dopo un secondo, il testo nel header diventa "sta scrivendo..."
      setTimeout(function(){staScrivendo(contatto)},800);
      // Dopo un secondo, inviamo la risposta
      setTimeout(function(){risposta(contatto)},1500);
      // Segniamo l'ultimo accesso nell'header
      setTimeout(function(){ultimoAccesso(contatto)},1800);
    }
  });

// Creiamo la funzione che crea un nuovo balloon verde
function newGreenBalloon(contact) {
  // Cloniamo il template con balloon verde
  var balloonVerde = $(".template-green .green-balloon").clone();
  // Mettiamo il contenuto dell'input in una variabile
  var messaggio = $("#typing-container input").val();
  // Se il contenuto del messaggio non è vuoto...
  if(messaggio != "") {
    // Appendiamo il messaggio nel paragrafo del balloon verde
    balloonVerde.children("p").text(messaggio);
    // Segniamo l'ora attuale nel balloon verde
    balloonVerde.find(".balloon-time").text(currentTime());
    // Appendiamo il balloon nella finestra di conversazione
    var datoAttivo = contact.attr("data-contact");
    var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
    chatAttiva.append(balloonVerde);
    // Appendiamo il messaggio anche nella finestra a sinistra
    contact.find(".last-message").text(messaggio);
    // Puliamo il valore di input
    $("#typing-container input").val("");
    // Scrolliamo al fondo
    var altezzaChat = chatAttiva.prop("scrollHeight");
    $("#conversation-window").scrollTop(altezzaChat);
  }
}

// Creiamo la funzione che indica che l'altra persona sta scrivendo...
function staScrivendo(contact) {
  // ...solo se nel frattempo non è cambiato il contatto attivo
  if($("#main-header-text h4").text() == contact.find(".contact-name").text()) {
    $("#main-header-text #last-access").text("sta scrivendo...");
  }
}

// Creiamo la funzione che genera un nuovo balloon bianco
function risposta(contact) {
  // Prendiamo il template del balloon bianco e vi scriviamo "ok"
  var balloonBianco = $(".template-white .white-balloon").clone();
  balloonBianco.children("p").text("ok");
  // Scriviamo l'ora attuale nel balloon
  balloonBianco.find(".balloon-time").text(currentTime());
  // Appendiamo il balloon nella chat attiva
  var datoAttivo = contact.attr("data-contact");
  var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
  // Scriviamolo sulla sinistra come ("ultimo messaggio")
  contact.find(".last-message").text("ok");
  // Appendiamo il messaggio in chat
  chatAttiva.append(balloonBianco);
  // Scrolliamo al fondo
  var altezzaChat = chatAttiva.prop("scrollHeight");
  $("#conversation-window").scrollTop(altezzaChat);
}

// Funzione per l'ora attuale
function currentTime() {
  // Funzione per ore e minuti minori di 10
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  var d = new Date();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var time = addZero(hours) + ":" + addZero(minutes);
  return time;
}

// Creiamo la funzione che cambia il testo nell'header in "ultimo accesso"
function ultimoAccesso(contact) {
  // Occorre stabilire di nuovo l'attributo "data-contact" e il relativo "data-chat"
  var datoAttivo = contattoAttivo.attr("data-contact");
  var chatAttiva = $("#conversation-window .balloons[data-chat="+datoAttivo+"]");
  // Prendiamo l'orario dell'ultimo messaggio inviato, che per noi sarà come l'ultimo accesso
  var lastMessageTime = chatAttiva.find(".pos-rel:last-of-type .balloon-time").text();
  // Appendiamo l'orario nell'header e nella finestra di sinistra corrispondente al contatto attivo
  $("main header #last-access").text("Ultimo accesso alle " + lastMessageTime);
  contact.find(".last-message-time").text(currentTime());
}


// CERCA TRA I CONTATTI //
// Mettiamo i contatti in un array
var arrayContatti = [];
$("#contacts-container > .contact").each(
  function() {
    var contatto = $(this).find(".contact-name").text();
    arrayContatti.push(contatto.toLowerCase());
  }
);

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
// Al click sulla freccia del messaggio, questo mostra il menu
$(document).on("click", ".white-balloon .fa-chevron-down, .green-balloon .fa-chevron-down",
function() {
  var menuMessaggio = $(this).siblings("ul");
  menuMessaggio.toggleClass("d-none");
  // Far sparire il menuMessaggio al mouseleave
  $(".white-balloon ul, .green-balloon ul").mouseleave(
    function() {
      $(this).addClass("d-none");
    }
  );
}
);

var ultimoMessaggio = $(".balloons.active").find(".pos-rel:last-of-type p").text();
// Al click su "cancella messaggio" lo cancella e rivede qual è l'ultimo messaggio
$(document).on("click", ".white-balloon .delete, .green-balloon .delete",
function(){
  $(this).parents(".pos-rel").remove();
  // Rivedere qual è il testo dell'ultimo messaggio e scriverlo nell'aside
  ultimoMessaggio = $(".balloons.active").find(".pos-rel:last-of-type p").text();
  $("#contacts-container .contact.active").find(".last-message").text(ultimoMessaggio);
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
