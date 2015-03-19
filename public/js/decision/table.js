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

        // configure for module loader
        require.config({
            paths: {
                echarts: '/bower_components/echarts/build/dist'
            }
        });

        // use
        require(
            [
                'echarts',
                'echarts/chart/radar' // require the specific chart type
            ],
            function (ec) {
                // Initialize after dom ready
                var myChart = ec.init(document.getElementById('main'));

                var options = setEchartOption();
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
    return calculatedParameterValue;
}

function setEchartOption(){

    var test;
    var polarString="[";
    for	(var index = 0; index < 6; index++) {
        //test = paramatersData[index];
        console.log(index);
        if (index <= 4){
            polarString += '{"text": '+index+', "max": "50000"},';
            console.log("inferieur a 5");
        }else {
            polarString += '{"text": '+index+', "max": "50000"}';
            console.log(polarString);
        }
        //console.log(polar);
    }
    polarString += "]";
    console.log(polarString);
    var JSONPolar = JSON.parse(polarString);

    var JSONString = '[{"text":"sales","max":6000},{"text":"tytty","max":20000},{"text":"papa","max":30000},{"text":"sales","max":50000},{"text":"zaza","max":60000},{"text":"popo","max":30000}]';

    var JSONObject = JSON.parse(JSONString);
    //console.log(JSONObject);      // Dump all data of the Object in the console
    //alert(JSONObject[4]["max"]); // Access Object data

    option = {
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
                indicator: JSONPolar
            }
        ],
        calculable: true,
        series: [
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
                indicator: [
                    {text: '（sales）', max: 6000},
                    {text: '（Administration）', max: 16000},
                    {text: '（Information Techology）', max: 30000},
                    {text: '（Customer Support）', max: 38000},
                    {text: '（Development）', max: 52000},
                    {text: '（Marketing）', max: 25000}
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
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000, 28000, 31000, 42000, 21000],
                        name: '（Actual Spending）'
                    }
                ]
            }
        ]
    };*/

    return option;
}


