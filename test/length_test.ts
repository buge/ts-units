import {cm, m, km, inches, feet, yards, chains, furlongs, miles, angstrom, nanometers} from '../src/length';
import {expect} from 'chai';

describe('length smoke tests', () => {
  const equalUnits = [
    {a: cm(123), b: m(1.23)},
    {a: m(1234), b: km(1.234)},
    {a: angstrom(123), b: nanometers(12.3)},
    {a: cm(123), b: inches(48.4252)},
    {a: cm(123), b: feet(4.03543)},
    {a: m(1234), b: yards(1349.519)},
    {a: m(1234), b: chains(61.34176)},
    {a: m(1234), b: furlongs(6.134164)},
    {a: m(1234), b: miles(0.7667721)},
  ]

  equalUnits.forEach(({a, b}) => {
    it(`${a.toString()} equals ${b.toString()}`, () => {
      expect(a.in(b.unit).amount).to.be.closeTo(b.amount, 0.001);
    });
  });
});