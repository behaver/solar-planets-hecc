'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Mercury/l');
const BData = require('../../data/Mercury/b');
const RData = require('../../data/Mercury/r');

/**
 * 水星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Mercury extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 47, 22, 17, 12, 8, 4 ];
        this.private.b.truncationNums = [ 16, 11, 10, 6, 4, 1 ];
        this.private.r.truncationNums = [ 13, 9, 7, 4, 2, 1 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 102, 119, 50, 19, 12, 9 ];
        this.private.b.truncationNums = [ 71, 25, 21, 14, 8, 3 ];
        this.private.r.truncationNums = [ 56, 55, 36, 17, 9, 5 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 171, 189, 76, 24, 13, 11 ];
        this.private.b.truncationNums = [ 330, 74, 93, 32, 12, 5 ];
        this.private.r.truncationNums = [ 163, 134, 81, 31, 11, 6 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 311, 197, 78, 25, 13, 12 ];
        this.private.b.truncationNums = [ 396, 155, 115, 38, 13, 6 ];
        this.private.r.truncationNums = [ 407, 249, 138, 39, 11, 8 ];
        break;

      case 'complete':
        break;

      default:
        throw Error('The param level was illegal.');
    }

    this.private.accuracy = level;
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

module.exports = Mercury;
