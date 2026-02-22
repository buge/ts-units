import {Arithmetic, NativeArithmetic} from '../src/arithmetic';
import {expect} from 'chai';
import {makeUnitFactory} from '../src/unit';

class CustomNumber {
  value: number;

  constructor(value: number) {
    this.value = value;
  }
}

export const CustomArithmetic: Arithmetic<CustomNumber> = {
  from: function (value): CustomNumber {
    if (value instanceof CustomNumber) {
      return value;
    }
    return new CustomNumber(NativeArithmetic.from(value));
  },
  toNative: function (value: CustomNumber): number {
    return value.value;
  },
  add: function (left: CustomNumber, right: CustomNumber): CustomNumber {
    return new CustomNumber(NativeArithmetic.add(left.value, right.value));
  },
  sub: function (left: CustomNumber, right: CustomNumber): CustomNumber {
    return new CustomNumber(NativeArithmetic.sub(left.value, right.value));
  },
  mul: function (left: CustomNumber, right: CustomNumber): CustomNumber {
    return new CustomNumber(NativeArithmetic.mul(left.value, right.value));
  },
  div: function (left: CustomNumber, right: CustomNumber): CustomNumber {
    return new CustomNumber(NativeArithmetic.div(left.value, right.value));
  },
  pow: function (base: CustomNumber, exponent: CustomNumber): CustomNumber {
    return new CustomNumber(NativeArithmetic.pow(base.value, exponent.value));
  },
  abs: function (value: CustomNumber): CustomNumber {
    return new CustomNumber(NativeArithmetic.abs(value.value));
  },
  compare: function (left: CustomNumber, right: CustomNumber): number {
    return NativeArithmetic.compare(left.value, right.value);
  }
};

type Length = {length: 1};
const Length: Length = {length: 1};

describe('unitFactory', () => {
  const meters = makeUnitFactory(CustomArithmetic).makeUnit('m', Length);

  it('generates a unit', () => {
    expect(meters.arithmetic).to.equal(CustomArithmetic);
    expect(meters.symbol).to.equal('m');
    expect(meters.dimension).to.equal(Length);
    expect(meters.scale.value).to.equal(1);
    expect(meters.offset.value).to.equal(0);
  });

  describe('Unit', () => {
    it('generates a quantity with amount of different input types', () => {
      const lengthNative = meters(5);
      const lengthString = meters('5');
      const lengthCustom = meters(new CustomNumber(5));

      expect(lengthNative.unit).to.equal(meters);
      expect(lengthString.unit).to.equal(meters);
      expect(lengthCustom.unit).to.equal(meters);

      expect(lengthNative.dimension).to.deep.equal(Length);
      expect(lengthString.dimension).to.deep.equal(Length);
      expect(lengthCustom.dimension).to.deep.equal(Length);

      expect(lengthNative.amount.value).to.equal(5);
      expect(lengthString.amount.value).to.equal(5);
      expect(lengthCustom.amount.value).to.equal(5);
    });

    it('is multiply by various input type', () => {
      const kilometersNative = meters.times(1000);
      const kilometersString = meters.times('1000');
      const kilometersCustom = meters.times(new CustomNumber(1000));

      expect(kilometersNative.scale.value).to.equal(1000);
      expect(kilometersString.scale.value).to.equal(1000);
      expect(kilometersCustom.scale.value).to.equal(1000);
    });

    it('is divided by various input type', () => {
      const kilometersNative = meters.per(0.001);
      const kilometersString = meters.per('0.001');
      const kilometersCustom = meters.per(new CustomNumber(0.001));

      expect(kilometersNative.scale.value).to.equal(1000);
      expect(kilometersString.scale.value).to.equal(1000);
      expect(kilometersCustom.scale.value).to.equal(1000);
    });
  });

  describe('Quantity', () => {
    const length = meters(6);

    it('add quantity of different input types', () => {
      const lengthNative = length.plus(2);
      const lengthString = length.plus('2');
      const lengthCustom = length.plus(new CustomNumber(2));

      expect(lengthNative.amount.value).to.equal(8);
      expect(lengthString.amount.value).to.equal(8);
      expect(lengthCustom.amount.value).to.equal(8);
    });

    it('remove quantity of different input type', () => {
      const lengthNative = length.minus(2);
      const lengthString = length.minus('2');
      const lengthCustom = length.minus(new CustomNumber(2));

      expect(lengthNative.amount.value).to.equal(4);
      expect(lengthString.amount.value).to.equal(4);
      expect(lengthCustom.amount.value).to.equal(4);
    });

    it('multiply quantity by different input type', () => {
      const lengthNative = length.times(2);
      const lengthString = length.times('2');
      const lengthCustom = length.times(new CustomNumber(2));

      expect(lengthNative.amount.value).to.equal(12);
      expect(lengthString.amount.value).to.equal(12);
      expect(lengthCustom.amount.value).to.equal(12);
    });

    it('divide quantity by different input type', () => {
      const lengthNative = length.per(2);
      const lengthString = length.per('2');
      const lengthCustom = length.per(new CustomNumber(2));

      expect(lengthNative.amount.value).to.equal(3);
      expect(lengthString.amount.value).to.equal(3);
      expect(lengthCustom.amount.value).to.equal(3);
    });
  });
});
