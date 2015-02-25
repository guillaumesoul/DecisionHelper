$(document).ready(function(){

    // configure for module loader
    require.config({
        paths: {
            echarts: './bower_components/echarts/build/dist'
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


            option = {
                title : {
                    text: '（Budget vs spending）',
                    subtext: ''
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    y : 'bottom',
                    data:['（Allocated Budget）','（Actual Spending）']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                polar : [
                    {
                        indicator : [
                            { text: '（sales）', max: 6000},
                            { text: '（Administration）', max: 16000},
                            { text: '（Information Techology）', max: 30000},
                            { text: '（Customer Support）', max: 38000},
                            { text: '（Development）', max: 52000},
                            { text: '（Marketing）', max: 25000}
                        ]
                    }
                ],
                calculable : true,
                series : [
                    {
                        name: '（Budget vs spending）',
                        type: 'radar',
                        data : [
                            {
                                value : [4300, 10000, 28000, 35000, 50000, 19000],
                                name : '（Allocated Budget）'
                            },
                            {
                                value : [5000, 14000, 28000, 31000, 42000, 21000],
                                name : '（Actual Spending）'
                            }
                        ]
                    }
                ]
            };

            // Load data into the ECharts instance
            myChart.setOption(option);
        }
    );

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