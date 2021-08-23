import {Quantity, Unit, makeUnit} from '../src/unit';
import {expect} from 'chai';

type Temperature = {temperature: 1};
const Temperature: Temperature = {temperature: 1};

type Length = {length: 1};
const Length: Length = {length: 1};

type Area = {length: 2};
const Area: Area = {length: 2};

type Time = {time: 1};
const Time: Time = {time: 1};

type Frequency = {time: -1};
const Frequency: Frequency = {time: -1};

type Speed = {length: 1; time: -1};
const Speed: Speed = {length: 1, time: -1};

describe('unit', () => {
  describe('Unit', () => {
    describe('call', () => {
      it('generates a quantity with the given amount', () => {
        const meters = makeUnit('m', Length);
        const length = meters(3.8);

        expect(length.amount).to.equal(3.8);
        expect(length.unit).to.equal(meters);
        expect(length.dimension).to.deep.equal(Length);
      });

      it('generates a quantity with the given amount for scaled units', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const length = feet(3.8);

        expect(length.amount).to.equal(3.8);
        expect(length.unit).to.equal(feet);
        expect(length.dimension).to.deep.equal(Length);
      });
    });

    describe('withSymbol', () => {
      it('sets the correct symbol', () => {
        const unit = makeUnit('a', Length).withSymbol('b');
        expect(unit.symbol).to.equal('b');
      });

      it('preserves other properties', () => {
        const fahrenheit = makeUnit('K', Temperature)
          .times(5 / 9)
          .withOffset(-459.67)
          .withSymbol('ºF');
        expect(fahrenheit.scale).to.be.closeTo(5 / 9, 0.0001);
        expect(fahrenheit.offset).to.be.closeTo(-459.67, 0.001);
      });
    });

    describe('times number', () => {
      it('sets correct scale', () => {
        const kelvin = makeUnit('K', Temperature);
        const rankine = kelvin.times(1 / 1.8);

        expect(rankine.scale).to.equal(1 / 1.8);
        expect(rankine.offset).to.equal(0);
      });

      it('secondary scaled sets correct scale', () => {
        const inches = makeUnit('in', Length);
        const feet = inches.times(12);
        const yards = feet.times(3);

        expect(yards.scale).to.equal(36);
      });
    });

    describe('withOffset', () => {
      it('sets correct offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.withOffset(-273.15);

        expect(celsius.scale).to.equal(1);
        expect(celsius.offset).to.equal(-273.15);
      });

      it('secondary scaled set correct offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.withOffset(-273.15);
        const fahrenheit = celsius.times(5 / 9).withOffset(32);

        expect(fahrenheit.scale).to.equal(5 / 9);
        expect(fahrenheit.offset).to.be.closeTo(-459.67, 0.001);
      });
    });

    describe('withSiPrefix', () => {
      it('returns a scaled unit', () => {
        const meters = makeUnit('m', Length);
        const centimeters = meters.withSiPrefix('c');

        expect(centimeters.scale).to.equal(0.01);
      });
    });

    describe('times', () => {
      it('adds dimensions', () => {
        const meters = makeUnit('m', Length);
        const hertz = makeUnit('Hz', Frequency);

        const speed: Unit<Speed> = meters.times(hertz);
        expect(speed.dimension).to.deep.equal({length: 1, time: -1});
      });

      it('scales from the base unit if derived from scaled units', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const bpm = makeUnit('Hz', Frequency).times(60);

        const speed: Unit<Speed> = feet.times(bpm);
        expect(speed.scale).to.be.closeTo(18.29, 0.01);
      });
    });

    describe('per', () => {
      it('subtracts dimensions', () => {
        const meters = makeUnit('m', Length);
        const seconds = makeUnit('s', Time);

        const speed: Unit<Speed> = meters.per(seconds);
        expect(speed.dimension).to.deep.equal({length: 1, time: -1});
      });

      it('scales from the base unit if derived from scaled units', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const minutes = makeUnit('s', Time).times(60);

        const speed: Unit<Speed> = feet.per(minutes);
        expect(speed.scale).to.be.closeTo(0.00508, 0.01);
      });
    });

    describe('reciprocal', () => {
      it('negates exponents', () => {
        const seconds = makeUnit('s', Time);

        const hertz: Unit<Frequency> = seconds.reciprocal();
        expect(hertz.dimension).to.deep.equal({time: -1});
      });

      it('inverts the scale', () => {
        const minutes = makeUnit('s', Time).times(60);

        const bpm: Unit<Frequency> = minutes.reciprocal();
        expect(bpm.scale).to.be.closeTo(0.01666, 0.00001);
      });
    });

    describe('squared', () => {
      it('doubles exponents', () => {
        const meters = makeUnit('m', Length);

        const squareMeter: Unit<Area> = meters.squared();
        expect(squareMeter.dimension).to.deep.equal({length: 2});
      });

      it('squares the scale', () => {
        const feet = makeUnit('m', Length).times(0.3048);

        const squareFeet: Unit<Area> = feet.squared();
        expect(squareFeet.scale).to.be.closeTo(0.092903, 0.000001);
      });
    });
  });

  describe('Quantity', () => {
    describe('isCloseTo', () => {
      const meters = makeUnit('m', Length);
      const feet = meters.times(0.3048).withSymbol('ft');

      const length = meters(3);
      const tests = [
        {other: meters(3), epsilon: 1e-10, want: true},
        {other: meters(3.01), epsilon: 0.011, want: true},
        {other: meters(3.01), epsilon: 0.009, want: false},
        {other: meters(2.99), epsilon: 0.011, want: true},
        {other: meters(2.99), epsilon: 0.009, want: false},
        {other: feet(9.84), epsilon: 0.01, want: true},
        {other: feet(9.84), epsilon: 0.001, want: false}
      ];

      tests.forEach(({other, epsilon, want}) => {
        it(`${length.toString()}.isCloseTo(${other.toString()}, ${epsilon}) = ${want}`, () => {
          expect(length.isCloseTo(other, epsilon)).to.equal(want);
        });
      });
    });

    describe('<', () => {
      const meters = makeUnit('m', Length);
      const feet = meters.times(0.3048).withSymbol('ft');

      const length = meters(3);
      const tests = [
        {other: meters(3), want: false},
        {other: meters(3.01), want: true},
        {other: meters(2.99), want: false},
        {other: feet(9.83), want: false},
        {other: feet(9.85), want: true}
      ];

      tests.forEach(({other, want}) => {
        it(`(${length.toString()} < ${other.toString()}) == ${want}`, () => {
          expect(length < other).to.equal(want);
        });
      });
    });

    describe('in', () => {
      it('scales the amount', () => {
        const meters = makeUnit('m', Length);
        const feet = meters.times(0.3048);

        const length = meters(3).in(feet);
        expect(length.amount).to.be.closeTo(9.84252, 0.00001);
      });

      it('shifts by the right offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.withOffset(-273.15);

        const temperature = kelvin(305.15).in(celsius);
        expect(temperature.amount).to.be.closeTo(32, 0.00001);
      });

      it('shifts by the right scale and offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const fahrenheit = kelvin.times(5 / 9).withOffset(-459.67);

        const temperature = kelvin(305.15).in(fahrenheit);
        expect(temperature.amount).to.be.closeTo(89.6, 0.00001);
      });

      it('sets the right unit', () => {
        const meters = makeUnit('m', Length);
        const feet = meters.times(0.3048);

        const length = meters(3).in(feet);
        expect(length.unit).to.equal(feet);
      });
    });

    describe('plus', () => {
      it('adds the amount', () => {
        const meters = makeUnit('m', Length);
        const length = meters(3).plus(meters(4));
        expect(length.amount).to.equal(7);
        expect(length.unit).to.equal(meters);
      });

      it('converts to the given unit', () => {
        const meters = makeUnit('m', Length);
        const feet = meters.times(0.3048);

        const length = meters(3).plus(feet(4));
        expect(length.amount).to.be.closeTo(13.8425, 0.0001);
        expect(length.unit).to.equal(feet);
      });

      describe('minus', () => {
        it('subtracts the amount', () => {
          const meters = makeUnit('m', Length);
          const length = meters(3).minus(meters(4));
          expect(length.amount).to.equal(-1);
          expect(length.unit).to.equal(meters);
        });

        it('converts to the given unit', () => {
          const meters = makeUnit('m', Length);
          const feet = meters.times(0.3048);

          const length = meters(3).minus(feet(4));
          expect(length.amount).to.be.closeTo(5.8425, 0.0001);
          expect(length.unit).to.equal(feet);
        });
      });
    });

    describe('times', () => {
      it('multiplies the amounts', () => {
        const meters = makeUnit('m', Length);
        const hertz = makeUnit('hz', Frequency);

        const speed = meters(5).times(hertz(3));
        expect(speed.amount).equal(15);
      });

      it('multiplies the unit scales', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const bpm = makeUnit('Hz', Frequency).times(60);

        const speed = feet(5).times(bpm(3));
        expect(speed.amount).equal(15);
        expect(speed.unit.scale).to.be.closeTo(18.29, 0.01);
      });

      it('retains the unit when right side is dimensionless', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const percent = makeUnit('', {}).times(1e-2);

        const length = feet(50).times(percent(10));
        expect(length.amount).to.be.closeTo(5, 1e-10);
        expect(length.unit).to.equal(feet);
      });

      it('adopts the unit when left side is dimensionless', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const percent = makeUnit('', {}).times(1e-2);

        const length = percent(10).times(feet(50));
        expect(length.amount).to.be.closeTo(5, 1e-10);
        expect(length.unit).to.equal(feet);
      });

      it('adopts the unit on the right when both are dimensionless', () => {
        const percent = makeUnit('', {}).times(1e-2);
        const permille = makeUnit('', {}).times(1e-3);

        const quantity = percent(30).times(permille(50));
        expect(quantity.amount).to.be.closeTo(15, 1e-10);
        expect(quantity.unit).to.equal(permille);
      });
    });

    describe('times number', () => {
      it('multiplies the amounts', () => {
        const meters = makeUnit('m', Length);

        const distance = meters(5).times(3);
        expect(distance.amount).equal(15);
        expect(distance.unit).equal(meters);
      });
    });

    describe('per', () => {
      it('divides the amounts', () => {
        const meters = makeUnit('m', Length);
        const seconds = makeUnit('s', Time);

        const speed: Quantity<Speed> = meters(5).per(seconds(3));
        expect(speed.amount).to.be.closeTo(1.666, 0.001);
      });

      it('divides the unit scales', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const minutes = makeUnit('s', Time).times(60);

        const speed: Quantity<Speed> = feet(5).per(minutes(3));
        expect(speed.amount).to.be.closeTo(1.666, 0.001);
        expect(speed.unit.scale).to.be.closeTo(0.00508, 0.01);
      });

      it('sets the amount to infinity when dividing by zero', () => {
        const meters = makeUnit('m', Length);
        const seconds = makeUnit('s', Time);

        const speed: Quantity<Speed> = meters(5).per(seconds(0));
        expect(speed.amount).to.equal(Infinity);
      });

      it('retains the unit when denominator is dimensionless', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const percent = makeUnit('', {}).times(1e-2);

        const length = feet(50).per(percent(10));
        expect(length.amount).to.be.closeTo(500, 1e-10);
        expect(length.unit).to.equal(feet);
      });
    });

    describe('reciprocal', () => {
      it('inverts the amount', () => {
        const seconds = makeUnit('s', Time);
        const frequency = seconds(5).reciprocal();
        expect(frequency.amount).to.be.closeTo(0.2, 0.001);
      });

      it('inverts the scale', () => {
        const minutes = makeUnit('s', Time).times(60);
        const frequency = minutes(5).reciprocal();
        expect(frequency.unit.scale).to.be.closeTo(0.01666, 0.00001);
      });

      it('sets the amount to infinity when zero', () => {
        const seconds = makeUnit('s', Time);
        const frequency = seconds(0).reciprocal();
        expect(frequency.amount).to.equal(Infinity);
      });
    });

    describe('squared', () => {
      it('squares the amount', () => {
        const meters = makeUnit('m', Length);
        const area = meters(3).squared();
        expect(area.amount).to.be.closeTo(9, 0.001);
      });

      it('squares the scale', () => {
        const feet = makeUnit('m', Length).times(0.3048);
        const area = feet(3).squared();
        expect(area.unit.scale).to.be.closeTo(0.092903, 0.000001);
      });
    });

    describe('isDimensionless', () => {
      it('returns true for dimensionless quantities', () => {
        const unit = makeUnit('', {});
        const quantity = unit(5);

        expect(quantity.isDimensionless()).to.be.true;
      });

      it('returns false for quantities with dimensions', () => {
        const unit = makeUnit('m', Length);
        const quantity = unit(5);

        expect(quantity.isDimensionless()).to.be.false;
      });
    });

    describe('toString', () => {
      it('appends the unit', () => {
        const meters = makeUnit('m', Length);
        expect(meters(5).toString()).to.equal('5m');
      });

      it('simplifies the amount', () => {
        const meters = makeUnit('m', Length);
        expect(meters(1 / 3).toString()).to.equal('0.333m');
      });

      it('uses thousand separators', () => {
        const meters = makeUnit('m', Length);
        expect(meters(1000).toString()).to.equal('1,000m');
      });
    });

    describe('valueOf', () => {
      it('returns the amount if in the base unit', () => {
        const meters = makeUnit('m', Length);

        const length = meters(3.14);
        expect(length.valueOf()).to.be.closeTo(3.14, 0.0000001);
      });

      it('converts to the base unit', () => {
        const meters = makeUnit('m', Length);
        const feet = meters.times(0.3048);

        const length = feet(3.14);
        expect(length.valueOf()).to.be.closeTo(0.957072, 0.0000001);
      });

      it('shifts by the offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.withOffset(-273.15);

        const temperature = celsius(23.2);
        expect(temperature.valueOf()).to.be.closeTo(296.35, 0.0000001);
      });

      it('shifts and converts by the offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const fahrenheit = kelvin.times(5 / 9).withOffset(-459.67);

        const temperature = fahrenheit(305.15);
        expect(temperature.valueOf()).to.be.closeTo(424.9, 0.0000001);
      });
    });
  });
});
