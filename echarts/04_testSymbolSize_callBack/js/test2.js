window.onload = function () {
    var size = [16, 10, 20, 30, 48,50,40];
    var myChart = echarts.init(document.getElementById("box1"));

    var option = {
        tooltip:{
            trigger:'axis',
            formatter: '{a}<br>'+
                '{b}:{c}'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:'收入',
            data: [820, 820, 800, 900, 780, 500,1000],
            symbol: 'circle',
            //symbolSize后接回调函数时，回调函数function(数据值value，数据值有关的参数params)
            //然后再操作。有这样的，定义一个数组var size = [series里的symbol的大小值1，值2，...]，
            //然后在回调函数里返回 size[params.dataIndex]这样就获取到了symbol的大小。
            symbolSize: (value,params) => size[params.dataIndex],
            type: 'line',
            smooth: true
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}
// window.onload = function () {

//     var myChart = echarts.init(document.getElementById("box1"));
//     var option = {
//         xAxis: {
//             type: 'category',
//             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//         },
//         yAxis: {
//             type: 'value'
//         },
//         series: [{
//             data: [820, 932, 901, 934, 1290, 1330, 1320],
//             type: 'line'
//         }]
//     };

//     myChart.setOption(option);
//     window.addEventListener( 'resize',function(){ 
//         myChart.resize();
//     });
// }