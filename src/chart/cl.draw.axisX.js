'use strict'

// //////////////////////////////////////////////////
// 以下是 ClLineAxisX 的实体定义
// //////////////////////////////////////////////////

import {
  _drawTxt
} from '../util/cl.draw';
import getValue from '../data/cl.data.tools';
import {
  getDate,
  formatShowTime
} from '../util/cl.tool';
import {
  initCommonInfo
} from '../cl.chart';

// 创建时必须带入父类，后面的运算定位都会基于父节点进行；
// 这个类仅仅是画图, 因此需要把可以控制的rect传入进来
export default function ClDrawAxisX(father, rectMain) {
  initCommonInfo(this, father);
  this.rectMain = rectMain;

  this.linkinfo = father.father.linkinfo;
  this.axisX = father.config.axisX;

  this.maxmin = father.maxmin;
  this.text = father.layout.text;

  this.data = father.data;

  this.onPaint = function () {
    if (this.axisX.display === 'none') return;

    let xx, value, spaceX;
    xx = this.rectMain.left + 2;
    const yy = this.rectMain.top;
    if (this.axisX.display === 'block') {
      let count = -1;
      let days = 0;
      spaceX = this.rectMain.width / (this.axisX.lines + 1);
      for (let k = this.linkinfo.minIndex; k <= this.linkinfo.maxIndex; k++) {
        const index = getValue(this.data, 'idx', k);
        if (index < 0) continue;
        days = Math.floor(index / this.linkinfo.maxCount);
        if (days > count) {
          count = days;
          xx = this.rectMain.left + spaceX / 2 + spaceX * count;
          value = getDate(getValue(this.data, 'time', k));
          _drawTxt(this.context, xx, yy, value,
            this.text.font, this.text.pixel, this.color.axis, { x: 'center' });
        }
      }
    } else {
      value = getValue(this.data, 'time', this.linkinfo.minIndex);
      value = formatShowTime(this.data.key, value, this.maxmin.min);
      _drawTxt(this.context, xx, yy, value,
        this.text.font, this.text.pixel, this.color.axis);

      xx = this.rectMain.left + this.rectMain.width - 3;
      value = getValue(this.data, 'time', this.linkinfo.maxIndex);
      value = formatShowTime(this.data.key, value, this.maxmin.max);
      _drawTxt(this.context, xx, yy, value,
        this.text.font, this.text.pixel, this.color.axis, { x: 'end' });
    }
  };
}