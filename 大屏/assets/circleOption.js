var chartXYCN;
var option;
var mTime ;
function setOptionCircle(color,data){

    chartXYCN = echarts.init(document.getElementById("XYCN"));
   
    option = {
      color: color,
      legend: {
        top: '15%',
        itemHeight: 10, // 图形高度
        itemWidth: 18, // 图形宽度
        left: '50%',
          itemGap: 0,
        formatter: function(name){
            const count = arrCount(data)
            //找到data中name和文本name值相同的对象
            const val = data.filter(item => {
              return item.name === name
            })
            let num = Number((val[0].value / count)*100).toFixed(1)

            return  ['{a|'+name+'}', '  {b|' + num +'% }' ]
        } ,
        textStyle:{
            color: "#9CA9C3",
            rich: {
                a: {
                    color: '#9CA9C3',
                    fontSize:9,
                },
                b: {
                    color: '#08d0ea',
                    fontSize:13,
                }
            }
        },
        width:"50%",
    },
      calculable: true,
      series: [
      //外层圆
        {
          name: "圆圈",
          type: "pie",
          radius: ['48%', '55%'],
          right: "50%",
          clockWise: false, //顺时加载
          hoverAnimation: true,
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
          },
          data: data,//这里赋值
        },
        {
          type: "pie",
          clockWise: true, //顺时加载
          hoverAnimation: true, //鼠标移入变大
          radius: ['48%', '55%'],
          right: "50%",
          tooltip: {
            show: false,
          },
          label: {
            show: false,
            position: "center",
            color: "#fff",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "10",
              fontWeight: "bold",
              formatter: ["{a|{c}}", "{b|{b}}"].join("\n"),
              rich: {
                a: {
                    color: '#fff',
                    fontSize:23,
                },
                b: {
                    color: '#08c7e1',
                }
              },
            },
          },
          data: data,
          itemStyle: {
            normal: {
              labelLine: {
                show: false,
              },
            },
          },
        },
      ],
    };
   chartXYCN.setOption(option);
    let index = 0; //高亮所在下标
    let dataLength = option.series[0].data.length; // 当前饼图有多少个扇形
    mTime = setInterval(() => {
     chartXYCN.dispatchAction({
        type: "downplay",
        seriesIndex: 1, //里层的圆形
        dataIndex: index % dataLength,
      });
      index++;
     chartXYCN.dispatchAction({
        type: "highlight",
        seriesIndex: 1,
        dataIndex: index % dataLength,
      });
    }, 2000);

    //  鼠标划入
   // chartXYCN.on("mouseover", (e) => {
   //    // 停止定时器，清除之前的高亮
   //    clearInterval(mTime);
   //   chartXYCN.dispatchAction({
   //      type: "downplay",
   //      seriesIndex: 1 //清一下高亮
   //    });
   //   chartXYCN.dispatchAction({
   //      type: "highlight",
   //      seriesIndex: 1,
   //      dataIndex: e.dataIndex, //当前鼠标选中的高亮
   //    });
   //  });
   // chartXYCN.on("mouseout", (e) => {
   //    clearInterval(mTime);
   //   chartXYCN.dispatchAction({
   //      type: "downplay",
   //      seriesIndex: 1,
   //      dataIndex: e.dataIndex,
   //    }); //鼠标移出后先把上次的高亮取消
   //    mTime = setInterval(() => {
   //      // 取消高亮指定的数据图形
   //     chartXYCN.dispatchAction({
   //        type: "downplay",
   //        seriesIndex: 1,
   //        dataIndex: index % dataLength,
   //      });
   //      index++;
   //      // 高亮指定的数据图形
   //     chartXYCN.dispatchAction({
   //        type: "highlight",
   //        seriesIndex: 1,
   //        dataIndex: index % dataLength,
   //      });
   //    }, 2000);
   //  });
    }
// 获取饼状图所有value 的总和
function arrCount(arr) {
    let count = 0
    arr.forEach(item => {
      count = count + item.value
    })
    return count
  }

    function refreshData(color,data) {
        if(!chartXYCN){
            setOptionCircle(color,data)
            window.onresize = chartXYCN.resize;
        }
        clearInterval(mTime);
        var option = chartXYCN.getOption();
        option.color = color
        option.series[0].data = data;
        option.series[1].data = data;
        chartXYCN.setOption(option);
        window.onresize = chartXYCN.resize;
       let index = 0; //高亮所在下标
      let  dataLength = option.series[0].data.length; // 当前饼图有多少个扇形
        mTime = setInterval(() => {
            chartXYCN.dispatchAction({
            type: "downplay",
            seriesIndex: 1, //里层的圆形
            dataIndex: index % dataLength,
        });
        index++;
        chartXYCN.dispatchAction({
            type: "highlight",
            seriesIndex: 1,
            dataIndex: index % dataLength,
        });
    }, 2000);
    }

