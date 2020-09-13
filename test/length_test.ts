import {
  angstrom,
  centimeters,
  chains,
  fathoms,
  feet,
  furlongs,
  inches,
  kilometers,
  meters,
  miles,
  nanometers,
  nauticalMiles,
  yards
} from '../src/length';
import {expect} from 'chai';

describe('length smoke tests', () => {
  const equalUnits = [
    {a: centimeters(123), b: meters(1.23)},
    {a: meters(1234), b: kilometers(1.234)},
    {a: angstrom(123), b: nanometers(12.3)},
    {a: centimeters(123), b: inches(48.4252)},
    {a: centimeters(123), b: feet(4.03543)},
    {a: meters(1234), b: yards(1349.519)},
    {a: meters(1234), b: chains(61.34176)},
    {a: meters(1234), b: furlongs(6.134164)},
    {a: meters(1234), b: miles(0.7667721)},
    {a: meters(1234), b: fathoms(674.7594)},
    {a: meters(1234), b: fathoms(674.7594)},
    {a: miles(1234), b: nauticalMiles(1072.317)}
  ];

  equalUnits.forEach(({a, b}) => {
    it(`${a.toString()} equals ${b.toString()}`, () => {
      expect(a.in(b.unit).amount).to.be.closeTo(b.amount, 0.001);
    });
  });
});
