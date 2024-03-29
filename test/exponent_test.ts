import {
  Add,
  Double,
  Negate,
  Subtract,
  Triple,
  isExponent
} from '../src/exponent';
import {expect} from 'chai';

/* eslint-disable @typescript-eslint/no-unused-vars */
const a1: Add<2, 1> = 3;
const a2: Add<2, -3> = -1;
const a3: Add<2, undefined> = 2;
const s1: Subtract<4, 1> = 3;
const s2: Subtract<2, 3> = -1;
const s3: Subtract<2, undefined> = 2;
const s4: Subtract<3, 3> = undefined;
const n1: Negate<-2> = 2;
const n2: Negate<3> = -3;
const n3: Negate<undefined> = undefined;
const d1: Double<-2> = -4;
const d2: Double<1> = 2;
const d3: Double<undefined> = undefined;
const t1: Triple<-1> = -3;
const t2: Triple<1> = 3;
const t3: Triple<undefined> = undefined;
/* eslint-enable @typescript-eslint/no-unused-vars */

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
