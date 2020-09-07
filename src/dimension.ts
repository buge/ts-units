import {Exponent} from './exponent';
import * as exp from './exponent';

/**
 * The dimensions of a quantity.
 *
 * For example, the dimensions of a length (`[L]`) will be represented as
 * `{length: 1}` and those of an area (`[L]²`) as `{length: 2}`. The
 * dimensions of speed (`[L][T]^-1`) as `{length: 1, time: -1}`.
 *
 * Note that the dimensions of a quantity can also be the empty set. We do not
 * represent exponents as 0 but as undefined so a ratio `[L]/[L] = [1]` or
 * simply `{}`. In these cases we say that a quantity is dimensionless or that
 * it is a quantity of dimension one.
 *
 * Dimension types is how this library ensures type safety. In particular, we
 * currently do not ensure type safety for different quantity kinds of the same
 * dimensions. For example, both planar angles (`[L]/[L]`) and solid angles
 * (`[L]^2/[L]^2`) collapse to `[1]` and therefore cannot be distinguished in
 * variable assignments.
 */
export type Dimensions = Readonly<Record<string, Exponent>>;

/**
 * The dimensions of a dimensionless quantity. Also known as the dimensions of
 * the “quantity of dimension one”.
 *
 * Denoted as `[1]`.
 */
export type One = {};
export const One: One = {};

/**
 * Multiplies two dimensions, adding their exponents.
 *
 * `Times` is both a type:
 * ```
 *   type Length = {length: 1};
 *   type Frequency = {time: -1};
 *   type Speed = Times<Length, Frequency>;
 *   //   ^ {length: 1, time: -1}
 * ```
 *
 * And also a function:
 * ```
 *   const length = {length: 1};
 *   const frequency = {time: -1};
 *   const speed = Times(length, frequency);
 *   //   ^ {length: 1, time: -1}
 * ```
 */
export type Times<A extends Dimensions, B extends Multiplicand<A>> = {
  [K in keyof A | keyof B]: exp.Add<Get<A, K>, Get<B, K>>
}

export function Times<
    A extends Dimensions,
    B extends Multiplicand<A>>(a: A, b: B): Times<A, B> {
  return combineExponents(a, b, (a, b) => a + b) as Times<A, B>;
}

/**
 * Returns the types that can be multiplied with the given dimensions without
 * overflowing exponents.
 *
 * For example:
 * ```
 *   type Volume = {length: 3};
 *   type multiplicands = Multiplicand<Volume>;
 *   //   ^ {length?: -4 | -3 | -2 | -1 | 1}
 * ```
 *
 * That is, if the multiplicand has a property `length` then it may only have
 * an exponent `[-4, 1]` as we will otherwise overflow the maximum permissible
 * exponent of 4.
 */
export type Multiplicand<A extends Dimensions> = Partial<{
  [K in keyof A]: exp.Addable<Get<A, K>>
}> & Dimensions;

/**
 * Divides two dimensions, subtracting the exponents.
 *
 * `Over` is both a type:
 * ```
 *   type Length = {length: 1};
 *   type Time = {time: 1};
 *   type Speed = Over<Length, Time>;
 *   //   ^ {length: 1, time: -1}
 * ```
 *
 * And also a function:
 * ```
 *   const length = {length: 1};
 *   const time = {time: 1};
 *   const speed = Over(length, frequency);
 *   //   ^ {length: 1, time: -1}
 * ```
 */
export type Over<A extends Dimensions, B extends Divisor<A>> = {
  [K in keyof A | keyof B]: exp.Subtract<Get<A, K>, Get<B, K>>
}

export function Over<
    A extends Dimensions,
    B extends Divisor<A>>(a: A, b: B): Over<A, B> {
  return combineExponents(a, b, (a, b) => a - b) as Over<A, B>;
}

/**
 * Returns the types that can act as divisors of the given dimensions without
 * overflowing exponents.
 *
 * For example:
 * ```
 *   type Length = {length: 1};
 *   type divisors = Divisors<Length>;
 *   //   ^ {length?: -3 | -2 | -1 | 1 | 2 | 3 | 4}
 * ```
 *
 * That is, if the divisor has a property `length` then it may only have an
 * exponent `[-3, 4]` as `-4` would overflow the maximum permissible exponent
 * of `4`.
 */
export type Divisor<A extends Dimensions> = Partial<{
  [K in keyof A]: exp.Subtractable<Get<A, K>>
}> & Dimensions;

/**
 * Retrieves the exponent of a given dimension in set of dimensions. Returns
 * `undefined` if the exponent is not defined.
 *
 * For example:
 * ```
 *   type Speed = {length: 1, time: -1};
 *   type TimeExp = Get<Speed, 'time'>;
 *   //   ^ -1
 *   type MassExp = Get<Speed, 'mass'>;
 *   //   ^ undefined
 * ```
 */
type Get<D extends Dimensions, K> = K extends keyof D ? D[K] : undefined;

function combineExponents(
    d1: Dimensions,
    d2: Dimensions,
    f: (e1: number, e2: number) => number): Dimensions {
  const keys = new Set<string>();
  Object.keys(d1).forEach(x => keys.add(x));
  Object.keys(d2).forEach(x => keys.add(x));

  const ret: Record<string, Exponent> = {};
  for (const key of keys) {
    const val = f(d1[key] || 0, d2[key] || 0);
    if (!exp.isExponent(val)) {
      throw new Error(
        `Overflow in ${key} when combining ${d1[key]} and ${d2[key]}`);
    }

    if (val) {
      ret[key] = val;
    }
  }

  return ret;
}
