import {makeUnit, Unit} from '../src/unit';
import {expect} from 'chai';

type Temperature = {temperature: 1};
const Temperature: Temperature = {temperature: 1};

type Length = {length: 1};
const Length: Length = {length: 1};

type Time = {time: 1};
const Time: Time = {time: 1};

type Frequency = {time: -1};
const Frequency: Frequency = {time: -1};

type Speed = {length: 1, time: -1};
const Speed: Speed = {length: 1, time: -1};

describe('unit', () => {
 
  describe('Unit', () => {
    describe('withSiPrefix', () => {
      it('returns a scaled unit', () => {
        const meters = makeUnit('m', Length);
        const centimeters = meters.withSiPrefix('c');

        expect(centimeters.scale).to.equal(0.01);
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
        const celsius = kelvin.scaled(1, -272.15);

        expect(celsius.scale).to.equal(1);
        expect(celsius.offset).to.equal(-272.15);
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

    describe('times', () => {
      it ('adds dimensions', () => {
        const meters = makeUnit('m', Length);
        const hertz = makeUnit('Hz', Frequency);

        const speed: Unit<Speed> = meters.times(hertz);
        expect(speed.dimension).to.deep.equal({length: 1, time: -1});
      });

      it ('scales from the base unit if derived from scaled units', () => {
        const feet = makeUnit('m', Length).scaled(0.3048);
        const bpm = makeUnit('Hz', Frequency).scaled(60);

        const speed: Unit<Speed> = feet.times(bpm);
        expect(speed.scale).to.be.closeTo(18.29, 0.01);
      });
    });

    describe('per', () => {
      it ('subtracts dimensions', () => {
        const meters = makeUnit('m', Length);
        const seconds = makeUnit('s', Time);

        const speed: Unit<Speed> = meters.per(seconds);
        expect(speed.dimension).to.deep.equal({length: 1, time: -1});
      });

      it ('scales from the base unit if derived from scaled units', () => {
        const feet = makeUnit('m', Length).scaled(0.3048);
        const minutes = makeUnit('s', Time).scaled(60);

        const speed: Unit<Speed> = feet.per(minutes);
        expect(speed.scale).to.be.closeTo(0.00508, 0.01);
      });
    });
  });
});