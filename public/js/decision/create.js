$(document).ready(function(){

    /*var parameterTable = $("#parameterTable").dataTable();
    var parameterTable = $("#parameterTable").dataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "bInfo" : false
    });

    var colonnes = parameterTable.columns();
    console.log("soucie?");
    console.log(colonnes);
    var object = parameterTable.toJQuery();
    console.log(object)*/;

    $('#parameterForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {
            var parameterData = new Array();
            var parameterName = $('.parameterName').val();
            var parameterMinValue = $('.parameterMinValue').val();
            var parameterMaxValue = $('.parameterMaxValue').val();
            var parameterOrder = $('.parameterOrder').val();
            var parameterUnit = $('.parameterUnit').val();

            $.ajax({
                type : "POST",
                url : './getParameterData',
                data: {
                    parameterName: parameterName,
                    parameterMinValue: parameterMinValue,
                    parameterMaxValue: parameterMaxValue,
                    parameterOrder: parameterOrder,
                    parameterUnit: parameterUnit
                },
                success : function(data,xhr) {
                    var parsedData = JSON.parse(data);
                    var myhtml = setDisplayParameterData(parsedData);
                    $('#parametersList').append(myhtml);
                    $("#tableHead").append("<th>colonne name</th>");
                    $("#tableHead").append("<th>colonne name</th>");
                    $("#tableBody").append("<tr><td>valeur</td><td>valeur</td></tr>");
                    $("#tableBody").append("<tr><td>valeur</td><td>valeur</td></tr>");
                    var parameterTable = $("#parameterTable table").dataTable({
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers"
                    });
                    parameterTable.fnDraw();
                    //console.log(parameterTable);
                }
            });
        }
        $(this)[0].reset();
    });

    $('#decisionForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() && $('.parameterData').length > 0 ) {
            var parametersData = gelAllParametersData();
            console.log(parametersData);
            var decisionName = $(".decisionName ").val();
            $.ajax({
                type : "POST",
                url : './decision/create',
                data: {
                    decisionName: decisionName,
                    parametersData: parametersData
                },
                success : function(data,xhr) {
                    console.log("succes creation");
                    console.log(data.decisionId);
                    document.location.href = './table/'+data.decisionId;

                }
            });
        }
    });
});

function setDisplayParameterData(parameterData){
    /*var htmlCode = '<div class="parameterData col-xs-2">';
    htmlCode += ('<div class="thumbnail"><div class="caption">');
    htmlCode += ("<span class='paramName' contenteditable='true'>"+parameterData["parameterName"]+"</span><br>");
    htmlCode += ("<span class='paramMinValue' contenteditable='true'>"+parameterData["parameterMinValue"]+"</span><br>");
    htmlCode += ("<span class='paramMaxValue'>"+parameterData["parameterMaxValue"]+"</span><br>");
    htmlCode += ("<span class='paramOrder'>"+parameterData["parameterOrder"]+"</span><br>");
    htmlCode += ("<span class='paramUnit'>"+parameterData["parameterUnit"]+"</span><br>");
    htmlCode += ('</div></div>');
    htmlCode += ('</div>');
    return htmlCode;*/

    var htmlCode = '<div class="parameterData col-xs-2">';
    htmlCode += ('<div class="thumbnail"><div class="caption">');
    htmlCode += ("<div class='paramName alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'><b>"+parameterData["parameterName"]+"</b></div>");
    htmlCode += ("<div class='paramMinValue alert alert-info' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterMinValue"]+"</div>");
    htmlCode += ("<div class='paramMaxValue alert alert-info' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterMaxValue"]+"</div>");
    htmlCode += ("<div class='paramOrder alert alert-info' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterOrder"]+"</div>");
    htmlCode += ("<div class='paramUnit alert alert-info' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterUnit"]+"</div>");
    htmlCode += ('</div></div>');
    htmlCode += ('</div>');
    return htmlCode;
}

function gelAllParametersData(){
    var allParametersData = new Array();

    $(".parameterData").each(function(index){
        var parametersData = new Array();
        var i = index;
        //parametersData.push("parameter"+i);
        $(this).find('span').each(function(i){
            parametersData.push($(this).text());
        });
        allParametersData.push(parametersData);
    });
    return allParametersData;
}