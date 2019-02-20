'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Neptune/l');
const BData = require('../../data/Neptune/b');
const RData = require('../../data/Neptune/r');

/**
 * 海王星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Neptune extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 24, 10, 6, 2, 1, 1 ];
        this.private.b.truncationNums = [ 14, 6, 5, 2, 1, 1 ];
        this.private.r.truncationNums = [ 69, 28, 16, 9, 5 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 34, 14, 7, 3, 1, 1 ];
        this.private.b.truncationNums = [ 19, 9, 6, 3, 0, 1 ];
        this.private.r.truncationNums = [ 103, 40, 20, 12, 7 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 51, 16, 7, 3, 1, 1 ];
        this.private.b.truncationNums = [ 25, 12, 7, 3, 0, 1 ];
        this.private.r.truncationNums = [ 105, 43, 22, 13, 7 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 54, 19, 9, 3, 1, 1 ];
        this.private.b.truncationNums = [ 30, 16, 9, 4, 0, 1 ];
        this.private.r.truncationNums = [ 106, 43, 22, 13, 7 ];
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

module.exports = Neptune;
