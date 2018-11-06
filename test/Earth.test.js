'use strict';

const expect = require("chai").expect;
const { JDateRepository } = require('@behaver/jdate');
const Angle = require('@behaver/angle');
const Earth = require('../src/planets/Earth');

const angle = new Angle;

describe('#Earth', () => {
  describe('Verify', () => {
    it('天文算法 例.24.b', () => {
      let earth = new Earth(new JDateRepository(2448908.5, 'jde'));
      let sc = earth.sc;

      expect(sc.phi).to.closeTo(angle.setRadian(-43.63484796).inRound().getRadian(), 0.00000001);
      expect(Math.PI / 2 - sc.theta).to.closeTo(angle.setRadian(-0.00000312).inRound(-90).getRadian(), 0.000001);
      expect(sc.r).to.closeTo(0.99760775, 0.00000001);
    })
  });
})