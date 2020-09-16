import {Quantity, Unit, makeUnit} from '../src/unit';
import {expect} from 'chai';

type Temperature = {temperature: 1};
const Temperature: Temperature = {temperature: 1};

type Length = {length: 1};
const Length: Length = {length: 1};

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
        const feet = makeUnit('m', Length).scaled(0.3048);
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
          .scaled(5 / 9, -459.67)
          .withSymbol('ºF');
        expect(fahrenheit.scale).to.be.closeTo(5 / 9, 0.0001);
        expect(fahrenheit.offset).to.be.closeTo(-459.67, 0.001);
      });
    });

    describe('scaled', () => {
      it('sets correct scale', () => {
        const kelvin = makeUnit('K', Temperature);
        const rankine = kelvin.scaled(1 / 1.8);

        expect(rankine.scale).to.equal(1 / 1.8);
        expect(rankine.offset).to.equal(0);
      });

      it('sets correct offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.scaled(1, -273.15);

        expect(celsius.scale).to.equal(1);
        expect(celsius.offset).to.equal(-273.15);
      });

      it('secondary scaled sets correct scale', () => {
        const inches = makeUnit('in', Length);
        const feet = inches.scaled(12);
        const yards = feet.scaled(3);

        expect(yards.scale).to.equal(36);
      });

      it('secondary scaled set correct offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.scaled(1, -273.15);
        const fahrenheit = celsius.scaled(5 / 9, 32);

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
        const feet = makeUnit('m', Length).scaled(0.3048);
        const bpm = makeUnit('Hz', Frequency).scaled(60);

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
        const feet = makeUnit('m', Length).scaled(0.3048);
        const minutes = makeUnit('s', Time).scaled(60);

        const speed: Unit<Speed> = feet.per(minutes);
        expect(speed.scale).to.be.closeTo(0.00508, 0.01);
      });
    });
  });

  describe('Quantity', () => {
    describe('isCloseTo', () => {
      const meters = makeUnit('m', Length);
      const feet = meters.scaled(0.3048).withSymbol('ft');

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

    describe('in', () => {
      it('scales the amount', () => {
        const meters = makeUnit('m', Length);
        const feet = meters.scaled(0.3048);

        const length = meters(3).in(feet);
        expect(length.amount).to.be.closeTo(9.84252, 0.00001);
      });

      it('shifts by the right offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.scaled(1, -273.15);

        const temperature = kelvin(305.15).in(celsius);
        expect(temperature.amount).to.be.closeTo(32, 0.00001);
      });

      it('shifts by the right scale and offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const fahrenheit = kelvin.scaled(5 / 9, -459.67);

        const temperature = kelvin(305.15).in(fahrenheit);
        expect(temperature.amount).to.be.closeTo(89.6, 0.00001);
      });

      it('sets the right unit', () => {
        const meters = makeUnit('m', Length);
        const feet = meters.scaled(0.3048);

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
        const feet = meters.scaled(0.3048);

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
          const feet = meters.scaled(0.3048);

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
        const feet = makeUnit('m', Length).scaled(0.3048);
        const bpm = makeUnit('Hz', Frequency).scaled(60);

        const speed = feet(5).times(bpm(3));
        expect(speed.amount).equal(15);
        expect(speed.unit.scale).to.be.closeTo(18.29, 0.01);
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
        const feet = makeUnit('m', Length).scaled(0.3048);
        const minutes = makeUnit('s', Time).scaled(60);

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
  });
});
