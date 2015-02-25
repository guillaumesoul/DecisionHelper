$(document).ready(function(){

    //$('#parameterForm').parsley();
    //$('#parameterForm').isValid();

    $('#parameterForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {
            var parameterData = new Array();
            var parameterName = $('.parameterName').val();
            var parameterMinValue = $('.parameterMinValue').val();
            var parameterMaxValue = $('.parameterMaxValue').val();
            var parameterUnit = $('.parameterUnit').val();
            //parameterData.push(parameterName,parameterValue,parameterMinValue,parameterMaxValue,parameterUnit);

            $.ajax({
                type : "POST",
                url : './getParameterData',
                data: {
                    parameterName: parameterName,
                    parameterMinValue: parameterMinValue,
                    parameterMaxValue: parameterMaxValue,
                    parameterUnit: parameterUnit
                },
                success : function(data,xhr) {
                    var parsedData = JSON.parse(data);

                    //allParametersData.push(parsedData);
                    var myhtml = setDisplayParameterData(parsedData);
                    $('#parametersList').append(myhtml);
                    var enfant = $("#parametersList").children();
                }
            });
        }
    });

    $('#parameterForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {
            $.ajax({
                type : "POST",
                url : './createDecision',
                data: {
                },
                success : function(data,xhr) {

                }
            });
        }
    });

    $.listen('parsley:form:success', function(e){


    });

    /*$('.addParameter').click(function(event) {

        var parameterData = new Array();

        var parameterName = $('.parameterName').val();
        //var parameterType = $('.parameterType').val();
        //var parameterValue = $('.parameterValue').val();
        var parameterMinValue = $('.parameterMinValue').val();
        var parameterMaxValue = $('.parameterMaxValue').val();
        var parameterUnit = $('.parameterUnit').val();
        //parameterData.push(parameterName,parameterValue,parameterMinValue,parameterMaxValue,parameterUnit);

        $.ajax({
            type : "POST",
            url : './getParameterData',
            data: {
                parameterName: parameterName,
                //parameterValue: parameterValue,
                parameterMinValue: parameterMinValue,
                parameterMaxValue: parameterMaxValue,
                parameterUnit: parameterUnit
            },
            success : function(data,xhr) {
                var parsedData = JSON.parse(data);

                //allParametersData.push(parsedData);
                var myhtml = setDisplayParameterData(parsedData);
                $('#parametersList').append(myhtml);
                var enfant = $("#parametersList").children();
            }
        });

    });*/

    /*
    * Get the parameters data for all the parameters previously entered by the user
    * */
    $("#getAllParametersData").on('click', function(){
        var allParametersData = new Array();
        var parametersData = new Array();
        $(".parameterData").each(function(index){
            var i = index;
            $(".parameterData span").each(function(i){
                parametersData.push("parameter"+i);
                parametersData.push($(this).text());
            });
            allParametersData.push(parametersData);
        });

        console.log(allParametersData);
    })
});

function setDisplayParameterData(parameterData){
    var htmlCode = '<div class="parameterData col-xs-3">';
    htmlCode += ("<label>NAME : </label><span class='paramName'>"+parameterData["parameterName"]+"</span><br>");
    htmlCode += ("<label>MIN VALUE : </label><span class='paramMinValue'>"+parameterData["parameterMinValue"]+"</span><br>");
    htmlCode += ("<label>MAX VALUE : </label><span class='paramMaxValue'>"+parameterData["parameterMaxValue"]+"</span><br>");
    htmlCode += ("<label>UNIT : </label><span class='paramUnit'>"+parameterData["parameterUnit"]+"</span><br>");
    htmlCode += ('</div>');
    return htmlCode;
}