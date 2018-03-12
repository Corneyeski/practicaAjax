var divs = [];
var notaSend = "";

var app = {
    initialize: function() {
        recoverNotasAjax();
        $("#create").click(crearNota);
    }
};

function crearNota() {
    var div = $("<div class='row no" +
        "ta'>" +
                    "<div class='row'><h1>"+ $("#title").val() +"</h1></div><br><br><br><br>"+
                    "<div class='row'>" + $("#desc").val() + "</div>"+
                    "<div class='btn btn-warning editar'>editar</div><div class='btn btn-danger delete'>eliminar</div></div> <br>");

    notaSend = div
    $("#notas").append(div);
    sendNotaAjax();
}

function sendNotaAjax(){
    var send = notaSend.get(0).outerHTML;
    console.log(send);

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType:"text/plain",
        url: "http://localhost:8080/save",
        data: {nota: send},
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {
            var codi = respJSON.nombre;
            $("#respAjax").html(codi+" Longitud:"+respJSON.longitud);
        }
    });

}

function recoverNotasAjax(){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/recover",
        beforeSend: function () {
            console.log("conectando")
        },
        success: function (respJSON) {
            console.log(respJSON)
        }
    });

}

/*function sendNotaByUrl(){
    var nomInput=$("#inputNom").val();
    var send = notaSend.get(0).outerHTML
    console.log("http://localhost:8080/save/"+ send)
    $.ajax({
        //type: "POST",
        dataType: "jsonp",
        jsonp: "callback",
        url: "http://localhost:8080/save/"+ send,
        data: {nombre: nomInput},
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {
            var codi = respJSON.nombre;
            $("#respAjax").html(codi+" Longitud:"+respJSON.longitud);
        }
    });

}*/
