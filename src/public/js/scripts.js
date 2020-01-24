//import $ from "jQuery";
/*
$(function() {
  // to do..dddd.dsfdsdf

  $("#post-comment").hide();
  $("#btn-comment").on("click", function(event) {
    event.preventDefault();
    $("#post-comment").show();
  });
  $("#btn-like").on("click", function(event) {
    event.preventDefault();

    var imgId = $(this).data("id");
    //qg3prw
    //u89mu0
    //imgId
    //+ imgId
    $.post("https://xvtc5.sse.codesandbox.io/images/" + imgId + "/like").done(
      function(data) {
        $(".likes-count").text(data.likes);
      }
    );
  });
});
*/
$(function() {
  //oculto la parte el formulario del comentario pero si hace un click en el btn comment lo muestra
  $("#post-comment").hide();
  $("#btn-comment").on("click", function(event) {
    event.preventDefault();
    $("#post-comment").slideDown();
  });
  //si hace un click en el btn like captura el evento y obtiene el nombre de la imagen. Genera un post con este
  $("#btn-like").on("click", function(event) {
    event.preventDefault();
    var imgId = $(this).data("id");
    console.log("este es el id " + imgId); //lo muestro por consola
    /*
    $.post("/images/" + imgId + "/like").done(function(data) {
      $(".likes-count").text(data.likes); //https://xvtc5.sse.codesandbox.io/images/uwhxn0/like
      console.log(data);
    });
    */
    $.ajax({
      url: "/images/" + imgId + "/like",
      type: "post",
      contentType: "application/x-www-form-urlencoded",
      Authorization: "wer",
      success: function(data) {
        $(".likes-count").text(data.likes); //https://xvtc5.sse.codesandbox.io/images/uwhxn0/like
        console.log(data);
      }
    });
  });
  //si queremos realizar el borrado de una imagen script
  $("#btn-delete").on("click", function(event) {
    event.preventDefault();
    var $this = $(this);
    var remove = confirm("estas seguro que queres borrar la imagen?");
    if (remove) {
      var imgId = $(this).data("id");
      $.ajax({
        url: "/images/" + imgId,
        type: "DELETE"
      }).done(function(result) {
        if (result) {
          $this.removeClass("btn-danger").addClass("btn-success");
          $this
            .find("i")
            .removeClass("fa-times")
            .addClass("fa-check");
          $this.append("<span>Borrado!</span>");
        }
      });
    }
  });
});
