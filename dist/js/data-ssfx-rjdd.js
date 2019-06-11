"use strict";

(function () {
  // 用户购买转化
  var ymgmzhCharts = echarts.init(document.getElementById('ymgmzh'));
  var ymgmzhOptions = {
    backgroundColor: '#ffffff',
    color: ['#1bbdfd', '#01d8c9', '#00ff8a'],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [{
      name: '用户购买转化',
      type: 'funnel',
      left: '5%',
      top: 10,
      //x2: 80,
      bottom: 30,
      width: '90%',
      // height: {totalHeight} - y - y2,
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: {
        emphasis: {
          textStyle: {
            fontSize: 20
          }
        },
        formatter: '{b}{d}%'
      },
      labelLine: {
        length: 35,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: [{
        value: 60,
        name: '累计用户'
      }, {
        value: 40,
        name: '累计注册'
      }, {
        value: 20,
        name: '累计购买'
      }]
    }] // 日均活跃用户占历史累计比

  };
  var rjhyhCharts = echarts.init(document.getElementById('rjhy'));
  var value = 0.22;
  var data = [];
  data.push(value);
  var rjhyOptions = {
    backgroundColor: '#fff',
    title: {
      text: '',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 25,
        color: '#1bbdfd'
      }
    },
    series: [{
      type: 'liquidFill',
      radius: '90%',
      data: data,
      backgroundStyle: {
        borderWidth: 0,
        borderColor: '#1bbdfd',
        color: '#e7fafd'
      },
      label: {
        normal: {
          formatter: (value * 100).toFixed(2) + '%',
          textStyle: {
            fontSize: 30
          }
        }
      }
    }]
  }; //日均新增用户占日均活跃比

  var rjxzCharts = echarts.init(document.getElementById('rjxz'));
  var rjxzOptions = {
    series: [{
      name: '',
      type: 'pie',
      radius: ['70%', '90%'],
      avoidLabelOverlap: false,
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        value: 25,
        label: {
          normal: {
            formatter: '{d}%',
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '35',
              fontWeight: 'normal',
              color: '#313131'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#53e6e6',
            shadowColor: '#53e6e6',
            shadowBlur: 10
          }
        }
      }, {
        value: 25,
        label: {
          normal: {
            formatter: '{d}%',
            position: 'center',
            show: true,
            textStyle: {
              fontSize: '35',
              fontWeight: 'normal',
              color: '#313131'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#e9e9e9',
            shadowColor: '#e9e9e9',
            shadowBlur: 10
          }
        }
      }]
    }]
  };
  ymgmzhCharts.setOption(ymgmzhOptions);
  rjhyhCharts.setOption(rjhyOptions);
  rjxzCharts.setOption(rjxzOptions); // 用户渠道分布

  var yhqdfbCharts = echarts.init(document.getElementById('yhqdfb'));
  var ydata = [{
    name: '渠道一',
    miaoshu: '日均熙增1',
    value: 18
  }, {
    name: '渠道二',
    miaoshu: '日均熙增2',
    value: 122
  }, {
    name: '渠道三',
    miaoshu: '日均熙增3',
    value: 99
  }, {
    name: '渠道四',
    miaoshu: '日均熙增4',
    value: 34
  }];
  var color = ['#0c8fd8', '#05a07d', '#8ac700', '#c4db3a', '#f59647', '#f16b60', '#db2b14', '#7b51ba', '#917c5f', '#00baff'];
  var xdata = ['渠道一', '渠道二', '渠道三', '渠道四'];
  var yhqdfbOptions = {
    backgroundColor: 'rgba(255,255,255,1)',
    color: color,
    legend: {
      orient: 'vartical',
      x: 'right',
      top: '0',
      right: '0',
      data: xdata,
      itemWidth: 11,
      itemHeight: 11,
      itemGap: 16,
      formatter: function formatter(name) {
        return '' + name;
      }
    },
    series: [{
      type: 'pie',
      clockwise: false,
      //饼图的扇区是否是顺时针排布
      minAngle: 2,
      //最小的扇区角度（0 ~ 360）
      radius: ['70%', '80%'],
      center: ['45%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        //图形样式
        normal: {
          borderColor: '#ffffff',
          borderWidth: 2
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center',
          // formatter: '{text|{b}}\n{c} ({d}%)',
          formatter: function formatter(params) {
            var res = '';
            var myseries = ydata;

            for (var j = 0; j < myseries.length; j++) {
              if (myseries[j].name == params.name) {
                res += ' ' + myseries[j].name + '\n {value|}' + myseries[j].value + '\n {miaoshu|}' + myseries[j].miaoshu;
              }
            }

            return res;
          },
          rich: {
            text: {
              color: '#666',
              fontSize: 14,
              align: 'left',
              verticalAlign: 'middle',
              padding: 8
            },
            value: {
              color: '#8693F3',
              fontSize: 24,
              align: 'center',
              verticalAlign: 'middle'
            }
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: 24
          }
        }
      },
      data: ydata
    }]
  };
  setTimeout(function () {
    yhqdfbCharts.on('mouseover', function (params) {
      if (params.name == ydata[0].name) {
        yhqdfbCharts.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        });
      } else {
        yhqdfbCharts.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: 0
        });
      }
    });
    yhqdfbCharts.on('mouseout', function (params) {
      yhqdfbCharts.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      });
    });
    yhqdfbCharts.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: 0
    });
  }, 1000); // 区域地图

  var yhdqfbCharts = echarts.init(document.getElementById('yhdqfb')); //区域地图 -随机数

  function randomData() {
    return Math.round(Math.random() * 1000);
  } //区域地图 -地图数据


  var mapdata = [{
    name: '北京',
    miaoshu: 'nihao',
    value: randomData()
  }, {
    name: '天津',
    miaoshu: 'nihao',
    value: randomData()
  }];
  var yhdqfbOptions = {
    backgroundColor: '#fff',
    grid: {
      left: '1%',
      right: '1%',
      top: 30,
      bottom: '1%',
      containLabel: true
    },
    tooltip: {
      width: '170',
      trigger: 'item',
      formatter: function formatter(params) {
        var res = '';
        var myseries = mapdata;

        for (var j = 0; j < myseries.length; j++) {
          if (myseries[j].name == params.name) {
            res += ' ' + myseries[j].name + ' <br /> ' + myseries[j].miaoshu + ':' + myseries[j].value;
          }
        }

        return res;
      }
    },
    visualMap: {
      min: 0,
      max: 2500,
      left: 'left',
      top: 'bottom',
      inRange: {
        color: ['#daeaff', '#2383ff']
      },
      text: ['高', '低'],
      // 文本，默认为数值文本
      calculable: true
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'top',
      top: 'center'
    },
    series: [{
      name: '',
      type: 'map',
      mapType: 'china',
      formatter: '{d}',
      roam: false,
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: mapdata
    }]
  };
  yhqdfbCharts.setOption(yhqdfbOptions);
  yhdqfbCharts.setOption(yhdqfbOptions); // 今日实时动态数据

  var jrssdtsjCharts = echarts.init(document.getElementById('jrssdtsj')); //今日实时数据动态数据

  var jrssdtsjdata = [['0', 237], ['1', 213], ['2', 235], ['3', 183], ['4', 317], ['5', 137], ['6', 153], ['7', 133], ['8', 134], ['9', 314], ['10', 134], ['11', 214], ['12', 254], ['13', 184], ['14', 147], ['15', 174], ['16', 154], ['17', 143], ['18', 144], ['19', 214], ['20', 214], ['21', 194], ['22', 184], ['23', 234]];
  var jrssdtsjdata2 = [['0', 37], ['1', 23], ['2', 35], ['3', 13], ['4', 17], ['5', 13], ['6', 3], ['7', 3], ['8', 14], ['9', 34], ['10', 13], ['11', 4], ['12', 24], ['13', 14], ['14', 7], ['15', 14], ['16', 14], ['17', 13], ['18', 14], ['19', 14], ['20', 14], ['21', 14], ['22', 18], ['23', 24]];
  var jrssdtsjOptions = {
    color: ['#32b7e9', '#d6ab2f'],
    title: {
      left: '20',
      text: '今日实时动态数据'
    },
    grid: {
      left: '5%',
      right: '5%',
      top: 70,
      bottom: '5%',
      containLabel: true
    },
    legend: {
      right: '70'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      // boundaryGap: [0, 0],
      axisPointer: {
        label: {
          show: true
        },
        handle: {
          show: false,
          color: '#004E52'
        }
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        inside: true
      },
      splitLine: {
        show: true,
        color: '#dbe8db'
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      },
      z: 10
    },
    dataZoom: [{
      type: 'inside',
      throttle: 30
    }],
    series: [{
      name: '实时用户',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#32b7e9'
          }, {
            offset: 1,
            color: '#fff'
          }])
        }
      },
      data: jrssdtsjdata
    }, {
      name: '事件次数',
      type: 'line',
      smooth: true,
      stack: 'a',
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        normal: {
          color: '#d68262'
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#d6ab2f'
          }, {
            offset: 1,
            color: '#fff'
          }])
        }
      },
      data: jrssdtsjdata2
    }]
  };
  jrssdtsjCharts.setOption(jrssdtsjOptions); // 指标变化趋势 

  var zbbhqsCharts = echarts.init(document.getElementById('zbbhqs'));
  var xdata = ['2019-2-1', '2019-2-2', '2019-2-3', '2019-2-4', '2019-2-5', '2019-2-6', '2019-2-7', '2019-2-8', '2019-2-9', '2019-2-10', '2019-2-11', '2019-2-12', '2019-2-13', '2019-2-14'];
  var zbbhqsOptions = {
    title: {
      left: '20',
      text: '指标变化趋势'
    },
    grid: {
      left: '5%',
      right: '5%',
      top: 100,
      bottom: '10%',
      containLabel: true
    },
    color: color,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#fff'
        }
      }
    },
    legend: {
      data: ['活跃用户', '新增用户', '注册用户', '购买用户', '事件次数']
    },
    xAxis: [{
      type: 'category',
      data: xdata,
      axisPointer: {
        type: 'line',
        label: {
          show: true
        },
        handle: {
          show: false,
          color: '#004E52'
        }
      }
    }],
    dataZoom: [{
      show: xdata.length > 30 ? true : false,
      //控制下面滚动条
      height: 10,
      xAxisIndex: [0],
      showDetail: false,
      fillerColor: "rgba(167,183,204,0.4)",
      bottom: '10',
      "start": 10,
      "end": 90,
      handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      moveOnMouseMove: true,
      handleSize: '100%',
      handleStyle: {
        color: "#a0a0a0"
      }
    }, {
      "type": "inside",
      "show": true,
      "height": 15,
      "start": 1,
      "end": 35
    }],
    yAxis: [{
      type: 'value',
      name: '用\n户\n数',
      nameLocation: 'center',
      nameRotate: 0,
      nameTextStyle: {
        color: '#000',
        verticalAlign: 'center'
      },
      nameGap: 25,
      min: 0,
      max: 400,
      interval: 50,
      axisTick: {
        inside: true
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          opacity: 0.2
        }
      },
      axisLabel: {
        inside: true,
        formatter: '{value}\n'
      }
    }, {
      type: 'value',
      name: '事\n件\n次\n数',
      nameLocation: 'center',
      nameRotate: 0,
      nameTextStyle: {
        color: '#000',
        verticalAlign: 'center'
      },
      nameGap: 25,
      min: 0,
      max: 1000,
      interval: 200,
      axisTick: {
        inside: true
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ccc',
          opacity: 0.2
        }
      },
      axisLabel: {
        inside: true,
        opacity: 0.2,
        formatter: '{value}\n'
      }
    }],
    series: [{
      name: '活跃用户',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      data: [110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 380, 21, 43, 55, 202, 44, 66]
    }, {
      name: '新增用户',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      data: [22, 110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 380, 21, 43, 55, 202, 44, 66]
    }, {
      name: '注册用户',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      data: [166, 22, 110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 21, 43, 55, 202, 44, 66]
    }, {
      name: '购买用户',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      data: [266, 22, 110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 21, 43, 55, 202, 44, 66]
    }, {
      name: '事件次数',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      data: [366, 22, 110, 120, 130, 14, 150, 160, 180, 19, 300, 22, 44, 21, 43, 55, 202, 44, 66]
    }]
  };
  zbbhqsCharts.setOption(zbbhqsOptions);
})();