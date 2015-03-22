$(document).ready(function() {

    var parameterTable = $("#parameterTable").dataTable({
        "searching": false,
        "paging": false,
        "ordering": false,
        "bInfo" : false
    });

    //parameterTableCalcul
    var parameterTableCalcul = $("#parameterTableCalcul").dataTable({
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

        allDataRows.each(function(i){
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
                parameterData = [];
            }
            allParametersSerie.push(parametersSerie);
            parametersSerie = [];
        });

        setEchartOption2(allParametersSerie);

        //Recuperation des inputs
        /*var data = $('.parameterValue');
        var parameterDataList = new Array();
        var parameterData = new Array();
        var calculatedParameterValue;
        data.each(function(){
            parameterData['parameterId'] = $(this)[0].getAttribute("parameterId");
            parameterData['parameterName'] = $(this)[0].getAttribute("parameterName");
            parameterData['parameterMinValue'] = $(this)[0].getAttribute("parameterMinValue");
            parameterData['parameterMaxValue'] = $(this)[0].getAttribute("parameterMaxValue");
            parameterData['parameterValue'] = $(this).val();
            calculatedParameterValue = calculateParameterData(parameterData);
            parameterData['calculatedParameterValue'] = calculatedParameterValue;
            parameterDataList.push(parameterData);
            parameterData = [];

        });*/
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

                //var options = setEchartOption(paramatersData);
                var options = setEchartOption2(allParametersSerie);
                // Load data into the ECharts instance
                myChart.setOption(options);

                /*permet de mettre a jour une série de valeur
                var updatedSeries = myChart.getSeries();
                updatedSeries[0]['name'] = "je change";
                updatedSeries[0].data[0].value[0] = 100;
                updatedSeries[0].data[0].value[1] = 100;
                updatedSeries[0].data[0].value[2] = 100;
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
* genere le JSON option necessaire pour l'affichage d'un graphique radar
* input: tableau d'elements contenant [titre,maxvalue,value]
* */
function setEchartOption(paramatersData){

    var titleString = "pipou";
    var polarString="[";
    var dataString='[{"value": [';
    for	(var index = 0; index < paramatersData.length; index++) {
        if (index == paramatersData.length-1 ){
            polarString += '{"text": "'+paramatersData[index]["parameterName"]+'", "max": 100}]';
            dataString += paramatersData[index]["calculatedParameterValue"]+'],"name":"serie1"}]';

        }else {
            polarString += '{"text": "'+paramatersData[index]["parameterName"]+'", "max": 100},';
            dataString += paramatersData[index]["calculatedParameterValue"]+',';
        }
    }
    var JSONPolar = JSON.parse(polarString);
    var JSONSeries = JSON.parse(dataString);

    option = {
        title: {
            text: titleString,
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: ['（Allocated Budget）']
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
                name: '（Budget vs spending）',
                type: 'radar',
                data: JSONSeries
            }
        ]
    };

    return option;
}

/*
* fonction permettant de definir les options pour un graphique de type radar
* */
function setEchartOption2(seriesList){

    var polarString="[";
    //var seriesString="[{";
    //var dataString='[{"value": [';
    var dataString='[';

    for (var i = 0; i<seriesList.length; i++){
        
        console.log(seriesList[i]);


        dataString += '{"value": [';
        
        var singleSerie = seriesList[i];
        for ( var j = 0; j<singleSerie.length; j++){
            /*console.log(singleSerie[j]);
            console.log(singleSerie[j]["parameterName"]);
            console.log(singleSerie[j]["parameterValue"]);*/

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
                    dataString += singleSerie[j]["calculatedParameterValue"]+'],"name":"serie'+i+'"}';
                }else{
                    dataString += singleSerie[j]["calculatedParameterValue"]+'],"name":"serie'+i+'"},';
                }
            }else {
                dataString += singleSerie[j]["calculatedParameterValue"]+',';
            }
        }
    }

    dataString += "]";
    console.log(polarString);
    console.log(dataString);

    var JSONPolar = JSON.parse(polarString);
    var JSONSeries = JSON.parse(dataString);

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
            data: ['a changer']
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
                name: '（Budget vs spending）',
                type: 'radar',
                data: JSONSeries
            }
        ]
    };

    return option;



    /*series: [
        {
            name: '（Budget vs spending）',
            type: 'radar',
            data: [
                {
                    value: [4300, 10000, 28000, 35000, 50000, 19000],
                    name: '（Allocated Budget）'
                },
                {
                    value: [5000, 14000, 28000, 31000, 42000, 21000],
                    name: '（Actual Spending）'
                }
            ]
        }
    ]*/

}


