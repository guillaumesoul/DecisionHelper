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

    $('.saveParametersInput').click( function() {

        //Recuperation des inputs
        var data = $('.parameterValue');
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

        });
        paramatersData = parameterDataList;

        //Traitements des inputs calculs des valeurs
        var calculatedDataInputList = $('.parameterCalculatedValue');
        calculatedDataInputList.each(function(indice){
            var calculatedParameterValue = parameterDataList[indice]["calculatedParameterValue"];
            calculatedDataInputList[indice].value = calculatedParameterValue;
        })

    });

    $("#chartRedirect").click(function(){
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

                var options = setEchartOption(paramatersData);
                // Load data into the ECharts instance
                myChart.setOption(options);
            }
        );

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

    console.log(paramatersData);

    var titleString = "pipou";
    var polarString="[";
    for	(var index = 0; index < paramatersData.length; index++) {
        //console.log(paramatersData[index]['parameterName']);
        if (index <= 4){
            polarString += '{"text": "'+paramatersData[index]["parameterName"]+'", "max": 100},';
        }else {
            polarString += '{"text": "'+paramatersData[index]["parameterName"]+'", "max": 100}';
        }
    }
    polarString += "]";
    var JSONPolar = JSON.parse(polarString);

    var dataString='[{';
    for	(var i = 0; i < paramatersData.length; i++) {
        console.log(paramatersData[i]);
        if (i == 0){
            dataString += '"value": ['+paramatersData[i]["calculatedParameterValue"]+',';
        }else if (i == paramatersData.length-1){
            dataString += paramatersData[i]["calculatedParameterValue"]+'],"name":"serie1"}]';
        }else{
            dataString += paramatersData[i]["calculatedParameterValue"]+',';
        }
    }
    var zaza = '[{"value": [100, 00, 100, 100, 100, 100],"name":"bon..."}]';

    var JSONSeries = JSON.parse(dataString);
    console.log(JSONSeries);

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



    /*option = {
        title: {
            text: '（Budget vs spending）',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: ['（Allocated Budget）', '（Actual Spending）']
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
                indicator: [
                    {text: '（sales）', min: 0, max: 1000},
                    {text: '（Administration）', min: 0, max: 1000},
                    {text: '（Information Techology）', min: 0, max: 1000},
                    {text: '（Customer Support）', min: 0, max: 1000},
                    {text: '（Development）', min: 0, max: 1000},
                    {text: '（Marketing）', min: 0, max: 1000}
                ]
            }
        ],
        calculable: true,
        series: [
            {
                name: '（Budget vs spending）',
                type: 'radar',
                data: [
                    {
                        value: [500, 610 , 343, 100, 850, 492],
                        name: '（Allocated Budget）'
                    },
                    {
                        value: [1000, 1000, 1000, 1000, 1000, 1000],
                        name: '（Actual Spending）'
                    }
                ]
            }
        ]
    };*/

    return option;
}


