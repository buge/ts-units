/**
 * A geometric representation of a particular type number.
 *
 * The Planar Angles need access to geometric functions.
 * Similar to Arithmetic interface, we can provide an implementation
 * that is not based on the native Math functions of JavaScript.
 *
 * By implementing this interface, you will be able to write your own
 * implementation of the geometric functions.
 * The implementation will need to have the same number type as your arithmetic
 * implementation.
 */
export interface Geometric<NumberType> {
  sin(value: NumberType): NumberType;
  cos(value: NumberType): NumberType;
  tan(value: NumberType): NumberType;
  asin(value: NumberType): NumberType;
  acos(value: NumberType): NumberType;
  atan(value: NumberType): NumberType;
  atan2(left: NumberType, right: NumberType): NumberType;
}

/**
 * Default implementation of the geometric interface
 * based on the native Math functions of JavaScript.
 */
export const NativeGeometric: Geometric<number> = {
  sin: function (value: number): number {
    return Math.sin(value);
  },
  cos: function (value: number): number {
    return Math.cos(value);
  },
  tan: function (value: number): number {
    return Math.tan(value);
  },
  asin: function (value: number): number {
    return Math.asin(value);
  },
  acos: function (value: number): number {
    return Math.acos(value);
  },
  atan: function (value: number): number {
    return Math.atan(value);
  },
  atan2: function (left: number, right: number): number {
    return Math.atan2(left, right);
  }
};
