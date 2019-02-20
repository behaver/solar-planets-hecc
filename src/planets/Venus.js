'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Venus/l');
const BData = require('../../data/Venus/b');
const RData = require('../../data/Venus/r');

/**
 * 金星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Venus extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 24, 12, 8, 3, 3, 1 ];
        this.private.b.truncationNums = [ 9, 4, 4, 4, 1, 0 ];
        this.private.r.truncationNums = [ 12, 3, 3, 1, 1, 0 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 67, 32, 25, 6, 4, 4 ];
        this.private.b.truncationNums = [ 33, 10, 8, 6, 3, 3 ];
        this.private.r.truncationNums = [ 22, 8, 4, 4, 2, 2 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 104, 57, 40, 7, 4, 5 ];
        this.private.b.truncationNums = [ 49, 32, 16, 7, 3, 4 ];
        this.private.r.truncationNums = [ 32, 15, 5, 4, 2, 2 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 116, 66, 43, 7, 4, 5 ];
        this.private.b.truncationNums = [ 60, 36, 19, 8, 4, 4 ];
        this.private.r.truncationNums = [ 45, 22, 8, 4, 2, 2 ];
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

module.exports = Venus;
