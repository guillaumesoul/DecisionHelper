$(document).ready(function() {
    /*$('#parameterTable').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="usersData"></table>' );*/
    $("#parameterTable").dataTable({
        "searching": false,
        "paging": false,
        "ordering": false
    });
});