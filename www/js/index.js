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
                    "</div> <br>");

    notaSend = div;

    var id = sendNotaAjax();

    var editar = $("<div class='btn btn-warning editar' id='" + id + "'>editar</div>");
    editar.click(edit);

    var eliminar = $("<div class='btn btn-danger delete' id='" + id + "'>eliminar</div>");
    eliminar.click(remove);

    div.append(editar);
    div.append(eliminar);

    $("#notas").append(div);
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

            return respJSON
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

            for (var i = 0; i < respJSON.length; i++){

                var div = $(respJSON[i]);

                var editar = $("<div class='btn btn-warning editar' id='" + respJSON[i].substr(respJSON[i].length - 1) + "'>editar</div>");
                editar.click(edit);

                var eliminar = $("<div class='btn btn-danger delete' id='" + respJSON[i].substr(respJSON[i].length - 1) + "'>eliminar</div>");
                eliminar.click(remove);

                div.append(editar);
                div.append(eliminar);

                $("#notas").append(div);

            }
        }
    });

}

function removeNota(id){

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType:"text/plain",
        url: "http://localhost:8080/remove/"+id,
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {
            console.log(respJSON[0])
        }
    });
}

function updateNota(id, send){

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType:"text/plain",
        data: {nota: send},
        url: "http://localhost:8080/update/"+id,
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {
            console.log(respJSON[0])
        }
    });
}

function remove() {
    console.log(this.getAttribute("id"));
    removeNota(this.getAttribute("id"));

    $(this).parent("div").remove();
    $(this).remove();
    console.log("eliminar");
}

function edit() {



    console.log("editar");
}
