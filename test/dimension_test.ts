import {
  Cubed,
  Dimensions,
  Over,
  Reciprocal,
  Squared,
  Times
} from '../src/dimension';
import {expect} from 'chai';

/* eslint-disable @typescript-eslint/no-unused-vars */
const t1: Times<{length: 1}, {length: 1}> = {length: 2};
const t2: Times<{length: 1}, {time: -1}> = {length: 1, time: -1};
const t3: Times<{length: 1}, {length: -1}> = {};
const o1: Over<{length: 1}, {time: 1}> = {length: 1, time: -1};
const o2: Over<{length: 1}, {length: 1}> = {};
const r1: Reciprocal<{time: 1}> = {time: -1};
const r2: Reciprocal<{length: 1; time: -2}> = {length: -1, time: 2};
const r3: Reciprocal<Dimensions> = {};
const d1: Squared<{time: 1}> = {time: 2};
const d2: Squared<{length: 1; time: -2}> = {length: 2, time: -4};
const d3: Squared<Dimensions> = {};
/* eslint-enable @typescript-eslint/no-unused-vars */

describe('dimension', () => {
  describe('Times', () => {
    it('adds exponents', () => {
      type Length = {length: 1};
      const length: Length = {length: 1};

      type Area = {length: 2};
      const area: Area = {length: 2};

      type Volume = {length: 3};
      const volume: Volume = Times(length, area);

      expect(volume).to.deep.equal({length: 3});
    });

    it('clears 0 exponents', () => {
      type Time = {time: 1};
      const time: Time = {time: 1};

      type Speed = {length: 1; time: -1};
      const speed: Speed = {length: 1, time: -1};

      type Length = {length: 1};
      const length: Length = Times(time, speed);

      expect(length).to.deep.equal({length: 1});
    });

    it('throws error on runtime exponent overflow', () => {
      const foo: Dimensions = {foo: 4};
      expect(() => Times(foo, foo)).to.throw('Overflow in foo');
    });
  });

  describe('Reciprocal', () => {
    it('negates exponents', () => {
      type Acceleration = {length: 1; time: -2};
      const Acceleration: Acceleration = {length: 1, time: -2};

      type Foo = {length: -1; time: 2};
      const foo: Foo = Reciprocal(Acceleration);

      expect(foo).to.deep.equal({length: -1, time: 2});
    });
  });

  describe('Squared', () => {
    it('doubles exponents', () => {
      type Length = {length: 1};
      const Length: Length = {length: 1};

      type Area = {length: 2};
      const area: Area = Squared(Length);

      expect(area).to.deep.equal({length: 2});
    });
  });

  describe('Cubed', () => {
    it('triples exponents', () => {
      type Length = {length: 1};
      const Length: Length = {length: 1};

      type Volume = {length: 3};
      const volume: Volume = Cubed(Length);

      expect(volume).to.deep.equal({length: 3});
    });
  });
});
