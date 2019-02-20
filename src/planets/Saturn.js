'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Saturn/l');
const BData = require('../../data/Saturn/b');
const RData = require('../../data/Saturn/r');

/**
 * 土星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Saturn extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 88, 51, 40, 31, 14, 15 ];
        this.private.b.truncationNums = [ 34, 24, 19, 16, 8, 6 ];
        this.private.r.truncationNums = [ 107, 57, 55, 38, 21, 19 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 136, 68, 55, 42, 16, 20 ];
        this.private.b.truncationNums = [ 58, 35, 29, 20, 12, 8 ];
        this.private.r.truncationNums = [ 183, 92, 71, 47, 26, 25 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 223, 109, 80, 54, 19, 24 ];
        this.private.b.truncationNums = [ 99, 49, 38, 26, 14, 10 ];
        this.private.r.truncationNums = [ 196, 114, 87, 53, 30, 28 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 252, 126, 89, 60, 21, 26 ];
        this.private.b.truncationNums = [ 117, 61, 45, 30, 17, 11 ];
        this.private.r.truncationNums = [ 204, 121, 89, 54, 31, 28 ];
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

module.exports = Saturn;
