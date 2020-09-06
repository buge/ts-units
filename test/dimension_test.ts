import {Times} from '../src/dimension';
import {expect} from 'chai';

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

      type Velocity = {length: 1, time: -1};
      const velocity: Velocity = {length: 1, time: -1};

      type Length = {length: 1};
      const length: Length = Times(time, velocity);

      expect(length).to.deep.equal({length: 1});
    });

    it('throws error on runtime exponent overflow', () => {
      type Volume = {length: 3};
      const volume: Volume = {length: 3};

      type Area = {length: 2};
      const area: Area = {length: 2};

      // You have to try pretty hard to circumvent the type safety.
      const pretendVolumeIsArea = (volume as unknown) as Area;
      expect(() => Times(area, pretendVolumeIsArea))
          .to.throw('Overflow in length');
    });
  });
});
