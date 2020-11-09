// window.onload = function () {

//     var myChart = echarts.init(document.getElementById("calendar"));
//     var option = {
//         visualMap:{
//             show:false,
//             min: 0,
//             max: 1000
//         },
//         calendar:{
//             range:'2020'
//         },
//         series:{
//             type:'heatmap',
//             coordinateSystem:'calendar',
//             data:[['2020-01-01',3000],['2020-01-02',3500],['2020-01-03',4000]]
//         }

//     }
//     myChart.setOption(option);
//     window.addEventListener( 'resize',function(){ 
//         myChart.resize();
//     });
// }
window.onload = function () {

    var myChart = echarts.init(document.getElementById("calendar"));

    // 模拟数据
    function getVirtulData(year) {
        year = year || '2020';
        
        var date = +echarts.number.parseDate(year + '-01-01');
        var end = +echarts.number.parseDate(year + '-12-31');
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time <= end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 1000)
            ]);
        }
        return data;
    }
    var data = [] ;
    data[0] = getVirtulData();
    data[1] = getVirtulData(2021);
    var option = {
        visualMap: {
            show: false,
            min: 0,
            max: 1000
        },
        calendar: [{
                top:30,
                range: '2020',
                dayLable: {
                    show: true,
                    firstday: 1,
                    margin: 10,
                    position: "start",
                    nameMap: 'cn',
                    color: 'yellow'
                },
                mouthLabel: {
                    show: true,
                    position: 'start',
                    nameMap: "cn"
                }
            },
            {   
                top:200,
                range: '2021',
                dayLable: {
                    show: true,
                    firstday: 1,
                    margin: 10,
                    position: "start",
                    nameMap: 'cn',
                    color: 'yellow'
                },
                mouthLabel: {
                    show: true,
                    position: 'start',
                    nameMap: "cn"
                }
            }
        ],
        series: [{
                calendarIndex: 0,
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: data[0]
            },
            {
                calendarIndex: 1,
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: data[1]
            }
        ]

    }
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}