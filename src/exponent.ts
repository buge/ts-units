// GENERATED FILE | DO NOT MODIFY
//
// Make changes instead to bin/generate_exponent.js and regenerate.

/**
 * Defines valid dimensional exponents and arithmetic over them.
 *
 * This module allows us to compute types of unit operations at compile time
 * rather than just at runtime. For example, we can determine that the
 * return type of
 *
 * ```
 *   const meter = makeUnit('m', {length: 1})
 *         ^ Unit<{length: 1>}
 *   const m2 = meter.times(meter);
 *   //    ^ Unit<{length: 2}>
 * ```
 *
 * This allows us to make pretty strong type guarantees despite flexible unit
 * and quantity arithmetic.
 *
 * Note that TypeScript currently doesn't allow us to perform arithmetic on
 * numeric literal types directly so we resort to lookup tables instead.
 */

/**
 * List of valid dimensional exponents.
 *
 * To make dimensions prettier for humans, we replace the exponent `0` with
 * `undefined` since a dimension of `{length: 1}` is easier to read than a
 * dimension of `{length: 1, mass: 0, ...}`. Note that this does make the
 * arithmetic lookup tables a bit more complex since we need to convert between
 * `undefined` and `0` since `undefined` isn't a valid property name.
 */
export type Exponent =
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | undefined
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;

/**
 * Type guard returning whether x is a valid Exponent.
 * @param x Any value.
 */
export function isExponent(x: unknown): x is Exponent {
  if (typeof x === 'undefined') {
    return true;
  }

  if (typeof x !== 'number') {
    return false;
  }

  return [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6].indexOf(x) >= 0;
}

/**
 * Adds two exponents.
 *
 * For example:
 *
 * ```
 *   type foo = Add<1, 2>;
 *   //   ^ 3
 *   type bar = Add<-3, 1>;
 *   //   ^ -2
 * ```
 *
 * The resulting value must be in range of valid defined exponents, otherwise
 * we return `never`:
 *
 * ```
 *   type foo = Add<6, 1>;
 *   //   ^ 'never'
 * ```
 */
// prettier-ignore
export type Add<A extends Exponent, B extends Exponent> =
  _Add[UndefinedToZero<A>][UndefinedToZero<B>];

