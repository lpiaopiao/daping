
$(document).ready(function () {
    // 网页可见区域宽： document.body.clientWidth
    // 网页可见区域高： document.body.clientHeight
    // 屏幕分辨率的高： window.screen.height
    // 屏幕分辨率的宽： window.screen.width
    // console.log($(document).height()); //浏览器当前窗口文档的高度
    // console.log($(document.body).outerHeight(true));//浏览器当前窗口文档body的总高度 包括border padding margin
    // console.log($(document).width());//浏览器当前窗口文档对象宽度
    // console.log($(document.body).outerWidth(true));//浏览器当前窗口文档body的总宽度 包括border padding margin
    // ScreenResolution()

    // 设计 1920*1080
    var resizeTimer = null;
    $(window).bind('resize', function (){
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function(){
            // ScreenResolution();
        } , 100);
    });

    // 时间
    setInterval(function () {
        var time = new Date();//获取系统当前时间
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();//系统时间月份中的日
        var day = time.getDay();//系统时间中的星期值
        var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        var week = weeks[day];//显示为星期几
        var hour = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        if (month < 10) { month = "0" + month; }
        if (date < 10) { date = "0" + date; }
        if (hour < 10) { hour = "0" + hour; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        document.getElementById("TIMECLOCK").innerHTML = year + "年" + month + "月" + date + "日   " + week + " " + hour + ":" + minutes + ":" + seconds;
        // 按日刷新数据
        if (hour == "00" && minutes == "00" && seconds == "00") {
            window.location.reload();
        }
    }, 1000);

    console.log($('#SJGJCHART'))

});

function SetOption(bardata, barcolor) {
    var barData = [];
    var barIndex =[];
    var barName = [];
    
    var barValue=[];
    bardata.forEach(function (item,index) {
        barData.push(item['name']);
        barValue.push(item.value);
        barIndex.push(index+1);
        barName.push('');
    });

    return {
        grid: {
            top: 15,
            bottom: 15,
            right: '8%',
            left: '50%'
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            inverse: true,
            splitLine: {
                show: true,
                lineStyle: { color: 'rgba(19,28,60,1)' }
            },
            axisTick: {
                length: 100,
                lineStyle: { color: 'rgba(19,28,60,1)' }
            },
            axisLine: {
                show: false
            },
            data: barName
        }, {
            nameLocation: 'start',
            nameTextStyle: {
                fontWeight: 'bold'
            },
            position: 'left',
            offset: 177,
            axisLine: {
                onZero: false,
                show: false
            },
            axisTick: {
                length: 100,
                inside: true,
                lineStyle: { color: 'rgba(19,28,60,1)' }
            },

            axisLabel: {
                inside: true,
                color: '#bcc1dd',
                formatter: function (value, index) {
                    var deptStr = value;
                    if (value.length > 12) {
                        deptStr = value.substring(0, 12) + '...';
                    }
                    let ind = index+1+' '
                    return ['{a|'+ind+'} {b|' + deptStr +'}' ]
                },
                textStyle:{
                    color: "#9CA9C3",
                    rich: {
                        a: {
                            color: '#6670AC',
                        },
                        b: {
                            color: '#BCC1DD',
                        }
                    }
                },
            },
            inverse: true,
            data: barData
        }, {
            nameLocation: 'start',
            nameTextStyle: {
                fontWeight: 'bold'
            },
            position: 'left',
            offset: 237,
            axisLine: {
                onZero: false,
                show: false
            },
            axisTick: {
                length: 100,
                inside: true,
                lineStyle: { color: 'rgba(19,28,60,1)' }
            },
            axisLabel: {
                inside: true,
                color: '#6670ac',
                fontSize: 15,
            },
            inverse: true,
            data: barIndex
        }
        ],
        series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: bardata,
            barWidth: 8,
            barCategoryGap: 80,
            realtimeSort: true,
            animationDuration: 0,
            animationDurationUpdate: 5000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            label: {
                normal: {
                    show: true,
                    formatter:function(val){
                    	  if(val.value != null){
                  	        var res=val.value.toString().replace(/\d+/, function(n){ // 先提取整数部分
                  	            return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
                  	                return $1+",";
                  	            });
                  	        })
                  	        return res;
                  	    } else{
                  	        return 0;
                  	    }
                    },
                    position: 'right',
                    color: '#6670ac'
                }
            },
            itemStyle: {
                color: function (val) {
                    if (val.dataIndex < 3) {
                        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: barcolor[0][0]
                        },
                        {
                            offset: 1,
                            color: barcolor[0][1]
                        }
                        ])
                    } else {
                        return barcolor[1]
                    }
                },
                barBorderRadius: 30
            }
        }]
    };
}

