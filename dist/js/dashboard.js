"use strict";

/**
 * @author: yiyh
 */
$(function () {
  'use strict'; // 1. 热门学科top10分布

  var hotSubjectTop10Charts;
  var normalColor = ['#084a9d', '#4e3692', '#5b61a2', '#1171a0', '#03909b', '#114975', '#446c9e', '#093f89', '#74beda', '#5d7f9b'];
  var hoverColor = '#bcb31e';
  var hotSubjectTop10Opts;
  var hotSubjectTop10Data = [{
    name: '语文',
    value: 154
  }, {
    name: '数学',
    value: 115
  }, {
    name: '美术',
    value: 113
  }, {
    name: '英语',
    value: 95
  }, {
    name: '物理',
    value: 92
  }, {
    name: '化学',
    value: 87
  }, {
    name: '生物',
    value: 87
  }, {
    name: '地理',
    value: 60
  }, {
    name: '劳动',
    value: 60
  }, {
    name: '体育',
    value: 60
  }];
  var hotSubjectTop10Style = [{
    offset: [50, 50]
  }, {
    offset: [2, 80]
  }, {
    offset: [63, 15]
  }, {
    offset: [16, 30]
  }, {
    offset: [64, 70]
  }, {
    offset: [85, 65]
  }, {
    offset: [80, 18]
  }, {
    offset: [40, 65]
  }, {
    offset: [9, 70]
  }, {
    offset: [25, 15]
  }];
  var datas = [];
  var total = hotSubjectTop10Data.reduce(function (acc, next) {
    return acc + next.value;
  }, 0);

  for (var i = 0; i < hotSubjectTop10Data.length; i++) {
    var item = hotSubjectTop10Data[i];
    var itemToStyle = hotSubjectTop10Style[i];
    datas.push({
      name: (item.value / total * 100 || 0).toFixed(2) + '%\n' + item.name,
      value: itemToStyle.offset,
      symbolSize: Math.round(item.value / total * 100 * 4 + 20),
      label: {
        normal: {
          textStyle: {
            fontSize: 14,
            color: '#fff'
          }
        }
      },
      itemStyle: {
        normal: {
          color: normalColor[i]
        }
      }
    });
  }

  hotSubjectTop10Opts = {
    grid: {
      show: false,
      top: 10,
      bottom: 10
    },
    xAxis: [{
      gridIndex: 0,
      type: 'value',
      show: false,
      min: 0,
      max: 100,
      nameLocation: 'middle',
      nameGap: 5
    }],
    yAxis: [{
      gridIndex: 0,
      min: 0,
      show: false,
      max: 100,
      nameLocation: 'middle',
      nameGap: 30
    }],
    series: [{
      type: 'scatter',
      symbol: 'circle',
      symbolSize: 120,
      label: {
        normal: {
          show: true,
          formatter: '{b}',
          color: '#fff',
          textStyle: {
            fontSize: '20'
          }
        }
      },
      itemStyle: {
        normal: {
          borderWidth: '3',
          borderType: 'solid',
          borderColor: '#fff',
          color: hoverColor,
          shadowColor: hoverColor,
          shadowBlur: 10
        }
      },
      data: datas
    }]
  }; // 2. 学科年级使用情况

  var subjectUsageCharts;
  var subjectUsageOpts;
  var subjectUsageAnimationTime = 3000; //动画定时时间

  var subjectUsageIndex = 0; //第几个显示

  var subjectUsageDatas = [{
    value: 60,
    name: '一年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 5,
    name: '二年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 11,
    name: '三年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 15,
    name: '四年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 22,
    name: '五年级',
    normal: {
      position: 'center'
    }
  }, {
    value: 35,
    name: '六年级'
  }];

  var subjectUsageAnimation = function subjectUsageAnimation(chart, seriesIndex) {
    if (!seriesIndex) seriesIndex = 0; // 默认是0

    var options = chart.getOption();
    options.series[seriesIndex].data.forEach(function (data, i) {
      options.series[seriesIndex].data[i].label.emphasis = {
        show: subjectUsageIndex === i
      };
    });
    chart.setOption(options);

    if (subjectUsageIndex > 0) {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: subjectUsageIndex - 1
      });
    }

    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: subjectUsageIndex
    });
    subjectUsageIndex++;

    if (subjectUsageIndex >= options.series[seriesIndex].data.length) {
      subjectUsageIndex = 0;
    }
  }; //数据组装


  var getPieData = function getPieData(dataMap) {
    var dataArr = [];
    subjectUsageDatas.forEach(function (data, i) {
      dataArr.push({
        name: data.name,
        value: data.value,
        label: {
          normal: {
            show: false,
            position: 'center'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        }
      });
    });
    return dataArr;
  };

  var subjectUsageDataList = getPieData(subjectUsageDatas);
  subjectUsageOpts = {
    color: ['#1bbdfc', '#df0bff', '#ff8a00', '#ffc029', '#fffc00', '#a7e307', '#05e100', '#00ff8a', '#02d8cb'],
    series: [{
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['55%', '75%'],
      selectedMode: 'single',
      avoidLabelOverlap: false,
      labelLine: {
        normal: {
          show: false
        }
      },
      label: {
        normal: {
          color: '#fff',
          fontSize: 16,
          lineHeight: 20,
          formatter: '{b}\n{d}%'
        }
      },
      data: subjectUsageDataList
    }]
  }; // 语文热门教材top5

  var textbookTop5Charts;
  var textbookTop5ChartsOpts;
  var textbookTop5DataList = [{
    name: '二年级上册',
    value: 999
  }, {
    name: '二年级下册',
    value: 888
  }, {
    name: '三年级上册',
    value: 777
  }, {
    name: '五年级上册',
    value: 777
  }, {
    name: '一年级上册',
    value: 777
  }];
  var textbookTop5Count = textbookTop5DataList.reduce(function (acc, next) {
    return acc += next.value;
  }, 0);
  textbookTop5ChartsOpts = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: ''
      },
      formatter: function formatter(obj) {
        return obj[0].name + '<br>教材用户：' + (obj[0].value / textbookTop5Count * 100).toFixed(2) + '%';
      }
    },
    grid: {
      // top: '10%',
      // left: '3%',
      // right: '3%',
      // bottom: '0',
      top: '14',
      left: '18',
      right: '18',
      bottom: '-6',
      containLabel: true
    },
    yAxis: [{
      type: 'category',
      data: textbookTop5DataList.map(function (item) {
        return item.name;
      }),
      inverse: true,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#fff'
        }
      }
    }],
    xAxis: [{
      type: 'value',
      show: false,
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 12,
          color: '#53a8fa'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#192469'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#17367c'
        }
      }
    }],
    series: [{
      name: '热门学科TOP5',
      type: 'bar',
      barMaxWidth: 20,
      // barWidth:26,
      data: textbookTop5DataList,
      label: {
        normal: {
          show: true,
          position: 'insideRight',
          textStyle: {
            color: 'white' //color of value

          },
          formatter: function formatter(obj) {
            return (obj.value / textbookTop5Count * 100).toFixed(2) + '%';
          }
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: '#4465f3' // 0% 处的颜色

          }, {
            offset: 1,
            color: '#00faff' // 100% 处的颜色

          }], false),
          barBorderRadius: [15, 15, 15, 15],
          shadowColor: 'rgba(0,0,0,0.1)',
          shadowBlur: 0
        },
        emphasis: {
          shadowBlur: 4,
          shadowColor: '#3c526e',
          borderWidth: 2,
          borderColor: '#0a2f5c'
        }
      }
    }]
  }; //map echarts

  var mapCharts;
  var mapOpts;
  var geoCoordMap = {
    上海: [121.4648, 31.2891],
    东莞: [113.8953, 22.901],
    东营: [118.7073, 37.5513],
    中山: [113.4229, 22.478],
    临汾: [111.4783, 36.1615],
    临沂: [118.3118, 35.2936],
    丹东: [124.541, 40.4242],
    丽水: [119.5642, 28.1854],
    乌鲁木齐: [87.9236, 43.5883],
    佛山: [112.8955, 23.1097],
    保定: [115.0488, 39.0948],
    兰州: [103.5901, 36.3043],
    包头: [110.3467, 41.4899],
    北京: [116.4551, 40.2539],
    北海: [109.314, 21.6211],
    南京: [118.8062, 31.9208],
    南宁: [108.479, 23.1152],
    南昌: [116.0046, 28.6633],
    南通: [121.1023, 32.1625],
    厦门: [118.1689, 24.6478],
    台州: [121.1353, 28.6688],
    合肥: [117.29, 32.0581],
    呼和浩特: [111.4124, 40.4901],
    咸阳: [108.4131, 34.8706],
    哈尔滨: [127.9688, 45.368],
    唐山: [118.4766, 39.6826],
    嘉兴: [120.9155, 30.6354],
    大同: [113.7854, 39.8035],
    大连: [122.2229, 39.4409],
    天津: [117.4219, 39.4189],
    太原: [112.3352, 37.9413],
    威海: [121.9482, 37.1393],
    宁波: [121.5967, 29.6466],
    宝鸡: [107.1826, 34.3433],
    宿迁: [118.5535, 33.7775],
    常州: [119.4543, 31.5582],
    广州: [113.5107, 23.2196],
    廊坊: [116.521, 39.0509],
    延安: [109.1052, 36.4252],
    张家口: [115.1477, 40.8527],
    徐州: [117.5208, 34.3268],
    德州: [116.6858, 37.2107],
    惠州: [114.6204, 23.1647],
    成都: [103.9526, 30.7617],
    扬州: [119.4653, 32.8162],
    承德: [117.5757, 41.4075],
    拉萨: [91.1865, 30.1465],
    无锡: [120.3442, 31.5527],
    日照: [119.2786, 35.5023],
    昆明: [102.9199, 25.4663],
    杭州: [119.5313, 29.8773],
    枣庄: [117.323, 34.8926],
    柳州: [109.3799, 24.9774],
    株洲: [113.5327, 27.0319],
    武汉: [114.3896, 30.6628],
    汕头: [117.1692, 23.3405],
    江门: [112.6318, 22.1484],
    沈阳: [123.1238, 42.1216],
    沧州: [116.8286, 38.2104],
    河源: [114.917, 23.9722],
    泉州: [118.3228, 25.1147],
    泰安: [117.0264, 36.0516],
    泰州: [120.0586, 32.5525],
    济南: [117.1582, 36.8701],
    济宁: [116.8286, 35.3375],
    海口: [110.3893, 19.8516],
    淄博: [118.0371, 36.6064],
    淮安: [118.927, 33.4039],
    深圳: [114.5435, 22.5439],
    清远: [112.9175, 24.3292],
    温州: [120.498, 27.8119],
    渭南: [109.7864, 35.0299],
    湖州: [119.8608, 30.7782],
    湘潭: [112.5439, 27.7075],
    滨州: [117.8174, 37.4963],
    潍坊: [119.0918, 36.524],
    烟台: [120.7397, 37.5128],
    玉溪: [101.9312, 23.8898],
    珠海: [113.7305, 22.1155],
    盐城: [120.2234, 33.5577],
    盘锦: [121.9482, 41.0449],
    石家庄: [114.4995, 38.1006],
    福州: [119.4543, 25.9222],
    秦皇岛: [119.2126, 40.0232],
    绍兴: [120.564, 29.7565],
    聊城: [115.9167, 36.4032],
    肇庆: [112.1265, 23.5822],
    舟山: [122.2559, 30.2234],
    苏州: [120.6519, 31.3989],
    莱芜: [117.6526, 36.2714],
    菏泽: [115.6201, 35.2057],
    营口: [122.4316, 40.4297],
    葫芦岛: [120.1575, 40.578],
    衡水: [115.8838, 37.7161],
    衢州: [118.6853, 28.8666],
    西宁: [101.4038, 36.8207],
    西安: [109.1162, 34.2004],
    贵阳: [106.6992, 26.7682],
    连云港: [119.1248, 34.552],
    邢台: [114.8071, 37.2821],
    邯郸: [114.4775, 36.535],
    郑州: [113.4668, 34.6234],
    鄂尔多斯: [108.9734, 39.2487],
    重庆: [107.7539, 30.1904],
    金华: [120.0037, 29.1028],
    铜川: [109.0393, 35.1947],
    银川: [106.3586, 38.1775],
    镇江: [119.4763, 31.9702],
    长春: [125.8154, 44.2584],
    长沙: [113.0823, 28.2568],
    长治: [112.8625, 36.4746],
    阳泉: [113.4778, 38.0951],
    青岛: [120.4651, 36.3373],
    韶关: [113.7964, 24.7028]
  };
  var BJData = [[{
    name: '北京'
  }, {
    name: '上海',
    value: 95
  }], [{
    name: '北京'
  }, {
    name: '广州',
    value: 90
  }], [{
    name: '北京'
  }, {
    name: '大连',
    value: 80
  }], [{
    name: '北京'
  }, {
    name: '南宁',
    value: 70
  }], [{
    name: '北京'
  }, {
    name: '南昌',
    value: 60
  }], [{
    name: '北京'
  }, {
    name: '拉萨',
    value: 50
  }], [{
    name: '北京'
  }, {
    name: '长春',
    value: 40
  }], [{
    name: '北京'
  }, {
    name: '包头',
    value: 30
  }], [{
    name: '北京'
  }, {
    name: '重庆',
    value: 20
  }], [{
    name: '北京'
  }, {
    name: '常州',
    value: 10
  }]];
  var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

  var convertData = function convertData(data) {
    var res = [];

    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = geoCoordMap[dataItem[0].name];
      var toCoord = geoCoordMap[dataItem[1].name];

      if (fromCoord && toCoord) {
        res.push([{
          coord: fromCoord
        }, {
          coord: toCoord
        }]);
      }
    }

    return res;
  };

  var mapChartsColor = ['#a6c84c', '#ffa022', '#46bee9'];
  var mapChartsSeries = [];
  [['北京', BJData]].forEach(function (item, i) {
    mapChartsSeries.push({
      name: item[0] + ' Top10',
      type: 'lines',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: '#fff',
        symbolSize: 3
      },
      lineStyle: {
        normal: {
          color: mapChartsColor[i],
          width: 0,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    }, {
      name: item[0] + ' Top10',
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        normal: {
          color: mapChartsColor[i],
          width: 1,
          opacity: 0.4,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    }, {
      name: item[0] + ' Top10',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function symbolSize(val) {
        return val[2] / 8;
      },
      itemStyle: {
        normal: {
          color: mapChartsColor[i]
        }
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        };
      })
    });
  });
  mapOpts = {
    tooltip: {
      trigger: 'item'
    },
    geo: {
      map: 'china',
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#034598',
          borderColor: '#0976c2'
        },
        emphasis: {
          areaColor: '#023a80'
        }
      }
    },
    series: mapChartsSeries
  }; // realtimeUser

  var realtimeUserCharts;
  var realtimeUserChartsOpts;
  var realtimeUserDatalist = [{
    name: '11:33:55',
    value: 70
  }, {
    name: '11:34:55',
    value: 40
  }, {
    name: '11:35:55',
    value: 10
  }, {
    name: '11:36:55',
    value: 11
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:34:55',
    value: 40
  }, {
    name: '11:35:55',
    value: 10
  }, {
    name: '11:36:55',
    value: 11
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:34:55',
    value: 40
  }, {
    name: '11:35:55',
    value: 10
  }, {
    name: '11:36:55',
    value: 11
  }, {
    name: '11:37:55',
    value: 44
  }, {
    name: '11:38:55',
    value: 55
  }, {
    name: '11:39:55',
    value: 6
  }],
      realtimeUserChartsOpts = {
    grid: {
      top: '20',
      left: '18',
      right: '24',
      bottom: '12',
      containLabel: true
    },
    tooltip: {
      formatter: '{b}<br>实时用户：{c}'
    },
    xAxis: {
      data: realtimeUserDatalist.map(function (item) {
        return item.name;
      }),
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 'auto',
        // rotate:254
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#364d69',
          width: '1' //坐标线的宽度

        }
      }
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          color: '#364d69',
          //网格横线颜色
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [{
      name: '实时用户',
      type: 'bar',
      // barWidth:70,
      data: realtimeUserDatalist.map(function (item) {
        return item.value;
      }),
      //数据
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#0d6cf6'
          }, //柱图渐变色
          {
            offset: 0.5,
            color: '#0a91f6'
          }, //柱图渐变色
          {
            offset: 1,
            color: '#03d5f6'
          }]) // emphasis: {
          //     color: new echarts.graphic.LinearGradient(
          //         0, 0, 0, 1,
          //         [
          //             {offset: 0, color: '#71C8B1'},
          //             {offset: 0.7, color: '#44C0C1'},
          //             {offset: 1, color: '#06B5D7'}
          //         ]
          //     )
          // }

        }
      }
    }]
  }; // userTrendCharts

  var userTrendCharts;
  var userTrendChartsOpts;
  var userTrendDataList = [{
    name: '02/14',
    value: 22
  }, {
    name: '03/14',
    value: 33
  }, {
    name: '04/14',
    value: 13
  }, {
    name: '05/14',
    value: 3
  }, {
    name: '06/14',
    value: 22
  }, {
    name: '07/14',
    value: 11
  }, {
    name: '08/14',
    value: 55
  }];
  userTrendChartsOpts = {
    tooltip: {
      //鼠标悬浮弹出提示框
      trigger: 'axis',
      //提示框弹出的触发时间，折线图和柱状图为axis
      formatter: '{a} <br/>{b} : {c} ' //提示框提示的信息，{a}series内的名字，{b}为块状的名字，{c}为数值

    },
    grid: {
      //统计图距离边缘的距离
      top: '20',
      left: '18',
      right: '18',
      bottom: '16',
      containLabel: true
    },
    xAxis: [{
      //x轴
      type: 'category',
      //数据类型为不连续数据
      boundaryGap: false,
      //坐标轴两边是否留白
      axisLine: {
        //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: '#103153' //x轴颜色

        }
      },
      axisLabel: {
        //坐标轴刻度标签的相关设置
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        margin: 12
      },
      axisTick: {
        show: true
      },
      //刻度点数轴
      data: userTrendDataList.map(function (item) {
        return item.name;
      })
    }],
    yAxis: [{
      //y轴的相关设置
      type: 'value',
      //y轴数据类型为连续的数据
      splitLine: {
        //y轴上的y轴线条相关设置
        show: true,
        lineStyle: {
          color: '#103153'
        }
      },
      axisLine: {
        //y轴的相关设置
        show: true,
        lineStyle: {
          color: '#103153' //y轴颜色

        }
      },
      axisLabel: {
        //y轴的标签相关设置
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        margin: 12
      },
      axisTick: {
        show: true //刻度点数轴

      }
    }],
    series: [{
      name: '智慧教学平台--用户趋势',
      type: 'line',
      //统计图类型为折线图
      smooth: true,
      //是否平滑曲线显示
      symbolSize: 0,
      //数据点的大小，[0,0]//b表示宽度和高度
      lineStyle: {
        normal: {
          color: '#09d1eb'
        }
      },
      areaStyle: {
        normal: {
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(61,234,255, 0.4)'
          }, {
            offset: 1,
            color: 'rgba(61,234,255, 0)'
          }], false),
          shadowColor: 'rgba(53,142,215, 0.9)',
          shadowBlur: 2
        }
      },
      data: userTrendDataList.map(function (item) {
        return item.value;
      })
    }]
  }; // hotApp

  var hotAppCharts;
  var hotAppChartsOpts;
  var hotAppColor = ['#02d8cb', '#b69cfe', '#74beda', '#c1c6ff', '#4490ef', '#0feeff', '#79fbbf', '#5d7f9b', '#b5e7ff', '#55c7ff'];
  hotAppChartsOpts = {
    tooltip: {},
    grid: {
      // top: '10%',
      // left: '3%',
      // right: '3%',
      // bottom: '0',
      top: '6',
      left: '6',
      right: '6',
      bottom: '6',
      containLabel: true
    },
    series: [{
      type: 'wordCloud',
      gridSize: 2,
      sizeRange: [12, 50],
      width: '90%',
      height: '90%',
      rotationRange: [0, 0],
      shape: 'pentagon',
      // width: 600,
      // height: 400,
      textStyle: {
        normal: {
          color: function color() {
            var randIndex = Math.round((hotAppColor.length - 1) * Math.random());
            return hotAppColor[randIndex];
          }
        },
        emphasis: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: [{
        name: 'Sam S Club',
        value: 10000,
        textStyle: {
          normal: {
            color: 'black'
          },
          emphasis: {
            color: 'red'
          }
        }
      }, {
        name: 'Macys',
        value: 6181
      }, {
        name: 'Amy Schumer',
        value: 4386
      }, {
        name: 'Jurassic World',
        value: 4055
      }, {
        name: 'Charter Communications',
        value: 2467
      }, {
        name: 'Chick Fil A',
        value: 2244
      }, {
        name: 'Planet Fitness',
        value: 1898
      }, {
        name: 'Pitch Perfect',
        value: 1484
      }, {
        name: 'Express',
        value: 1112
      }, {
        name: 'Home',
        value: 965
      }, {
        name: 'Johnny Depp',
        value: 847
      }, {
        name: 'Lena Dunham',
        value: 582
      }, {
        name: 'Lewis Hamilton',
        value: 555
      }, {
        name: 'KXAN',
        value: 550
      }, {
        name: 'Mary Ellen Mark',
        value: 462
      }, {
        name: 'Farrah Abraham',
        value: 366
      }, {
        name: 'Rita Ora',
        value: 360
      }, {
        name: 'Serena Williams',
        value: 282
      }, {
        name: 'NCAA baseball tournament',
        value: 273
      }, {
        name: 'Point Break',
        value: 265
      }]
    }]
  };

  window.onload = function () {
    // subject usage
    $('.charts-box').height($('.box-aside').height() - 28); // .width($('.box-aside').width());

    subjectUsageCharts = echarts.init(document.querySelector('.subject-usage-charts'));
    subjectUsageCharts.setOption(subjectUsageOpts);
    setInterval(function () {
      subjectUsageAnimation(subjectUsageCharts, 0);
    }, subjectUsageAnimationTime); // map charts

    $('.map-charts').height($('.box-center-a').height()).width($('.box-center-a').width());
    mapCharts = echarts.init(document.querySelector('.map-charts'));
    mapCharts.setOption(mapOpts); // hotSubjectTop10Charts

    hotSubjectTop10Charts = echarts.init(document.querySelector('.hot-subject-top10-charts'));
    hotSubjectTop10Charts.setOption(hotSubjectTop10Opts, true);
    hotSubjectTop10Charts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0
    }); // hotSubujectTop5

    textbookTop5Charts = echarts.init(document.querySelector('.textbook-top5-charts'));
    textbookTop5Charts.setOption(textbookTop5ChartsOpts); // realtimeUser

    realtimeUserCharts = echarts.init(document.querySelector('.realtime-user-charts'));
    realtimeUserCharts.setOption(realtimeUserChartsOpts); // userTrendCharts

    userTrendCharts = echarts.init(document.querySelector('.user-trend-charts'));
    userTrendCharts.setOption(userTrendChartsOpts); // hotApp

    hotAppCharts = echarts.init(document.querySelector('.hot-app-charts'));
    hotAppCharts.setOption(hotAppChartsOpts); // subjectUsageCharts
    // subjectDataUsageCharts = echarts.init(
    //   document.querySelector('.subject-usage-charts')
    // );
    // subjectDataUsageCharts.setOption(subjectUsageOpts);
    // subjectDataUsageCharts.dispatchAction({
    //   type: 'highlight',
    //   seriesIndex: 0,
    //   dataIndex: 0
    // });
    // subjectDataUsageCharts.on('mouseover', function(params) {
    //   if (params.dataIndex != 0) {
    //     subjectDataUsageCharts.dispatchAction({
    //       type: 'downplay',
    //       seriesIndex: 0,
    //       dataIndex: 0
    //     });
    //   }
    // });

    function bindEvents() {
      function reqFullScreenCb() {
        console.log('dashboard reqFullScreenCb'); // TODO: resize
        // change css

        $('.i-fullscreen').removeClass('pep-icon-test6').addClass('pep-icon-test9');
      }

      function exitFullScreenCb() {
        console.log('exitFullScreenCb'); // TODO: resize
        // change css

        $('.i-fullscreen').removeClass('pep-icon-test9').addClass('pep-icon-test6');
        ;
      }

      $('.i-fullscreen').on('click', function () {
        if ($(this).hasClass('pep-icon-test6')) {
          var dom = document.querySelector('.dashboard-wrapper');
          util.reqFullScreen(dom, reqFullScreenCb);
        } else {
          util.exitFullScreen(null, exitFullScreenCb);
        }
      }); // resize

      function resize() {
        $('.charts-box').height($('.box-aside').height() - 28).width($('.box-aside').width());
        $('.map-charts').height($('.box-center-a').height()).width($('.box-center-a').width());
        $('.realtime-user-charts').height($('.box-center-b').height() - 28).width($('.box-center-b').width());
        subjectUsageCharts.resize();
        mapCharts.resize();
        hotSubjectTop10Charts.resize();
        textbookTop5Charts.resize();
        realtimeUserCharts.resize();
        userTrendCharts.resize();
        hotAppCharts.resize();
      }

      $('.sidebar-toggle').on('click', function () {
        setTimeout(function () {
          resize();
        }, 400);
      });
      $(window).resize(function () {
        var timer = null;

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {
          resize();
        }, 200);
      });
    }

    bindEvents();
  };
});