$(document).ready(function() {

    var table = $("#parameterTable").dataTable({
        "searching": false,
        "paging": false,
        "ordering": false
    });

    /*$(".saveParametersInput").on('click', function(){
        console.log("save parameters input");
        console.log($(this)[0].parentNode);
    });*/

    $('#parameterTable tbody').on( 'click', 'tr', function () {
        console.log(table);
        console.log(table._fnGetRowElements());
        //var rowData = table.row( this ).data();
        //console.log(rowData);
    } );
});