import {percent, permille, permyriad, scalar} from '../src/scalar';
import {centimeters} from '../src/length';
import {expect} from 'chai';

describe('scalar', () => {
  describe('smoke tests', () => {
    const equalUnits = [
      {a: scalar(1), b: percent(100)},
      {a: scalar(1), b: permille(1000)},
      {a: scalar(1), b: permyriad(10000)},
      {a: scalar(0.01), b: percent(1)},
      {a: scalar(0.001), b: permille(1)},
      {a: scalar(0.0001), b: permyriad(1)}
    ];

    equalUnits.forEach(({a, b}) => {
      it(`${a.toString()} equals ${b.toString()}`, () => {
        expect(a.in(b.unit).amount).to.be.closeTo(b.amount, 1e-6);
      });

      it(`${b.toString()} equals ${a.toString()}`, () => {
        expect(b.in(a.unit).amount).to.be.closeTo(a.amount, 1e-6);
      });
    });
  });

  describe('times units', () => {
    it('scales other units', () => {
      const length = percent(3).times(centimeters(100));
      expect(length.amount).to.be.closeTo(3, 0.001);
      expect(length.unit).to.equal(centimeters);
    });
  });
});
