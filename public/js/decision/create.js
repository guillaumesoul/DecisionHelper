$(document).ready(function(){

    $('#parameterForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() ) {
            var parameterData = new Array();
            var parameterName = $('.parameterName').val();
            var parameterMinValue = $('.parameterMinValue').val();
            var parameterMaxValue = $('.parameterMaxValue').val();
            var parameterUnit = $('.parameterUnit').val();

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
                    var myhtml = setDisplayParameterData(parsedData);
                    $('#parametersList').append(myhtml);
                }
            });
        }
        $(this)[0].reset();
    });

    $('#decisionForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() && $('.parameterData').length > 0 ) {
            var parametersData = gelAllParametersData();
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

    /*$("#testButton").click(function(){
        console.log("c'est parti");
        $.ajax({
            type : "POST",
            url : './persistance',
            success : function(data,xhr) {
                console.log("persistance ok");
            }
        });
    });*/
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