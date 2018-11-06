'use strict';

const PlanetHECCOnVSOP87 = require('../PlanetHECCOnVSOP87');
const LData = require('../../data/Uranus/l');
const BData = require('../../data/Uranus/b');
const RData = require('../../data/Uranus/r');

/**
 * 天王星日心黄经坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class Uranus extends PlanetHECCOnVSOP87 {

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
        this.private.l.truncationNums = [ 43, 15, 10, 3, 3, 1 ];
        this.private.b.truncationNums = [ 13, 7, 6, 3, 2 ];
        this.private.r.truncationNums = [ 127, 100, 65, 38, 11 ];
        break;

      case 'normal':
        this.private.l.truncationNums = [ 67, 19, 13, 3, 4, 1 ];
        this.private.b.truncationNums = [ 18, 9, 7, 3, 2 ];
        this.private.r.truncationNums = [ 168, 116, 70, 39, 11 ];
        break;

      case 'high':
        this.private.l.truncationNums = [ 88, 30, 17, 4, 4, 1 ];
        this.private.b.truncationNums = [ 24, 10, 7, 3, 2 ];
        this.private.r.truncationNums = [ 168, 116, 70, 39, 11 ];
        break;

      case 'fine':
        this.private.l.truncationNums = [ 89, 30, 17, 4, 4, 1 ];
        this.private.b.truncationNums = [ 25, 12, 7, 3, 2 ];
        this.private.r.truncationNums = [ 168, 116, 70, 39, 11 ];
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

module.exports = Uranus;
