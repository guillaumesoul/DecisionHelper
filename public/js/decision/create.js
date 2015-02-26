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
                    var myhtml = setDisplayParameterData(parsedData);
                    $('#parametersList').append(myhtml);
                }
            });
        }
    });

    $('#decisionForm').submit(function(e) {
        e.preventDefault();
        if ( $(this).parsley().isValid() && $('.parameterData').length > 0 ) {
            var decisionData = gelAllParametersData();
            /*$.ajax({
                type : "POST",
                url : './decision/create',
                data: {
                },
                success : function(data,xhr) {

                },
                error: function(){
                    console.log('error create decision');
                }
            });*/
        }
    });
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
    var parametersData = new Array();
    $(".parameterData").each(function(index){
        var i = index;
        //parametersData.push("parameter"+i);
        $(".parameterData span").each(function(i){
            console.log($(this).attr('class'));
            //parametersData.push($(this).text());
        });
        allParametersData.push(parametersData);
    });
    return allParametersData;
}