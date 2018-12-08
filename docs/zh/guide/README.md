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

采用`canvas`开发一个具有**高效**、**跨平台**的**专业有价证劵图表库📈**

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
