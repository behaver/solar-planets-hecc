'use strict';

const VSOP87Calculator = require('./VSOP87Calculator');
const { SphericalCoordinate3D } = require('@behaver/coordinate/3d');
const Angle = require('@behaver/angle');
const { JDateRepository, CacheSpaceOnJDate } = require('@behaver/jdate');

/**
 * PlanetHECCOnVSOP87
 * 
 * PlanetHECCOnVSOP87 是基于 VSOP87 数据及算法计算的行星日心黄道坐标计算组件
 *
 * @author 董 三碗 <qianxing@yeah.net>
 * @version 1.0.0
 */
class PlanetHECCOnVSOP87 {

  /**
   * 构造函数
   * 
   * @param  {JDateRepository} obTime 观测儒略时间
   */
  constructor(obTime) {
    this.private = {};
    this.private.obTime = obTime;
    this.cache = new CacheSpaceOnJDate(obTime);
    this.calculator = new VSOP87Calculator(obTime);
  }

  /**
   * 获取 行星日心黄经值
   * 
   * @return {Angle} 行星日心黄经 角度对象
   */
  get l() {
    if (!this.cache.has('l')) {
      let l = this.calculator.calc(this.private.l.data, this.private.l.truncationNums);
      this.cache.set('l', l);
    }

    return new Angle(this.cache.get('l'), 'r');
  }

  /**
   * 获取 行星日心黄纬值
   * 
   * @return {Angle} 行星日心纬经 角度对象
   */
  get b() {
    if (!this.cache.has('b')) {
      let b = this.calculator.calc(this.private.b.data, this.private.b.truncationNums);
      this.cache.set('b', b);
    }

    return new Angle(this.cache.get('b'), 'r');
  }

  /**
   * 获取 行星日心距离
   *
   * 单位：天文距离 AU
   * 
   * @return {Number} 行星日心距离
   */
  get r() {
    if (!this.cache.has('r')) {
      let r = this.calculator.calc(this.private.r.data, this.private.r.truncationNums);
      this.cache.set('r', r);
    }

    return this.cache.get('r');
  }

  /**
   * 获取 行星日心黄道球坐标
   * 
   * @return {SphericalCoordinate3D} 行星日心黄道球坐标
   */
  get sc() {
    return new SphericalCoordinate3D(this.r, Math.PI / 2 - this.b.inRound(-90, 'd').getRadian(), this.l.inRound().getRadian());
  }

  /**
   * 设定观测儒略时间
   * 
   * @param  {JDateRepository} jdr 观测儒略时间
   */
  set obTime(jdr) {
    if (!(jdr instanceof JDateRepository)) throw Error('The param jdr should be a instance of JDateRepository.');

    this.cache.on(jdr);
    this.calculator.jdr = jdr;
    this.private.obTime = jdr;
  }

  /**
   * 获取观测儒略时间
   * 
   * @return {JDateRepository} 观测儒略时间
   */
  get obTime() {
    return this.private.obTime;
  }

  /**
   * 设置截断值数组
   * 
   * @param  {String} item        计算项：l、b、r
   * @param  {Array}  tNumsArray  截断值数组
   * @return {PlanetHECCOnVSOP87} 返回 this 引用
   */
  setTruncation(item, tNumsArray) {
    if (item !== 'l' && item !== 'b' && item !== 'r') throw Error('The param item should be l, b or r');
    if (!(tNumsArray instanceof Array)) throw Error('The param tNumsArray should be an Array.');

    this.private[item].truncationNums = tNumsArray;

    // 清除原始缓存数据
    this.cache.remove(item);

    // 精度级别为自定义
    this.private.accuracy = 'custom';

    return this;
  }

  /**
   * 获取截断值数组
   * 
   * @param  {String} item 计算项：l、b、r
   * @return {Array}       截断值数组
   */
  getTruncation(item) {
    if (item !== 'l' && item !== 'b' && item !== 'r') throw Error('The param item should be l, b or r');

    return this.private[item].truncationNums
  }

  /**
   * 设置计算允许最大误差
   *
   * 通过此方法设置运算截断值相较于 `setTruncation(item, tNumsArray)` 和 `set accuracy(level)` 会产生额外的运算量，若为了缩小运算量而使用该方法，则不适于多次调用。
   * 
   * @param  {String}             item   计算项：l、b、r
   * @param  {Number}             value  最大误差数值
   * @param  {Boolean}            mode   计算模式: true(瞬时误差)、mean(平均误差)、safe(安全误差)
   * @return {PlanetHECCOnVSOP87}        返回 this 引用
   */
  setMaxError(item, value, mode = 'true') {
    if (item !== 'l' && item !== 'b' && item !== 'r') throw Error('The param item should be l, b or r');
    if (typeof(value) !== 'number' || value < 0) throw Error('The param value should be a Number witch is greater than 0.');
    if (typeof(mode) !== 'string') throw Error('The param mode should be a String.');

    switch(mode.toLowerCase()) {
      case 'true':
        this.private[item].truncationNums = this.calculator.makeTruncationNums(this.private[item].data, value);
        break;

      case 'mean':
        this.private[item].truncationNums = this.calculator.makeMeanTruncationNums(this.private[item].data, value);
        break;

      case 'safe':
        this.private[item].truncationNums = this.calculator.makeSafeTruncationNums(this.private[item].data, value);
        break;

      default:
        throw Error('The param mode should be true、mean or safe.');
    }

    // 清除原始缓存数据
    this.cache.remove(item);

    // 精度级别为自定义
    this.private.accuracy = 'custom';

    return this;
  }

  /**
   * 获取最大误差
   * 
   * @param  {String}  item   计算项：l、b、r
   * @return {Number}         最大误差值
   */
  getMaxError(item) {
    if (item !== 'l' && item !== 'b' && item !== 'r') throw Error('The param item should be l, b or r');

    return this.calculator.estimateMaxError(this.private[item].data, this.private[item].truncationNums);
  }
}

module.exports = PlanetHECCOnVSOP87;
