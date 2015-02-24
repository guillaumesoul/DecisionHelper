$(document).ready(function(){

    //$('#parameterForm').parsley();

    /*$('#parameterForm').submit(function(event) {
        var mydata = $('#parameterForm').serializeArray();
        $('#parametersList').html("pipou");
    });*/
    $('.addParameter').click(function(event) {

        var parameterData = new Array();

        var parameterName = $('.parameterName').val();
        //var parameterType = $('.parameterType').val();
        var parameterValue = $('.parameterValue').val();
        var parameterMinValue = $('.parameterMinValue').val();
        var parameterMaxValue = $('.parameterMaxValue').val();
        var parameterUnit = $('.parameterUnit').val();
        //parameterData.push(parameterName,parameterValue,parameterMinValue,parameterMaxValue,parameterUnit);

        $.ajax({
            type : "POST",
            url : './getParameterData',
            data: {
                parameterName: parameterName,
                parameterValue: parameterValue,
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
                $(".parameterData").each(function(index){
                    console.log( index + ": " + $( this ) );
                    console.log($( this ));
                })
                //console.log(enfant);
            }
        });

        /*var myhtml = setDisplayParameterData(parameterData);
        $('#parametersList').append(myhtml);*/
    });

    $("#getAllParametersData").on('click', function(){
        var mesdonnes = $("#parametersList").text();
        console.log(mesdonnes);
    })
});

function setDisplayParameterData(parameterData){
    var htmlCode = '<div class="parameterData col-xs-3">';
    htmlCode += ("<label>NAME : </label><span>"+parameterData["parameterName"]+"</span><br>");
    htmlCode += ("<label>VALUE : </label><span>"+parameterData["parameterValue"]+"</span><br>");
    htmlCode += ("<label>MIN VALUE : </label><span>"+parameterData["parameterMinValue"]+"</span><br>");
    htmlCode += ("<label>MAX VALUE : </label><span>"+parameterData["parameterMaxValue"]+"</span><br>");
    htmlCode += ("<label>UNIT : </label><span>"+parameterData["parameterUnit"]+"</span><br>");
    htmlCode += ('</div>');
    return htmlCode;
}