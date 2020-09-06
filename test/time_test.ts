import {s, msec, usec, nanoseconds, minutes, hours} from '../src/time';
import {expect} from 'chai';

describe('time smoke tests', () => {
  const equalUnits = [
    {a: nanoseconds(1234), b: usec(1.234)},
    {a: usec(1234), b: msec(1.234)},
    {a: msec(1234), b: s(1.234)},
    {a: s(1234), b: minutes(20.5667)},
    {a: minutes(1234), b: hours(20.5667)},
  ]

  equalUnits.forEach(({a, b}) => {
    it(`${a.toString()} equals ${b.toString()}`, () => {
      expect(a.in(b.unit).amount).to.be.closeTo(b.amount, 0.001);
    });
  });
});