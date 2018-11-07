---
sidebar: auto
---

# 新手指南

## 为什么需要clchart

在现有的开源库中，不乏有非常不错的开源图表库，通用图表库有[chartjs](https://github.com/chartjs/Chart.js),[echart](https://github.com/apache/incubator-echarts),[highchart](https://github.com/highcharts/highcharts)等,这些图表库具有非常完备的图表类型以及强大的绘图能力及速度，但由于这些项目需要有通用性，在绘制有价证劵交易图时我们需要进行拓展是比较难。而针对股票等有价证劵特定的图表库有：[techanjs](https://github.com/andredumas/techan.js)和[highcharts/highstock](https://github.com/highcharts/highcharts)等项目，这些项目对有价证劵绘图已经做了一些非常专业的处理及优化了，但是在使用是发现它们存在一下几个问题：

- 基于`svg`绘图，绘制数据量大时，在手机浏览器上会有卡顿现象
- 与[React Native](https://github.com/facebook/react-native)和[Weex](https://github.com/apache/incubator-weex)结合暂无法实现原生绘图，只能通过内置`webview`来绘图

## 什么是 clchart？

[clchart](https://github.com/seerline/clchart)是一个基于canvas创建的简单、高性能和跨平台的有价证劵可视化开源项目。支持PC、webApp以及[React Native](https://github.com/facebook/react-native)和[Weex](https://github.com/apache/incubator-weex)等平台。在[React Native](https://github.com/facebook/react-native)和[Weex](https://github.com/apache/incubator-weex)上完全适配开源项目[GCanvas](https://github.com/alibaba/GCanvas)，可轻松使用[GCanvas](https://github.com/alibaba/GCanvas)来使得您开发的应用在android和ios上具有原生绘图的能力。

## clchart设计目标

采用`canvas`开发一个具有**高效**、**跨平台**的**专业股票图表库📈**

具有能兼容[GCanvas](https://github.com/alibaba/GCanvas)提供的`canvas`接口，实现在[React Native](https://github.com/facebook/react-native)和[Weex](https://github.com/apache/incubator-weex)上达到原生绘图，并且在针对股票市场多种的公式系统能过以插件的形式进行水平扩展，对于有特殊需求的用户，能够提供自定义插件及数据结构的能力。

## clchart特性

### 双层canvas

在研究[tradingview](https://tradingview.com)的绘图程序时，我们发现其为了达到快速重绘十字光标等辅助线时，使用双层`canvas`分离十字光标(等辅助线)与主图层的绘制，大大减小快速移动十字光标时带来的多余的绘图计算。使得在低版本`android`手机设备和webApp上也能有流畅的用户体验

### 扩展数据层

`clchart`实现独立的数据层，其能对数据进行预处理，缓存的功能，数据通过字段`FIELD`定义以及读取，用户可以方便自定义数据字段来快速与现有的数据进行整合使用。

### 自定义公式

`clchart`支持自定义公式系统，开发者和用户均可在使用过程中可以自定义公式进行绘图。

### 自定义插件

`clchart`支持自定绘图插件，现已实现插件有数据标签类型


## 快速入门

clchart可以与ES6模块，普通的JavaScript和模块加载器一起使用。

### 安装 clchart

你可以通过以下几种方式安装 clchart

### npm 安装

``` bash
npm install --save clchart

```

如果您使用模块加载器则可以直接在使用到clchart的地方引入文件
```js
import clchart from 'clchart'
```
或者
```js
const clchart = require('clchart')
```


### html文件引入

在 clchart 的 [GitHub](https://github.com/seerline/clchart/releases) 上下载最新的 release 版本的clchart.js文件，然后将其引入到您的网页中

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 引入 clchart 文件 -->
    <script src="./clchart.js"></script>
</head>
</html>
```

### 绘制分钟图

#### 初始化项目

- 创建一个目录`clchart-demo`
- 创建`demo01.html`文件
- 创建`js`目录用来存放`javascript`文件
- 下载我们已经准备好的股票数据[stockdata](https://seerline.github.io/clchart/stockdata.js)，将其放在`js`目录下面
- 将上一节我们下载的`clchart.js`复制到`js`目录下面

现在我们的文件结构为
```
clchart-demo
├── js
|   ├── stockdata.js
|   └── clchart.js
└── demo01.html
```

#### 初始化HTML文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ClChat Demo</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
    }

    canvas {
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    html, body, .container {
      height: 100%;
      width: 100%;
      background-color: #3b3b42;
      color: #f5f5f5;
    }
    .container {
      position: relative;
    }
    .chart-canvas {
      heigth: 100%;
      width: 100%;
    }
    #cursorChart {
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <canvas class="chart-canvas" id="myChart" width="400" height="600"></canvas>
    <canvas class="chart-canvas" id="cursorChart" width="400" height="600"></canvas>
  </div>

  <script src="./js/stockdata.js"></script>
  <script src="./js/clchart.js"></script>
</body>
</html>
```

#### 开始画图


```html
<script>
  // 获取页面中的main canvas以及cursor canvas
  // mainCanvas 用来绘制主图
  // cursorCanvas 用来绘制十字光标
  const mainCanvas = document.getElementById('myChart')
  const mainCtx = mainCanvas.getContext('2d')
  const cursorCanvas = document.getElementById('cursorChart')
  const cursorCtx = cursorCanvas.getContext('2d')

  // 定于绘图的配置，并且把mainCanvas及cursorCanvas传入做初始化
  const syscfg = {
    scale: window.devicePixelRatio,
    axisPlatform: 'web', // 'phone' | 'web'
    mainCanvas: {
      canvas: mainCanvas,
      context: mainCtx
    },
    cursorCanvas: {
      canvas: cursorCanvas,
      context: cursorCtx
    }
  }
  // 创建单一股票Chart实例
  const Chart = clchart.createSingleChart(syscfg)

  // 清除画布，及数据
  Chart.clear()
  const code = 'SH000001'
  // 数据初始化
  // 初始化当前交易日期
  Chart.initData(20180413, clchart.DEF_DATA.STOCK_TRADETIME)
  // 初始化股票信息，具体字段配置可以查看关于数据层，各种数据结构的定义
  Chart.setData('INFO', clchart.DEF_DATA.FIELD_INFO, getMockData(code, 'INFO'))
  Chart.setData('MIN', clchart.DEF_DATA.FIELD_MIN, getMockData(code, 'MIN'))
  Chart.setData('TICK', clchart.DEF_DATA.FIELD_TICK, getMockData(code, 'TICK'))
  Chart.setData('NOW', clchart.DEF_DATA.FIELD_NOW, getMockData(code, 'NOW'))
  // 配置画布各个区域的大小
  // 主图高度
  let mainHeight = canvas.height * 2 / 3
  let mainWidth = canvas.width
  // 设置画布区域布局
  const mainLayoutCfg = {
    layout: clchart.DEF_CHART.CHART_LAYOUT,
    config: clchart.DEF_CHART.CHART_NOW,
    rectMain: {
      left: 0,
      top: 0,
      width: mainWidth,
      height: mainHeight
    }
  }
  const mainChart = Chart.createChart('MIN', 'CHART.LINE', mainLayoutCfg, function (result) {})
  Chart.bindData(mainChart, 'MIN')

  const volumeLoyoutCfg = {
    layout: clchart.DEF_CHART.CHART_LAYOUT,
    config: clchart.DEF_CHART.CHART_NOWVOL,
    rectMain: {
      left: 0,
      top: mainHeight,
      width: mainWidth,
      height: canvas.height - mainHeight
    }
  }
  const volumeChart = Chart.createChart('MINNOW', 'CHART.LINE', volumeLoyoutCfg, function (result) {})
  Chart.bindData(volumeChart, 'MIN')
  // 执行绘图
  Chart.onPaint()
</script>
```

现在我们已经完成了一个简单的指数分时图的绘制了。可以查看[demo01](https://seerline.github.io/clchart/samples/guide/demo01.html)