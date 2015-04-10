'use strict';


var MisListas = Window.MisListas || {};

MisListas.CargarItem = function() {
var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

    var obtenerElementosUsandoLoad = function() {
        var lista = context.get_web().get_lists.getByTitle["Tareas"];
        context.load(lista);
        var items = lista.getItems('');
        context.load(items);

        context.executeQueryAsync(
            function() {
                var enumeracion = items.getEnumerator();

                while (enumeracion.moveNext()) {
                    var item = enumeracion.getCurrent();
                    $("#lista").append("<li>" + item.get_item("Title") + "</li>");
                }

            },
            function() {
                alert("Error al acceder a los datos");   
            }
        
    );
};
};


// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    getUserName();
});

// This function prepares, loads, and then executes a SharePoint query to get the current users information
function getUserName() {
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// This function is executed if the above call is successful
// It replaces the contents of the 'message' element with the user name
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}

// This function is executed if the above call fails
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}
