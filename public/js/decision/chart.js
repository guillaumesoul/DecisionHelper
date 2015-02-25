$(document).ready(function() {

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
            };

            // Load data into the ECharts instance
            myChart.setOption(option);
        }
    );
});