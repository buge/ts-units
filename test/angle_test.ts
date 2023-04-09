import {
  acos,
  asin,
  atan,
  atan2,
  cos,
  degrees,
  radians,
  sin,
  tan,
  turns
} from '../src/angle';
import {Dimensions} from '../src/dimension';
import {Quantity} from '../src/unit';
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
      {angle: radians(Math.PI / 2), sin: 1}
    ];

    tests.forEach(test => {
      it(`sin(${test.angle.toString()}) = ${test.sin}`, () => {
        expect(sin(test.angle)).to.be.closeTo(test.sin, 0.0001);
      });

      it(`asin(${test.sin}) = ${test.angle.toString()}`, () => {
        expectCloseTo(asin(test.sin), test.angle);
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
        expectCloseTo(acos(test.cos), test.angle);
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
        expectCloseTo(atan(test.tan), test.angle);
      });
    });
  });

  describe('atan2', () => {
    const tests = [
      {x: 0, y: 0, want: degrees(0)},
      {x: 0, y: 1, want: degrees(0)},
      {x: 1, y: 0, want: degrees(90)},
      {x: 1, y: 1, want: degrees(45)}
    ];

    tests.forEach(test => {
      it(`atan2(${test.x}, ${test.y}) = ${test.want.toString()}`, () => {
        expectCloseTo(atan2(test.x, test.y), test.want);
      });
    });
  });
});

// TODO(bunge): Move this to a Chai method instead.
function expectCloseTo<D extends Dimensions>(
  actual: Quantity<number, D>,
  expected: Quantity<number, D>
) {
  return expect(
    actual.isCloseTo(expected, 0.0001),
    `Expected ${actual.in(expected.unit).toString()} to equal ${expected}`
  ).to.be.true;
}
