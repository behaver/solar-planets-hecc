'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Mars/l');
const BData = require('../../data/Mars/b');
const RData = require('../../data/Mars/r');

/**
 * 火星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Mars extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 100, 35, 33, 20, 17, 8 ];
        this.private.b.truncationNums = [ 21, 12, 8, 6, 4, 2 ];
        this.private.r.truncationNums = [ 60, 40, 25, 10, 10, 5 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 156, 75, 71, 29, 23, 10 ];
        this.private.b.truncationNums = [ 54, 29, 13, 11, 7, 4 ];
        this.private.r.truncationNums = [ 127, 78, 51, 12, 18, 7 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 241, 113, 83, 38, 29, 12 ];
        this.private.b.truncationNums = [ 84, 47, 33, 14, 8, 5 ];
        this.private.r.truncationNums = [ 236, 106, 71, 13, 21, 8 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 279, 139, 96, 47, 32, 14 ];
        this.private.b.truncationNums = [ 99, 58, 38, 16, 8, 5 ];
        this.private.r.truncationNums = [ 270, 135, 84, 19, 23, 9 ];
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

module.exports = Mars;
