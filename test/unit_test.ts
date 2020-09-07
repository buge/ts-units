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
    describe('scaled', () => {
      it('set correct scale', () => {
        const kelvin = makeUnit('K', Temperature);
        const rankine = kelvin.scaled('ºR', 1.8);

        expect(rankine.scale).to.equal(1.8);
        expect(rankine.offset).to.equal(0);
      });

      it('set correct offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.scaled('ºC', 1, -272.15);

        expect(celsius.scale).to.equal(1);
        expect(celsius.offset).to.equal(-272.15);
      });

      it('secondary scaled set correct scale', () => {
        const inches = makeUnit('in', Length);
        const feet = inches.scaled('ft', 12);
        const yards = feet.scaled('yd', 3);

        expect(yards.scale).to.equal(36);
      });

      it('secondary scaled set correct offset', () => {
        const kelvin = makeUnit('K', Temperature);
        const celsius = kelvin.scaled('ºC', 1, -273.15);
        const fahrenheit = celsius.scaled('ºF', 9/5, 32);

        expect(fahrenheit.scale).to.equal(9/5);
        expect(fahrenheit.offset).to.be.closeTo(-459.67, 0.001);
      });
    });

    describe('times', () => {
      it ('adds dimensions', () => {
        const meters = makeUnit('m', Length);
        const hertz = makeUnit('Hz', Frequency);

        const speed: Unit<Speed> = meters.times('m/s', hertz);
        expect(speed.dimension).to.deep.equal({length: 1, time: -1});
      });

      it ('scales from the base unit if derived from scaled units', () => {
        const feet = makeUnit('m', Length).scaled('ft', 3.281);
        const bpm = makeUnit('Hz', Frequency).scaled('bpm', 60);

        const speed: Unit<Speed> = feet.times('ft/min', bpm);
        expect(speed.scale).to.be.closeTo(196.86, 0.01);
      });
    });
  });

  describe('per', () => {
    it ('subtracts dimensions', () => {
      const meters = makeUnit('m', Length);
      const seconds = makeUnit('s', Time);

      const speed: Unit<Speed> = meters.per('m/s', seconds);
      expect(speed.dimension).to.deep.equal({length: 1, time: -1});
    });

    it ('scales from the base unit if derived from scaled units', () => {
      const feet = makeUnit('m', Length).scaled('ft', 3.281);
      const minutes = makeUnit('s', Time).scaled('min', 1/60);

      const speed: Unit<Speed> = feet.per('ft/min', minutes);
      expect(speed.scale).to.be.closeTo(196.86, 0.01);
    });
  });
});