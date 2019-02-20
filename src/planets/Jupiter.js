'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Jupiter/l');
const BData = require('../../data/Jupiter/b');
const RData = require('../../data/Jupiter/r');

/**
 * 木星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Jupiter extends PlanetHECCOnVSOP87 {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository} obTime   观测儒略时间
   * @param  {String}          accuracy 计算精度
   */
  constructor(obTime, accuracy = 'normal') {
    super(obTime);
    
    // 初始化 VSOP87 计算数据及截断设定
    this.private.l = {
      data: LData,
    };
    this.private.b = {
      data: BData,
    };
    this.private.r = {
      data: RData,
    };

    this.accuracy = accuracy;
  }

  /**
   * 设置计算精度
   * 
   * @param  {String} level 设置运算精度
   */
  set accuracy(level) {
    switch(level) {
      case 'low':
        this.private.l.truncationNums = [ 51, 28, 20, 15, 9, 7 ];
        this.private.b.truncationNums = [ 24, 17, 15, 9, 7, 3 ];
        this.private.r.truncationNums = [ 46, 24, 23, 17, 11, 7 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 67, 42, 24, 18, 11, 9 ];
        this.private.b.truncationNums = [ 37, 24, 21, 12, 8, 4 ];
        this.private.r.truncationNums = [ 76, 31, 31, 21, 14, 8 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 96, 50, 30, 22, 12, 10 ];
        this.private.b.truncationNums = [ 51, 30, 26, 14, 9, 4 ];
        this.private.r.truncationNums = [ 90, 41, 38, 25, 15, 9 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 101, 63, 37, 26, 13, 10 ];
        this.private.b.truncationNums = [ 61, 38, 31, 17, 10, 5 ];
        this.private.r.truncationNums = [ 97, 43, 40, 25, 15, 9 ];
        break;

      case 'complete':
        break;

      default:
        throw Error('The param level was illegal.');
    }

    if (level !== this.private.accuracy) {
      
      // 清除原始缓存数据
      this.cache.clear();

      this.private.accuracy = level;
    }
  }

  /**
   * 获取计算精度
   * 
   * @return {String} 计算精度设置
   */
  get accuracy() {
    return this.private.accuracy;
  }
}

module.exports = Jupiter;
