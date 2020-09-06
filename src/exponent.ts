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
export type Exponent = -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4;

/**
 * Type guard returning whether x is a valid Exponent.
 * @param x Any value.
 */
export function isExponent(x: any): x is Exponent {
  return typeof x === 'undefined'
      || typeof x === 'number'
      && x >= -4
      && x <= 4;
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
 *   type foo = Add<3, 4>;
 *   //   ^ 'never'
 * ```
 */
export type Add<A extends Exponent, B extends Exponent> =
  _Add[UndefinedToZero<A>][UndefinedToZero<B>];

interface _Add extends BinaryTable {
  [-4]: {
    [-4]: never, [-3]: never, [-2]: never, [-1]: never,
    [0]: -4, [1]: -3, [2]: -2, [3]: -1, [4]: undefined,
  },
  [-3]: {
    [-4]: never, [-3]: never, [-2]: never, [-1]: -4,
    [0]: -3, [1]: -2, [2]: -1, [3]: undefined, [4]: 1,
  },
  [-2]: {
    [-4]: never, [-3]: never, [-2]: -4, [-1]: -3,
    [0]: -2, [1]: -1, [2]: undefined, [3]: 1, [4]: 2,
  },
  [-1]: {
    [-4]: never, [-3]: -4, [-2]: -3, [-1]: -2,
    [0]: -1, [1]: undefined, [2]: 1, [3]: 2, [4]: 3,
  },
  [0]: {
    [-4]: -4, [-3]: -3, [-2]: -2, [-1]: -1,
    [0]: undefined,  [1]: 1, [2]: 2, [3]: 3, [4]: 4,
  },
  [1]: {
    [-4]: -3, [-3]: -2, [-2]: -1, [-1]: undefined,
    [0]: 1, [1]: 2, [2]: 3, [3]: 4, [4]: never,
  },
  [2]: {
    [-4]: -2, [-3]: -1, [-2]: undefined, [-1]: 1,
    [0]: -2, [1]: 3, [2]: 4, [3]: never, [4]: never,
  },
  [3]: {
    [-4]: -1, [-3]: undefined, [-2]: 1, [-1]: 2,
    [0]: 3, [1]: 4, [2]: never, [3]: never, [4]: never,
  },
  [4]: {
    [-4]: undefined, [-3]: 1, [-2]: 2, [-1]: 3,
    [0]: 4, [1]: never, [2]: never, [3]: never, [4]: never,
  },
}

/**
 * Returns the exponents that can be added to the given one without
 * overflowing.
 *
 * For example:
 * ```
 *   type foo = Addable<3>;
 *   //   ^ -4 | -3 | -2 | -1 | undefined | 1
 */
export type Addable<A extends Exponent> =
  // Note that this _could_ have been defined by:
  // ```
  // _Subtract<_Add[LookupExponent][A]>
  // ```
  // rather than by a table, but that causes TypeScript to start complaining
  // that our “type instantiation is excessively deep and possibly infinite”.
  _Addable[UndefinedToZero<A>];

interface _Addable extends UnaryTable {
  [-4]: undefined | 1 | 2 | 3 | 4,
  [-3]: -1 | undefined | 1 | 2 | 3 | 4,
  [-2]: -2 | -1 | undefined | 1 | 2 | 3 | 4,
  [-1]: -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4,
  [0]: -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3 | 4,
  [1]: -4 | -3 | -2 | -1 | undefined | 1 | 2 | 3,
  [2]: -4 | -3 | -2 | -1 | undefined | 1 | 2,
  [3]: -4 | -3 | -2 | -1 | undefined | 1,
  [4]: -4 | -3 | -2 | -1 | undefined,
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
  [A in LookupExponent]: Exponent
};

/**
 * A binary arithmetic lookup tables map two (arithmetic) exponents to a new
 * exponent.
 */
type BinaryTable = {
  [A in LookupExponent]: UnaryTable
};

/** Convert an Exponent into a `LookupExponent`. */
type UndefinedToZero<X extends Exponent> = X extends undefined ? 0 : X;