// 获取饼状图所有value 的总和
function arrCount(arr) {
    let count = 0
    arr.forEach(item => {
      count = count + item.value
    })
    return count
  }

function setOptionCircle(bardata, barcolor){

    var barData = [];
    var barIndex =[];
    var barName = [];
    
    var barValue=[];
    bardata.forEach(function (item,index) {
        barData.push(item['name']);
        barValue.push(item.value);
        barIndex.push(index+1);
        barName.push('');
    });

    return {
        tooltip: {
            trigger: 'item'
          },
        legend: {
            top: '5%%',
            itemHeight: 5, // 图形高度
            itemWidth: 14, // 图形宽度
            right: '0',
            formatter: function(name){
                const count = arrCount(bardata)
                //找到data中name和文本name值相同的对象
                const val = bardata.filter(item => {
                  return item.name === name
                })
                let num = (((val[0].value / count).toFixed(3)) * 100).toFixed(1)
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
            width:"63%",
        },
        
        series: [{
            // name: '圈',
            type: 'pie',
            radius: ['48%', '55%'],
            avoidLabelOverlap: false,
            data: bardata,
            itemStyle:barcolor ,
            right: "55%",
            emphasis: {
                label: {
                    show: true,
                }
            },
            label: {
                show: true,
                position: 'center',
                fontSize: '13',
                formatter: function(name){
                    
                    return  ['{a|'+bardata[0].value+'}', '  {b|' + bardata[0].name +' }' ].join('\n')
                } ,
                rich: {
                    a: {
                        color: '#fff',
                        fontSize:23,
                       
                    },
                    b: {
                        color: '#08c7e1',
                        // fontSize:15,
                    }
                }

            },
            labelLine: {
                show: false
            },

        }]
    };
    

}
function getArrByKey(data, k) {
    var key = k || "value";
    var res = [];
    if (data) {
        data.forEach(function (t) {
            res.push(t[key]);
        });
    }
    return res;
};

// 数字翻转
function flipNumCard(num, len, dom) {
    var strHtml = "";
    for (var i = 0; i < len; i++) {
        strHtml += '<li class="number-item">\n' +
            '                <span><i class="item" ref="numberItem">0123456789</i></span>\n' +
            '            </li>';
    }
    $(dom).html(strHtml);

    var orderNum = toOrderNum(num, len)

    // 定时改变数字
    var flipInterval = setInterval(function setInt() {
        setNumberTransform(orderNum);
        clearInterval(flipInterval)
    }, 1000)
}
function toOrderNum(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}
function setNumberTransform(num) {
    var numberItems = $('.item');
    var chartNum = num.split('') // 将其便变成数据
    const numberArr = chartNum.filter(item => !isNaN(item));
    for (var index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index];
        elem.style.transform = 'translate(-50%, -' + numberArr[index] * 10 + '%)'
    }
}
var w =  $(document.body).outerWidth(true);
var h =  $(document.body).outerHeight(true);
// console.log(window)
// 屏幕输配
function ScreenResolution() {

    // var bWidth = $(document.body).outerWidth(true);
    // var bHeight = $(document.body).outerHeight(true);
    // if(!w){
    //     w =  $(document.body).outerWidth(true);
    //     h =  $(document.body).outerHeight(true);
    // }
    // var ScaleNumW = bWidth / w;
    // var ScaleNumH = bHeight / h;
    // // var ScaleNumW = bWidth / 8192;
    // // var ScaleNumH = bHeight / 3240;

    // // var ScaleNum = 1;
    // if (ScaleNumW > ScaleNumH) {
    //     ScaleNum = ScaleNumH
    //     // $('.screen-container').width(1920 * ScaleNumH)
    //     // $('.screen-container').height(bHeight);
    // } else {
    //     ScaleNum = ScaleNumW
    //     // $('.screen-container').width(bWidth)
    //     // $('.screen-container').height(1080 * ScaleNumW);
    // }
    // var screenCss = {
    //     // "width": "1920px",
    //     // "height": "1080px",
    //     "transform": 'scale(' + ScaleNum + ',' + ScaleNum + ')',
    // }
    // $('.dashboard-container').css(screenCss);
    // $('.dashboard-container').css(screenCss);

    //为canvas 添加自适应
}

// div resize重写
(function ($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function () {
            a.each(function () {
                var n = $(this),
                    m = n.width(),
                    l = n.height(),
                    o = $.data(this, d);
                if (m !== o.w || l !== o.h) {
                    n.trigger(j, [o.w = m, o.h = l]);
                }
            });
            g();
        },
            e[b]);
    }
})(jQuery, this);