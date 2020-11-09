window.onload = function () {

    var myChart = echarts.init(document.getElementById("box"));
    var symbolSize = 20;
    var data = [
        [15, 0],
        [-50, 10],
        [-56.5, 20],
        [-46.5, 30],
        [-22.1, 40]
    ];
    var option = {
        tooltip: {
            triggeron: 'none',
            formatter: function (params) {
                //Num.toFixed(num)，将Num四舍五入保留num位小数点,params传进来提示信息，它的数据项是坐标，params.data[0]=>x，params.data[1]=>y
                return '[X:' + params.data[0].toFixed(2) + ',  Y:' + params.data[1].toFixed(2) + "]";
            }
        },
        xAxis: {
            min: -100,
            max: 80,
            type: 'value',
            axisLine: {
                onZero: false
            }
        },
        yAxis: {
            min: -30,
            max: 60,
            type: 'value',
            axisLine: {
                onZero: false
            }
        },
        series: [{
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: 10,
            data: data
        }]
    }
    myChart.setOption(option);
    //设置一个可以拖拽的圆点在数据点上
    myChart.setOption({
        //echarts.util.map（数据组， 回调）遍历整个数据组，跟js中map（回调， 数据组）相反
        graphic: echarts.util.map(data, function (dataItem, dataIndex) {
            return {
                type: "circle",
                shape: {
                    r: symbolSize / 2
                },
                //position利用echarts.convertToPixel(转化的坐标轴对象， 数据项)来获取数据项的位置X,Y，
                //而position:[x,y]将圆心设置在[x，y]上
                position: myChart.convertToPixel("grid", dataItem),
                //设置不可见
                invisible: true,
                draggable: true,
                //将这个可拖拽的圆点图层设高一点
                z: 100,
                //拖拽响应函数echarts.util.curry（回调函数， 数据项索引（这个是拖拽后的数据项的索引，是回调的第一个参数））
                ondrag: echarts.util.curry(onPointDragging, dataIndex),
                onmousemove: echarts.util.curry(showToolTip, dataIndex),
                onmouseout: echarts.util.curry(hideToolTip, dataIndex),
                onmouseover:echarts.util.curry(showToolTip, dataIndex)
            };
        })
    });
    //在拖拽后获取当前坐标的数据值，并写入data中，然后更新系列的数据
    function onPointDragging(dataIndex) {
        data[dataIndex] = myChart.convertFromPixel("grid", this.position);
        myChart.setOption({
            series: [{
                id: 'a',
                data: data
            }]
        });
    }

    function showToolTip(dataIndex) {
        myChart.dispatchAction({
            type: "showTip",
            seriesIndex:0,
            dataIndex:dataIndex
        });
    }

    function hideToolTip() {
        myChart.dispatchAction({
            type: "hideTip"
        });
    }
    window.addEventListener('resize', function () {
        myChart.setOption({
            graphic: echarts.util.map(data, function (item) {
                return {
                    position: myChart.convertToPixel('grid', item)
                };
            })
        });
        // myChart.resize();
    });
}