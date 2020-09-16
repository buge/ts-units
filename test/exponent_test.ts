import {expect} from 'chai';
import {isExponent} from '../src/exponent';

describe('exponent', () => {
  describe('isExponent', () => {
    const tests = [
      {value: 'foo', isExponent: false},
      {value: 1, isExponent: true},
      {value: -4, isExponent: true},
      {value: undefined, isExponent: true},
      {value: 0, isExponent: false},
      {value: 3.2, isExponent: false}
    ];
    tests.forEach(test => {
      it(`isExponent(${test.value}) = ${test.isExponent}`, () => {
        expect(isExponent(test.value)).to.equal(test.isExponent);
      });
    });
  });
});
