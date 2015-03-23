$(document).ready(function() {

    var parameterTable = $("#parameterTable").dataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "bInfo" : false
    });

    var paramatersData;

    $("#chartGeneration").click(function(){


        var allDataRows = $('.parametersSerie');
        var allParametersSerie = new Array();
        var parametersSerie = new Array();
        var parameterData = new Array();
        var calculatedParameterValue;

        allDataRows.each(function(ind){
            var serieName = $(this).find('.serieName').val();
            parametersSerie["serieName"] = serieName;
            var singleSerie = $(this)[0].getElementsByClassName('parameterValue');
            for (var i=0; i<singleSerie.length; i++){
                parameterData['parameterId'] = singleSerie[i].getAttribute("parameterId");
                parameterData['parameterName'] = singleSerie[i].getAttribute("parameterName");
                parameterData['parameterMinValue'] = singleSerie[i].getAttribute("parameterMinValue");
                parameterData['parameterMaxValue'] = singleSerie[i].getAttribute("parameterMaxValue");
                parameterData['parameterValue'] = singleSerie[i].value;
                calculatedParameterValue = calculateParameterData(parameterData);
                parameterData['calculatedParameterValue'] = calculatedParameterValue;
                parametersSerie.push(parameterData);

                //parametersSerie["parametersData"] = parameterData;
                parameterData = [];
            }
            allParametersSerie.push(parametersSerie);
            parametersSerie = [];
        });

        setEchartOption2(allParametersSerie);
        paramatersData = parametersSerie;


        require.config({
            paths: {
                echarts: '/bower_components/echarts/build/dist'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/radar' // require the specific chart type
            ],
            function (ec) {
                // Initialize after dom ready
                var myChart = ec.init(document.getElementById('main'));
                var options = setEchartOption2(allParametersSerie);
                myChart.setOption(options);

                /*permet de mettre a jour une série de valeur
                var updatedSeries = myChart.getSeries();
                updatedSeries[0].data[0].value[0] = 100;
                myChart.setSeries(updatedSeries);*/
            }
        );

    });

    /*
    * permet d'ajouter une ligne dans le tableau parametre en clonant la premiere ligne
    * */
    $('.addRow').click( function() {
        var row_clone = $('#parameterTable tbody tr:eq(0)').clone();
        parameterTable.fnAddData(row_clone[0]);
    });
});


/*fonction permettant de calculer la note d'un parametre en fonction de ses valeurs min et max*/
function calculateParameterData(parameterData){
    var parameterMinValue = parameterData['parameterMinValue'];
    var parameterMaxValue = parameterData['parameterMaxValue'];
    var parameterValue = parameterData['parameterValue'];
    var calculatedParameterValue;
    if (parameterMaxValue-parameterMinValue > 0 ){
        if (parameterValue-parameterMinValue > 0){
            calculatedParameterValue = (parameterValue-parameterMinValue)/(parameterMaxValue-parameterMinValue);
        }else{
            calculatedParameterValue = 0;
        }
    }else{
        calculatedParameterValue = -1;
    }
    if (calculatedParameterValue > 1){
        calculatedParameterValue = 1;
    }
    return calculatedParameterValue*100;
}

/*
* fonction permettant de definir les options pour un graphique de type radar
* */
function setEchartOption2(seriesList){
    console.log(seriesList);
    var serieName = "";
    var polarString="[";
    var dataString='[';
    var dataLegend='[';

    for (var i = 0; i<seriesList.length; i++){
        serieName = seriesList[i]['serieName'];
        if ( i == seriesList.length-1 ){
            dataLegend += '"'+serieName+'"';
        }else{
            dataLegend += '"'+serieName+'",';
        }
        dataString += '{"value": [';
        var singleSerie = seriesList[i];
        for ( var j = 0; j<singleSerie.length; j++){
            if ( i == 0 ){
                if (j == singleSerie.length-1 ){
                    polarString += '{"text": "'+singleSerie[j]["parameterName"]+'", "max": 100}';
                }else {
                    polarString += '{"text": "'+singleSerie[j]["parameterName"]+'", "max": 100},';
                }
            }
            if (j == singleSerie.length-1 ){

                if (j == singleSerie.length-1 && i == seriesList.length-1 ){
                    polarString += "]";
                    dataString += singleSerie[j]["calculatedParameterValue"]+'],"name":"'+serieName+'"}';
                }else{
                    dataString += singleSerie[j]["calculatedParameterValue"]+'],"name":"'+serieName+'"},';
                }
            }else {
                dataString += singleSerie[j]["calculatedParameterValue"]+',';
            }
        }
    }

    dataString += "]";
    dataLegend += "]";
    console.log(dataLegend);
    /*console.log(polarString);
    console.log(dataString);*/

    var JSONPolar = JSON.parse(polarString);
    var JSONSeries = JSON.parse(dataString);
    var JSONLegend = JSON.parse(dataLegend);

    option = {
        title: {
            text: "mon titre",
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: JSONLegend
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        polar: [
            {
                scale: true,
                indicator: JSONPolar
            }
        ],
        //calculable: true,
        series: [
            {
                name: 'a changer',
                type: 'radar',
                data: JSONSeries
            }
        ]
    };

    return option;

}


