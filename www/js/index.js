var divs = [];

var app = {
    initialize: function() {
        this.bindEvents();
        $("#create").click(crearNota());
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function crearNota() {
    var div = $("<div class='row nota'>" +
                    "<div class='row'><h1>"+ $("#title").val() +"</h1></div>"+
                    "<div class='row'>" + $("#desc").val() + "</div>"+
                    "<div class='btn btn-warning editar'>editar</div><div class='btn btn-danger delete'>eliminar</div> "+
                "</div>");

    $("#notas").appendChild(div);
}

function sendNomAjax(){
    var nomInput=$("#inputNom").val();
    $.ajax({
        //type: "POST",
        dataType: "jsonp",
        jsonp: "callback",
        url: "http://localhost:8080/api/load",
        data: {nombre: nomInput},
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {
            var codi = respJSON.nombre;
            $("#respAjax").html(codi+" Longitud:"+respJSON.longitud);
        }
    });

}
