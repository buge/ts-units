import {Exponent, Add as AddExponent} from './exponent';

/**
 * The dimensions of a quantity.
 *
 * For example, the dimensions of a length (`[L]`) will be represented as
 * `{length: 1}` and those of an area (`[L]²`) as `{length: 2}`. The
 * dimensions of velocity (`[L][T]^-1`) as `{length: 1, time: -1}`.
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
 * The dimensions of the SI base quantity of time.
 *
 * Denoted by `[T]`.
 */
export type Time = {time: 1};
export const Time: Time = {time: 1};

/**
 * The dimensions of the SI base quantity of length.
 *
 * Denoted by `[L]`.
 */
export type Length = {length: 1};
export const Length: Length = {length: 1};

/**
 * The dimensions of the SI base quantity of mass.
 *
 * Denoted by `[M]`.
 */
export type Mass = {mass: 1};
export const Mass: Mass = {mass: 1};

/**
 * The dimensions of the SI base quantity of temperature.
 *
 * Denoted by `[Θ]`.
 */
export type Temperature = {temperature: 1};
export const Temperature: Temperature = {temperature: 1};

/**
 * Multiplies two dimensions, adding their exponents.
 *
 * `Times` is both a type:
 * ```
 *   type Length = {length: 1};
 *   type Frequency = {time: -1};
 *   type Velocity = Times<Length, Frequency>;
 *   //   ^ {length: 1, time: -1}
 * ```
 *
 * And also a function:
 * ```
 *   const length = {length: 1};
 *   const frequency = {time: -1};
 *   const velocity = Times(length, frequency);
 *   //   ^ {length: 1, time: -1}
 * ```
 */
export type Times<A extends Dimensions, B extends Dimensions> = {
  [K in keyof A | keyof B]: AddExponent<Get<A, K>, Get<B, K>>
}

export function Times<A extends Dimensions, B extends Dimensions>(a: A, b: B): Times<A, B> {
  const keys = new Set<string>();
  Object.keys(a).forEach(x => keys.add(x));
  Object.keys(b).forEach(x => keys.add(x));

  const ret: Record<string, Exponent> = {};
  for (const key of keys) {
    const val = (a[key] || 0) + (b[key] || 0);
    if (val) {
      ret[key] = val as Exponent;
    }
  }

  return ret as Times<A, B>;
}

/**
 * Retrieves the exponent of a given dimension in set of dimensions. Returns
 * `undefined` if the exponent is not defined.
 *
 * For example:
 * ```
 *   type Velocity = {length: 1, time: -1};
 *   type TimeExp = Get<Velocity, 'time'>;
 *   //   ^ -1
 *   type MassExp = Get<Velocity, 'mass'>;
 *   //   ^ undefined
 * ```
 */
type Get<D extends Dimensions, K> = K extends keyof D ? D[K] : undefined;
