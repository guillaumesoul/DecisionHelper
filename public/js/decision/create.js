$(document).ready(function(){

    parameterNumber = 0;

    $('#parameterForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {
            var parameterData = new Array();
            var parameterName = $('.parameterName').val();
            var parameterMinValue = $('.parameterMinValue').val();
            var parameterMaxValue = $('.parameterMaxValue').val();
            var parameterOrder = $('.parameterOrder').val();
            var parameterUnit = $('.parameterUnit').val();
            parameterData["parameterName"] = parameterName;
            parameterData["parameterMinValue"] = parameterMinValue;
            parameterData["parameterMaxValue"] = parameterMaxValue;
            parameterData["parameterOrder"] = parameterOrder;
            parameterData["parameterUnit"] = parameterUnit;

            var myhtml = setDisplayParameterData(parameterData);
            $('#parametersList').append(myhtml);
            var tableHead = "<div class='paramName alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'><b>"+parameterData["parameterName"]+"</b></div>";
            tableHead += ("<div class='paramMinValue alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterMinValue"]+"</div>");
            tableHead += ("<div class='paramMaxValue alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterMaxValue"]+"</div>");
            tableHead += ("<div class='paramOrder alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterOrder"]+"</div>");
            tableHead += ("<div class='paramUnit alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterUnit"]+"</div>");
            tableHead += ("<div class='paramUnit alert alert-info deleteColumn' style='margin-bottom: 5px; padding: 5px; text-align: center;'><button type='button' class='btn btn-default' onclick='deleteColumn()'>delete</button></div>");

            $("#tableHead").append("<th>"+tableHead+"</th>");
            //$("#tableHead").append("<th>"+parameterData.parameterName+"</th>");
            //$("#tableBody").append('<tr><td><input type="number" class="form-control parameterValue" parameterName="'+parameterData["parameterName"]+'" parameterMinValue="'+parameterData["parameterMinValue"]+'" parameterMaxValue="'+parameterData["parameterMaxValue"]+'" parameterOrder="'+parameterData["parameterOrder"]+'"></td></tr>');
            //$("#tableBody").append('<tr><td><input type="number" class="form-control parameterValue"></td></tr>');
            parameterNumber++;
            console.log(parameterNumber);
            var tableBody = "<tr>";
            for (i=1 ; i<=parameterNumber ; i++){
                var tableBody = '<td><input type="number" class="form-control parameterValue"></td>';
                console.log('coucou');
            }
            tableBody += "</tr>";
            $("#tableBody").append(tableBody);
            var parameterTable = $("#parameterTable table").dataTable({
                "bJQueryUI": true,
                "sPaginationType": "full_numbers"
            });
            parameterTable.fnDraw();
            console.log(parameterTable);


            /*$.ajax({
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
                    console.log(data);
                    console.log(parsedData.parameterName);
                    var myhtml = setDisplayParameterData(parsedData);
                    $('#parametersList').append(myhtml);
                    $("#tableHead").append("<th>"+parsedData.parameterName+"</th>");
                    $("#tableBody").append('<tr><td><input type="number" class="form-control parameterValue" parameterMinValue="'+parsedData.parameterMinValue+'" parameterMaxValue="'+parsedData.parameterMaxValue+'" parameterOrder="'+parsedData.parameterOrder+'"></td></tr>');
                    var parameterTable = $("#parameterTable table").dataTable({
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers"
                    });
                    parameterTable.fnDraw();
                    console.log(parameterTable);

                    var counter = 1;

                    $('#addRow').on( 'click', function () {
                        console.log(parameterTable);
                        parameterTable.row.add( [
                            'coucou',
                            'coucou',
                            'coucou'
                        ] ).draw();
                        parameterTable._fnAddTr( $('<tr>'+
                            '<td>coucou</td>'+
                            '<td>coucou</td>'+
                            '</tr>')[0]
                        );

                        counter++;
                    } );

                    console.log(parameterTable);
                }
            });*/
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

    var htmlCode = '<div class="parameterData col-xs-2">';
    htmlCode += ('<div class="thumbnail"><div class="caption">');
    htmlCode += ("<div class='paramName alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'><b>"+parameterData["parameterName"]+"</b></div>");
    htmlCode += ("<div class='paramMinValue alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterMinValue"]+"</div>");
    htmlCode += ("<div class='paramMaxValue alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterMaxValue"]+"</div>");
    htmlCode += ("<div class='paramOrder alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterOrder"]+"</div>");
    htmlCode += ("<div class='paramUnit alert alert-info thumbnailParameterData' contenteditable='true' style='margin-bottom: 5px; padding: 5px; text-align: center;'>"+parameterData["parameterUnit"]+"</div>");
    htmlCode += ('</div></div>');
    htmlCode += ('</div>');
    return htmlCode;
}

/*
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
}*/

function gelAllParametersData(){
    var allParametersData = new Array();

    $(".parameterData").each(function(index){
        var parametersData = new Array();
        var i = index;
        //parametersData.push("parameter"+i);
        $(this).find('.thumbnailParameterData').each(function(i){
            parametersData.push($(this).text());
        });
        allParametersData.push(parametersData);
    });
    return allParametersData;
}

function deleteColumn(){
    console.log("delete column");
}