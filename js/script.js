$(document).ready(function(){

// Evento al click su "send"
$("#typing-container .send").click(
  function() {
    // Mettiamo il contenuto dell'input in una variabile
    var messaggio = $("#typing-container input").val();
    // Cloniamo il templace con balloon verde
    var balloonVerde = $("template-green").clone();
    // Rimuoviamo la classe "display: none"
    // balloonVerde.removeClass("d-none");
    // Appendere il messaggio nel paragrafo del template
    $("template-green .green-balloon p").text(messaggio);
    // Appendere il balloon verde alla finestra di conversazione
    $("#conversation-window").append(balloonVerde);
  }
);



});
