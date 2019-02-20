'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Earth/l');
const BData = require('../../data/Earth/b');
const RData = require('../../data/Earth/r');

/**
 * 地球日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Earth extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 27, 15, 8, 4, 3, 1 ];
        this.private.b.truncationNums = [ 3, 1, 1, 0, 0, 0 ];
        this.private.r.truncationNums = [ 8, 3, 1, 1, 0, 0 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 64, 34, 20, 7, 3, 1 ];
        this.private.b.truncationNums = [ 10, 2, 1, 0, 0, 0 ];
        this.private.r.truncationNums = [ 40, 12, 9, 5, 4, 3 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 72, 19, 13, 7, 5, 5 ];
        this.private.b.truncationNums = [ 61, 38, 28, 8, 4 ];
        this.private.r.truncationNums = [ 73, 18, 11, 5, 4, 3 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 84, 31, 19, 8, 6, 5 ];
        this.private.b.truncationNums = [ 69, 56, 36, 10, 5 ];
        this.private.r.truncationNums = [ 84, 31, 15, 6, 4, 3 ];
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

module.exports = Earth;
