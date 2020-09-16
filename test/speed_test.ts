import {
  feetPerSecond,
  kilometersPerHour,
  knots,
  metersPerSecond,
  milesPerHour
} from '../src/speed';
import {expect} from 'chai';

describe('speed smoke tests', () => {
  const equalUnits = [
    {a: metersPerSecond(1), b: kilometersPerHour(3.6)},
    {a: kilometersPerHour(1), b: milesPerHour(0.621371)},
    {a: milesPerHour(1), b: knots(0.868976)},
    {a: knots(1), b: feetPerSecond(1.68781)},
    {a: feetPerSecond(1), b: metersPerSecond(0.3048)}
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
