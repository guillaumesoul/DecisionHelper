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
        console.log("allez on ya va");

        //affichage du chart
        //$('#myModal').modal('show');

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
    return calculatedParameterValue;
}

function setEchartOption(paramatersData){

    console.log(paramatersData.length);

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
                indicator: [
                    {text: '（sales）', max: 6000},
                    {text: '（Administration）', max: 16000}
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
                        value: [4300, 10000],
                        name: '（Allocated Budget）'
                    },
                    {
                        value: [5000, 14000],
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


