import {assert} from './utils';

/**
 * An arithmetic representation of a particular number type.
 *
 * The library is using by default the native number of JavaScript.
 * As we know, it is not precise, and could lead to a calculation error.
 * The most infamous example being (0.1 + 0.2).
 *
 * By implementing this interface, you will be able to write your own
 * implementation of the arithmetic.
 *
 * For instance, you could implement it using [decimal.js]{@link https://github.com/MikeMcl/decimal.js}.
 */
export interface Arithmetic<NumberType> {
  /**
   * Return a NumberType of the input.
   * If it is not possible, it should throw an error.
   *
   * @param value The value to convert to NumberType
   */
  from(value: number | string | NumberType): NumberType;
  toNative(value: NumberType): number;
  add(left: NumberType, right: NumberType): NumberType;
  sub(left: NumberType, right: NumberType): NumberType;
  mul(left: NumberType, right: NumberType): NumberType;
  div(left: NumberType, right: NumberType): NumberType;
  pow(base: NumberType, exponent: NumberType): NumberType;
  abs(value: NumberType): NumberType;
  // 1 => left > right
  // 0 => left === 0
  // -1 => left < right
  compare(left: NumberType, right: NumberType): number;
}

/**
 * Default implementation of the arithmetic interface
 * based on the native number of JavaScript.
 */
export const NativeArithmetic: Arithmetic<number> = {
  from: function (value: number | string): number {
    const convertedValue = Number(value);
    assert(
      !isNaN(convertedValue),
      `Input '${value}' cannot be converted to a number`
    );
    return convertedValue;
  },
  toNative: function (value: number): number {
    return value;
  },
  add: function (left: number, right: number): number {
    return left + right;
  },
  sub: function (left: number, right: number): number {
    return left - right;
  },
  mul: function (left: number, right: number): number {
    return left * right;
  },
  div: function (left: number, right: number): number {
    return left / right;
  },
  pow: function (base: number, exponent: number): number {
    return base ** exponent;
  },
  abs: function (value: number): number {
    return Math.abs(value);
  },
  compare: function (left: number, right: number): number {
    return left - right;
  }
};
