window.onload = function () {

    var myChart = echarts.init(document.getElementById('box'));
    var data = [];
    var dataCount = 10;
    var startTime = +new Date(); //获取时间戳
    var categories = ['categoryA', 'categoryB', 'categoryC'];
    var types = [{
            name: 'JS Heap',
            color: '#7b9ce1'
        },
        {
            name: 'Documents',
            color: '#bd6d6c'
        },
        {
            name: 'Nodes',
            color: '#75d874'
        },
        {
            name: 'Listeners',
            color: '#e0bc78'
        },
        {
            name: 'GPU Memory',
            color: '#dc77dc'
        },
        {
            name: 'GPU',
            color: '#72b362'
        }
    ];

    // Generate mock data
    echarts.util.each(categories, function (category, index) {
        var baseTime = startTime;
        for (var i = 0; i < dataCount; i++) {
            var typeItem = types[Math.round(Math.random() * (types.length - 1))]; //types[0-5]
            var duration = Math.round(Math.random() * 10000); //0-10s
            data.push({
                name: typeItem.name,
                value: [
                    index,
                    baseTime,
                    baseTime += duration,
                    duration,
                    category
                ],
                itemStyle: {
                    normal: {
                        color: typeItem.color
                    }
                }

            });
            baseTime += Math.round(Math.random() * 2000);
        }
    });
    /*data 30个数据
    0: Object { name: "Documents", value: (5) […], itemStyle: {…} }
​
1: Object { name: "GPU", value: (5) […], itemStyle: {…} }
​
2: Object { name: "GPU Memory", value: (5) […], itemStyle: {…} }
​
3: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
4: Object { name: "Documents", value: (5) […], itemStyle: {…} }
​
5: Object { name: "Documents", value: (5) […], itemStyle: {…} }
​
6: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
7: Object { name: "Nodes", value: (5) […], itemStyle: {…} }
​
8: Object { name: "Documents", value: (5) […], itemStyle: {…} }
​
9: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
10: Object { name: "Nodes", value: (5) […], itemStyle: {…} }
​
11: Object { name: "GPU Memory", value: (5) […], itemStyle: {…} }
​
12: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
13: Object { name: "GPU", value: (5) […], itemStyle: {…} }
​
14: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
15: Object { name: "Documents", value: (5) […], itemStyle: {…} }
​
16: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
17: Object { name: "JS Heap", value: (5) […], itemStyle: {…} }
​
18: Object { name: "GPU", value: (5) […], itemStyle: {…} }
​
19: Object { name: "Nodes", value: (5) […], itemStyle: {…} }
​
20: Object { name: "JS Heap", value: (5) […], itemStyle: {…} }
​
21: Object { name: "GPU Memory", value: (5) […], itemStyle: {…} }
​
22: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
23: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
24: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
25: Object { name: "Listeners", value: (5) […], itemStyle: {…} }
​
26: Object { name: "Documents", value: (5) […], itemStyle: {…} }
​
27: Object { name: "Nodes", value: (5) […], itemStyle: {…} }
​
28: Object { name: "GPU", value: (5) […], itemStyle: {…} }
​
29: Object { name: "GPU Memory", value: (5) […], itemStyle: {…} }
    */
    // console.log(data);

    function renderItem(params, api) { //遍历了全部的数据，共30个
        var categoryIndex = api.value(0); //api.value(0)存放的30个index（各10个）: 0 1 2

        //api.coord将[X,Y]转换为屏幕上点的像素值,start是一个装载了30个数组的对象
        var start = api.coord([api.value(1), categoryIndex]);
        // console.log(start);
        // console.log([api.value(1), categoryIndex]);
        // console.log(api.coord);
        // console.log(start);
        var end = api.coord([api.value(2), categoryIndex]);
        /*
        api.size()
        给定数据范围，映射到坐标系上后的长度。例如，cartesian2d中
        ，api.size([2, 4]) 返回[12.4, 55]，表示 x 轴数据范围为 2
         映射得到长度是 12.4， y 轴数据范围为 4 时应设得到长度为 55
         。在一些坐标系中， 如极坐标系（ polar） 或者有 log 数轴的
         坐标系， 不同点的长度是不同的，所以需要第二个参数， 指定获
         取长度的点。
         */
        var height = api.size([0,1])[1] * .6;
        var rectShape = echarts.graphic.clipRectByRect({
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        }, {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        });
        return rectShape && {
            type: 'rect',
            shape: rectShape,
            style: api.style()
        };
    }


    option = {
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + ': ' + params.value[3] + ' ms';
            }
        },
        title: {
            text: 'Profile',
            left: 'center'
        },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }, {
            type: 'inside',
            filterMode: 'weakFilter'
        }],
        grid: {
            height: 300
        },
        xAxis: {
            min: startTime,
            scale: true,
            axisLabel: {
                formatter: function (val) {
                    return Math.max(0, val - startTime) + ' ms';
                }
            }
        },
        yAxis: {
            data: categories
        },
        series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1, 2],
                y: 0
            },
            data: data
        }]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}