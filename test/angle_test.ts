import {
  acos,
  asin,
  atan,
  cos,
  degrees,
  radians,
  sin,
  tan,
  turns
} from '../src/angle';
import {expect} from 'chai';

describe('angle', () => {
  describe('smoke tests', () => {
    const equalUnits = [
      {a: turns(1), b: radians(2 * Math.PI)},
      {a: turns(1), b: degrees(360)},
      {a: degrees(-30), b: radians(-Math.PI / 6)}
    ];

    equalUnits.forEach(({a, b}) => {
      it(`${a.toString()} equals ${b.toString()}`, () => {
        expect(a.in(b.unit).amount).to.be.closeTo(b.amount, 0.001);
      });
    });
  });

  describe('sin/asin', () => {
    const tests = [
      {angle: degrees(0), sin: 0},
      {angle: degrees(30), sin: 0.5},
      {angle: degrees(90), sin: 1},
      {angle: radians(Math.PI), sin: 0}
    ];

    tests.forEach(test => {
      it(`sin(${test.angle.toString()}) = ${test.sin}`, () => {
        expect(sin(test.angle)).to.be.closeTo(test.sin, 0.0001);
      });

      it(`asin(${test.sin}) = ${test.angle.toString()}`, () => {
        expect(asin(test.sin).isCloseTo(test.angle, 0.0001));
      });
    });
  });

  describe('cos/acos', () => {
    const tests = [
      {angle: degrees(0), cos: 1},
      {angle: degrees(60), cos: 0.5},
      {angle: degrees(90), cos: 0},
      {angle: radians(Math.PI), cos: -1}
    ];

    tests.forEach(test => {
      it(`cos(${test.angle.toString()}) = ${test.cos}`, () => {
        expect(cos(test.angle)).to.be.closeTo(test.cos, 0.0001);
      });

      it(`acos(${test.cos}) = ${test.angle.toString()}`, () => {
        expect(acos(test.cos).isCloseTo(test.angle, 0.0001));
      });
    });
  });

  describe('tan/atan', () => {
    const tests = [
      {angle: degrees(0), tan: 0},
      {angle: degrees(-45), tan: -1}
    ];

    tests.forEach(test => {
      it(`tan(${test.angle.toString()}) = ${test.tan}`, () => {
        expect(tan(test.angle)).to.be.closeTo(test.tan, 0.0001);
      });

      it(`atan(${test.tan}) = ${test.angle.toString()}`, () => {
        expect(atan(test.tan).isCloseTo(test.angle, 0.0001));
      });
    });
  });
});
