$(function () {

  //部门概述
  // $.post(ctx + "/screenController/dtcitydata.action",{} , function(data) {
    let datas = {

    };
   let  data = []
    let chartSJZ;
    console.log(data);
    const geoCoordMap = [
      { name: "新平彝族傣族自治县", value: [102.137345, 23.8438430000001], data: ['新平彝族傣族自治县', 2, 3, 4, 5] ,type:0,color:''},
      { name: "峨山彝族自治县", value: [102.567345, 24.103843], data: ['峨山彝族自治县', 2, 3, 4, 5],type:0,color:''},
      { name: "红塔区", value: [102.517345, 24.143843], data: ['红塔区', 2, 3, 4, 5] ,type:0,color:'yellow'},
      { name: "江川县", value: [102.657345, 24.443843], data: ['江川县', 2, 3, 4, 5],type:0,color:'' },
      { name: "通海县", value: [102.607345, 24.053843], data: ['通海县', 2, 3, 4, 5],type:0,color:'#00aced'},
      { name: "易门县", value: [101.937345, 24.623843], data: ['易门县', 2, 3, 4, 5] ,type:0,color:'red'},
      { name: "元江哈尼族彝族傣族自治县", value: [102.137345, 23.833843], data: ['元江哈尼族彝族傣族自治县', 2, 3, 4, 5] ,type:0,color:''},
      { name: "华宁县", value: [103.037345, 24.0338430000001], data: ['华宁县', 2, 3, 4, 5] ,type:0,color:''},
      { name: "澄江县", value: [103.023822050781, 24.823843], data: ['澄江县', 2, 3, 4, 5] ,type:0,color:''},
      { name: "峨山彝族自治县", value: [102.567345, 24.103843], data: ['峨山彝族自治县', 2, 3, 4, 5],type:1,color:'#00aced'},
      { name: "红塔区", value: [102.517345, 24.143843], data: ['红塔区', 2, 3, 4, 5] ,type:1,color:'yellow'},
      { name: "江川县", value: [102.657345, 24.443843], data: ['江川县', 2, 3, 4, 5],type:1,color:'#00aced' },
      { name: "通海县", value: [102.607345, 24.053843], data: ['通海县', 2, 3, 4, 5],type:1,color:'#00aced'},
      { name: "新平彝族傣族自治县", value: [102.137345, 23.8438430000001], data: ['新平彝族傣族自治县', 2, 3, 4, 5] ,type:1,color:'blue'},
      { name: "易门县", value: [101.937345, 24.623843], data: ['易门县', 2, 3, 4, 5] ,type:1,color:'#00aced'},
      { name: "元江哈尼族彝族傣族自治县", value: [102.137345, 23.833843], data: ['元江哈尼族彝族傣族自治县', 2, 3, 4, 5] ,type:1,color:'#00aced'},
      { name: "华宁县", value: [103.037345, 24.0338430000001], data: ['华宁县', 2, 3, 4, 5] ,type:1,color:'#00aced'},
      { name: "澄江县", value: [103.023822050781, 24.823843], data: ['澄江县', 2, 3, 4, 5] ,type:1,color:'#00aced'}
    ];

    const sjzDatas = [[114.944245, 38.178372], [114.944245, 38.178372], [115.292201, 37.916568]];
    //绘制石家庄地图
    $.getJSON("./assets/530400.json", function (data) {
      //注册地图
      echarts.registerMap('sjz', data);
      chartSJZ = echarts.init(document.getElementById('sjzEcharts'));
      let option = {
        backgroundColor: "transparent",
        geo: {
          zoom: 1,
          show: true,
          roam: true, //是否允许鼠标滚动放大，缩小
          // map:self.mode === 'hospital'?'sjz':'sjz_district' ,
          map: "sjz",
          label: {
            //图形上的文本标签，可用于说明图形的一些数据信息
            show: false, //是否显示文本
            color: "#fff", //文本颜色
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: "#007df3",
            areaColor: "#043270", //地图区域的颜色。
          },
          emphasis: {
            //高亮状态下的多边形和标签样式。
            label: {
              //文本
              color: "#fff",
            },
            itemStyle: {
              areaColor: "#017ef4", //区域
            },
          },
          regions: [
            {
              name: "平山县",
              itemStyle: {
                areaColor: "#017ef4",
              },
              label: {
                show: true,
              },
            },
          ], //默认高亮区域
          data: geoCoordMap,
        },
        tooltip: {
          show: true,
          trigger: "item",
          formatter: function (datas) {
            console.log(datas);
          },
        },
        series: [
          {
            type: "scatter", //样试
            effectType: "ripple",
            // showEffectOn: 'render',
            coordinateSystem: "geo", //该系列使用的坐标系
            itemStyle: {
              //样试。
              normal: {
                //默认样试
                color: "#ff0000"
              },
            },
            // data: self.convertData(self.sjzDatas),
            // data: geoCoordMap,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
            },

            symbolSize: 10,
            rippleEffect: {
              //涟漪特效相关配置。
              brushType: "stroke", //波纹的绘制方式
            },
            hoverAnimation: true, //鼠标移入放大圆.
          },
        ],
      }
      let count = 0;
      let boolean = false
      let timer = null;
      let spanData ;
      clearInterval(timer);
      let divs = document.getElementById("echartsDatas");
      let spans = divs.getElementsByClassName("listNum")
      let mapTitle = document.querySelector('.mapTitle')
      timer = setInterval(function () {
        let coord = geoCoordMap[count]
        // type: 0区县 1 非区县
        if (!geoCoordMap[count].type) {
          option.series[0].data = [];
          option.geo.regions[0].name =option.geo.data[count].name;
        } else {
          //
          option.geo.regions[0].name = "";
          // 设置点的颜色
          option.series[0].itemStyle.normal.color = geoCoordMap[count].color;
          // 设置点的位置
          option.series[0].data = [coord];

        }
        // 地图下方列表标题
        mapTitle.innerHTML = coord.name
        // 地图下方列表
        spanData = geoCoordMap[count].data
        for (let i = 0; i < spans.length; i++) {
          spans[i].innerHTML = spanData[i]
        }
        // setTimeout(() => {
        //   chartSJZ.clear();
          chartSJZ.setOption(option)
          window.onresize = chartSJZ.resize;
        // }, 500);
        count++;
        if (count === option.geo.data.length) {
          count = 0;
          boolean = !boolean
        }

        //掉接口切换下面数据
      }, 2500);
      chartSJZ.on("click", function (params) {
        console.log(params);
        // option.geo.regions[0].name = params.name;
        // echarts.setOption(option);
        // clearInterval(timer);
      });
      //绘制地图
      // chartSJZ.setOption(renderOption('china',provincesData,renderChinaData(TestData),1.2));

    });
  // });


})
