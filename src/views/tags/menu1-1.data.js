// echarts图表数据
export const echarts_data = {
  0:{
    id: 'chartData1',
    style: 'height:300px',
    option: {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [ "2018", "2019", "2020", "2021", "2022", "2023", "2024",]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  },
  // 0:{
  //   id: 'chartData1',
  //   style: 'height:300px',
  //   option: {
  //     tooltip: {},
  //     legend: {
  //       data: [
  //         "渠道一采集总数",
  //         "渠道二采集总数",
  //         "渠道一采集成功总数",
  //         "渠道二采集成功总数",
  //         "渠道一采集失败总数",
  //         "渠道二采集失败总数",
  //       ],
  //       orient: "vertical",
  //       right: 0,
  //       y: "center", //延Y轴居中
  //       //  x: 'right' //居右显示
  //     },
  //     xAxis: {
  //       type: "category",
  //       data: [
  //         "2018",
  //         "2019",
  //         "2020",
  //         "2021",
  //         "2022",
  //         "2023",
  //         "2024",
  //       ],
  //       axisLabel: {
  //         textStyle: {
  //           color: "#54b4f7",
  //         },
  //       },
  //     },
  //     yAxis: {
  //       type: "value",
  //       min: 0,
  //       max: 7,
  //       interval: 1,
  //       name: "人数",
  //       axisLine: {
  //         show: false,
  //       },
  //     },
  //     series: [
  //       {
  //         name: "渠道一采集总数",
  //         data: [5],
  //         type: "line",
  //         smooth: true,
  //         color: "#7cb5ec",
  //       },
  //       {
  //         name: "渠道一采集成功总数",
  //         data: [2],
  //         type: "line",
  //         smooth: true,
  //         color: "#90ed7d",
  //       },
  //       {
  //         name: "渠道一采集失败总数",
  //         data: [3],
  //         type: "line",
  //         smooth: true,
  //         color: "#8085e9",
  //       },
  //     ],
  //   }
  // },
}

// 初始化测试用例表单
export const initial_table = [
  {
    date: "2016-05-03",
    channel: "渠道一",
    sums: 10,
    success: 5,
    fail: 5,
  },
  {
    date: "2016-05-03",
    channel: "渠道二",
    sums: 10,
    success: 5,
    fail: 5,
  },
  {
    date: "2016-05-03",
    channel: "渠道三",
    sums: 10,
    success: 5,
    fail: 5,
  },
]