interface _Add extends BinaryTable {
  [-6]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: never;
    [-1]: never;
    [0]: -6;
    [1]: -5;
    [2]: -4;
    [3]: -3;
    [4]: -2;
    [5]: -1;
    [6]: undefined;
  };
  [-5]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: never;
    [-1]: -6;
    [0]: -5;
    [1]: -4;
    [2]: -3;
    [3]: -2;
    [4]: -1;
    [5]: undefined;
    [6]: 1;
  };
  [-4]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: -6;
    [-1]: -5;
    [0]: -4;
    [1]: -3;
    [2]: -2;
    [3]: -1;
    [4]: undefined;
    [5]: 1;
    [6]: 2;
  };
  [-3]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: -6;
    [-2]: -5;
    [-1]: -4;
    [0]: -3;
    [1]: -2;
    [2]: -1;
    [3]: undefined;
    [4]: 1;
    [5]: 2;
    [6]: 3;
  };
  [-2]: {
    [-6]: never;
    [-5]: never;
    [-4]: -6;
    [-3]: -5;
    [-2]: -4;
    [-1]: -3;
    [0]: -2;
    [1]: -1;
    [2]: undefined;
    [3]: 1;
    [4]: 2;
    [5]: 3;
    [6]: 4;
  };
  [-1]: {
    [-6]: never;
    [-5]: -6;
    [-4]: -5;
    [-3]: -4;
    [-2]: -3;
    [-1]: -2;
    [0]: -1;
    [1]: undefined;
    [2]: 1;
    [3]: 2;
    [4]: 3;
    [5]: 4;
    [6]: 5;
  };
  [0]: {
    [-6]: -6;
    [-5]: -5;
    [-4]: -4;
    [-3]: -3;
    [-2]: -2;
    [-1]: -1;
    [0]: undefined;
    [1]: 1;
    [2]: 2;
    [3]: 3;
    [4]: 4;
    [5]: 5;
    [6]: 6;
  };
  [1]: {
    [-6]: -5;
    [-5]: -4;
    [-4]: -3;
    [-3]: -2;
    [-2]: -1;
    [-1]: undefined;
    [0]: 1;
    [1]: 2;
    [2]: 3;
    [3]: 4;
    [4]: 5;
    [5]: 6;
    [6]: never;
  };
  [2]: {
    [-6]: -4;
    [-5]: -3;
    [-4]: -2;
    [-3]: -1;
    [-2]: undefined;
    [-1]: 1;
    [0]: 2;
    [1]: 3;
    [2]: 4;
    [3]: 5;
    [4]: 6;
    [5]: never;
    [6]: never;
  };
  [3]: {
    [-6]: -3;
    [-5]: -2;
    [-4]: -1;
    [-3]: undefined;
    [-2]: 1;
    [-1]: 2;
    [0]: 3;
    [1]: 4;
    [2]: 5;
    [3]: 6;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [4]: {
    [-6]: -2;
    [-5]: -1;
    [-4]: undefined;
    [-3]: 1;
    [-2]: 2;
    [-1]: 3;
    [0]: 4;
    [1]: 5;
    [2]: 6;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [5]: {
    [-6]: -1;
    [-5]: undefined;
    [-4]: 1;
    [-3]: 2;
    [-2]: 3;
    [-1]: 4;
    [0]: 5;
    [1]: 6;
    [2]: never;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [6]: {
    [-6]: undefined;
    [-5]: 1;
    [-4]: 2;
    [-3]: 3;
    [-2]: 4;
    [-1]: 5;
    [0]: 6;
    [1]: never;
    [2]: never;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
}

/**
 * Returns the exponents that can be added to the given one without
 * overflowing.
 *
 * For example:
 * ```
 *   type foo = Addable<3>;
 *   //   ^ -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3
 */
export type Addable<A extends Exponent> =
  // Note that this _could_ have been defined by:
  // ```
  // _Subtract[_Add[LookupExponent][A]][A]
  // ```
  // rather than by a table, but that causes TypeScript to start complaining
  // that our “type instantiation is excessively deep and possibly infinite”.
  _Addable[UndefinedToZero<A>];

interface _Addable extends UnaryTable {
  [-6]: undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [-5]: -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [-4]: -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [-3]: -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [-2]: -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [-1]: -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [0]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [1]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5;
  [2]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4;
  [3]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3;
  [4]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2;
  [5]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1;
  [6]: -6 | -5 | -4 | -3 | -2 | -1 | undefined;
}

/**
 * Subtracts two exponents.
 *
 * For example:
 *
 * ```
 *   type foo = Subtract<3, 2>;
 *   //   ^ 1
 *   type bar = Subtract<-3, -2>;
 *   //   ^ -1
 * ```
 *
 * The resulting value must be in range of valid defined exponents, otherwise
 * we return `never`:
 *
 * ```
 *   type foo = Subtract<-6, 1>;
 *   //   ^ 'never'
 * ```
 */
export type Subtract<
  A extends Exponent,
  B extends Exponent
> = _Subtract[UndefinedToZero<A>][UndefinedToZero<B>];

interface _Subtract extends BinaryTable {
  [-6]: {
    [-6]: undefined;
    [-5]: -1;
    [-4]: -2;
    [-3]: -3;
    [-2]: -4;
    [-1]: -5;
    [0]: -6;
    [1]: never;
    [2]: never;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [-5]: {
    [-6]: 1;
    [-5]: undefined;
    [-4]: -1;
    [-3]: -2;
    [-2]: -3;
    [-1]: -4;
    [0]: -5;
    [1]: -6;
    [2]: never;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [-4]: {
    [-6]: 2;
    [-5]: 1;
    [-4]: undefined;
    [-3]: -1;
    [-2]: -2;
    [-1]: -3;
    [0]: -4;
    [1]: -5;
    [2]: -6;
    [3]: never;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [-3]: {
    [-6]: 3;
    [-5]: 2;
    [-4]: 1;
    [-3]: undefined;
    [-2]: -1;
    [-1]: -2;
    [0]: -3;
    [1]: -4;
    [2]: -5;
    [3]: -6;
    [4]: never;
    [5]: never;
    [6]: never;
  };
  [-2]: {
    [-6]: 4;
    [-5]: 3;
    [-4]: 2;
    [-3]: 1;
    [-2]: undefined;
    [-1]: -1;
    [0]: -2;
    [1]: -3;
    [2]: -4;
    [3]: -5;
    [4]: -6;
    [5]: never;
    [6]: never;
  };
  [-1]: {
    [-6]: 5;
    [-5]: 4;
    [-4]: 3;
    [-3]: 2;
    [-2]: 1;
    [-1]: undefined;
    [0]: -1;
    [1]: -2;
    [2]: -3;
    [3]: -4;
    [4]: -5;
    [5]: -6;
    [6]: never;
  };
  [0]: {
    [-6]: 6;
    [-5]: 5;
    [-4]: 4;
    [-3]: 3;
    [-2]: 2;
    [-1]: 1;
    [0]: undefined;
    [1]: -1;
    [2]: -2;
    [3]: -3;
    [4]: -4;
    [5]: -5;
    [6]: -6;
  };
  [1]: {
    [-6]: never;
    [-5]: 6;
    [-4]: 5;
    [-3]: 4;
    [-2]: 3;
    [-1]: 2;
    [0]: 1;
    [1]: undefined;
    [2]: -1;
    [3]: -2;
    [4]: -3;
    [5]: -4;
    [6]: -5;
  };
  [2]: {
    [-6]: never;
    [-5]: never;
    [-4]: 6;
    [-3]: 5;
    [-2]: 4;
    [-1]: 3;
    [0]: 2;
    [1]: 1;
    [2]: undefined;
    [3]: -1;
    [4]: -2;
    [5]: -3;
    [6]: -4;
  };
  [3]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: 6;
    [-2]: 5;
    [-1]: 4;
    [0]: 3;
    [1]: 2;
    [2]: 1;
    [3]: undefined;
    [4]: -1;
    [5]: -2;
    [6]: -3;
  };
  [4]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: 6;
    [-1]: 5;
    [0]: 4;
    [1]: 3;
    [2]: 2;
    [3]: 1;
    [4]: undefined;
    [5]: -1;
    [6]: -2;
  };
  [5]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: never;
    [-1]: 6;
    [0]: 5;
    [1]: 4;
    [2]: 3;
    [3]: 2;
    [4]: 1;
    [5]: undefined;
    [6]: -1;
  };
  [6]: {
    [-6]: never;
    [-5]: never;
    [-4]: never;
    [-3]: never;
    [-2]: never;
    [-1]: never;
    [0]: 6;
    [1]: 5;
    [2]: 4;
    [3]: 3;
    [4]: 2;
    [5]: 1;
    [6]: undefined;
  };
}

/**
 * Returns the exponents that can be subtracted from the given one without
 * overflowing.
 *
 * For example:
 * ```
 *   type foo = Subtractable<3>;
 *   //   ^ -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6
 */
export type Subtractable<A extends Exponent> =
  // Note that this _could_ have been defined by:
  // ```
  // _Add[_Subtract[LookupExponent][A]][A]
  // ```
  // rather than by a table, but that causes TypeScript to start complaining
  // that our “type instantiation is excessively deep and possibly infinite”.
  _Subtractable[UndefinedToZero<A>];

interface _Subtractable extends UnaryTable {
  [-6]: -6 | -5 | -4 | -3 | -2 | -1 | undefined;
  [-5]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1;
  [-4]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2;
  [-3]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3;
  [-2]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4;
  [-1]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5;
  [0]: -6 | -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [1]: -5 | -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [2]: -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [3]: -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [4]: -2 | -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [5]: -1 | undefined | 1 | 2 | 3 | 4 | 5 | 6;
  [6]: undefined | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Returns the negative value of an exponent.
 *
 * For example:
 *
 * ```
 *   type foo = Negate<3>;
 *   //   ^ -3
 *   type bar = Negate<undefined>;
 *   //   ^ undefined
 * ```
 */
export type Negate<X extends Exponent> = _Negate[UndefinedToZero<X>];

interface _Negate extends UnaryTable {
  [-6]: 6;
  [-5]: 5;
  [-4]: 4;
  [-3]: 3;
  [-2]: 2;
  [-1]: 1;
  [0]: undefined;
  [1]: -1;
  [2]: -2;
  [3]: -3;
  [4]: -4;
  [5]: -5;
  [6]: -6;
}

/**
 * Returns the double value of an exponent.
 *
 * For example:
 *
 * ```
 *   type foo = Double<2>;
 *   //   ^ 4
 *   type bar = Double<-1>;
 *   //   ^ -2
 * ```
 */
export type Double<X extends Exponent> = _Double[UndefinedToZero<X>];

interface _Double extends UnaryTable {
  [-6]: never;
  [-5]: never;
  [-4]: never;
  [-3]: -6;
  [-2]: -4;
  [-1]: -2;
  [0]: undefined;
  [1]: 2;
  [2]: 4;
  [3]: 6;
  [4]: never;
  [5]: never;
  [6]: never;
}

/**
 * Returns the triple value of an exponent.
 *
 * For example:
 *
 * ```
 *   type foo = Triple<1>;
 *   //   ^ 3
 *   type bar = Triple<-1>;
 *   //   ^ -3
 * ```
 */
export type Triple<X extends Exponent> = _Triple[UndefinedToZero<X>];

interface _Triple extends UnaryTable {
  [-6]: never;
  [-5]: never;
  [-4]: never;
  [-3]: never;
  [-2]: -6;
  [-1]: -3;
  [0]: undefined;
  [1]: 3;
  [2]: 6;
  [3]: never;
  [4]: never;
  [5]: never;
  [6]: never;
}

/**
 * Exponents as used in the arithmetic lookup tables in this file. This is the
 * same as `Exponent` but with `undefined` replaced by `0` since the first can
 * not be used as a property name of a JavaScript object.
 */
type LookupExponent = Exclude<Exponent, undefined> | 0;

/**
 * A unary arithmetic lookup tables maps a single (arithmetic) exponents to a
 * new exponent.
 */
type UnaryTable = {
  [A in LookupExponent]: Exponent;
};

/**
 * A binary arithmetic lookup tables map two (arithmetic) exponents to a new
 * exponent.
 */
type BinaryTable = {
  [A in LookupExponent]: UnaryTable;
};

/** Convert an Exponent into a `LookupExponent`. */
type UndefinedToZero<X extends Exponent> = X extends undefined ? 0 : X;
