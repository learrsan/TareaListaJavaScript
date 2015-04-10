'use strict';


var MisListas = Window.MisListas || {};

MisListas.CargarItems = function() {
var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

var obtenerElementosUsandoLoad = function ()
    {
        var lista = context.get_web().get_lists().getByTitle("Miscosas");
        context.load(lista);
        var items = lista.getItems('');
        context.load(items);

        context.executeQueryAsync
            (
            function ()
            {
                var enumeracion = items.getEnumerator();

                while (enumeracion.moveNext())
                {
                    var item = enumeracion.get_current();
                    $("#lista").append("<li>" + item.get_item("Title") + "</li>");
                }

            },
            function(e) {
                alert("Error al acceder a los datos"+e.ToString());   
            }
            );
};
    var addElemento = function(texto) {
        var lista = context.get_web().get_lists().getByTitle("Miscosas");
        context.load(lista);
        var info = SP.ListItemCreationInformation();
        var item = lista.addItem(info);

        item.set_item("Title", texto);
        item.update();
        context.load(item);
        context.executeQueryAsync(function() {}, function(sender,args) {
            alert("Error al crear"+args.get_message());
        });
    };


        return {
            getElementosConLoad: obtenerElementosUsandoLoad,
            addItem:addElemento
        
            };
};

$(document).ready(function () {
    
    MisListas.CargarItems().addItem("Uno");
    MisListas.CargarItems().addItem("Dos");
    MisListas.CargarItems().addItem("Tres");
    MisListas.CargarItems().addItem("Cuatro");
    MisListas.CargarItems().getElementosConLoad();

});


//// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
//$(document).ready(function () {
//    getUserName();
//});

//// This function prepares, loads, and then executes a SharePoint query to get the current users information
//function getUserName() {
//    context.load(user);
//    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
//}

//// This function is executed if the above call is successful
//// It replaces the contents of the 'message' element with the user name
//function onGetUserNameSuccess() {
//    $('#message').text('Hello ' + user.get_title());
//}

//// This function is executed if the above call fails
//function onGetUserNameFail(sender, args) {
//    alert('Failed to get user name. Error:' + args.get_message());
//}
