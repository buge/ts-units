import {
  angstroms,
  astronomicalUnits,
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
    {a: angstroms(123), b: nanometers(12.3)},
    {a: centimeters(123), b: inches(48.4251968503937)},
    {a: centimeters(123), b: feet(4.035433070866142)},
    {a: meters(1234), b: yards(1349.5188101487315)},
    {a: meters(1234), b: chains(61.3417640976696)},
    {a: meters(1234), b: furlongs(6.134176409766961)},
    {a: meters(1234), b: miles(0.7667720512208701)},
    {a: meters(1234), b: fathoms(674.7594050743658)},
    {a: meters(1234), b: nauticalMiles(0.6663066954643628)},
    {a: astronomicalUnits(1234), b: miles(114707466174.9135)}
  ];

  equalUnits.forEach(({a, b}) => {
    it(`${a.toString()} equals ${b.toString()}`, () => {
      expect(a.in(b.unit).amount).to.be.closeTo(b.amount, 1e-10);
    });

    it(`${b.toString()} equals ${a.toString()}`, () => {
      expect(b.in(a.unit).amount).to.be.closeTo(a.amount, 1e-10);
    });
  });
});
