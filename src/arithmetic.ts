export interface Arithmetic<NumberType> {
  fromNative(value: number): NumberType;
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

  // Needed for the calculation of angles
  sin(value: NumberType): NumberType;
  cos(value: NumberType): NumberType;
  tan(value: NumberType): NumberType;
  asin(value: NumberType): NumberType;
  acos(value: NumberType): NumberType;
  atan(value: NumberType): NumberType;
  atan2(left: NumberType, right: NumberType): NumberType;
}

export const NativeArithmetic: Arithmetic<number> = {
  fromNative: function (value: number): number {
    return value;
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
  },
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
