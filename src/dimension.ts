import {Exponent, Add as AddExponent} from './exponent';

//export type Dimensions = {readonly [key in BaseQuantity]?: number};
export type Dimensions = Readonly<Record<string, Exponent>>;

/**
 * Adds the two dimensional vectors.
 * 
 * This is used, for example, when multiplying two units or quantities with one
 * another.
 * 
 * `Add` is both a type:
 * ```
 *   type Length = {length: 1};
 *   type Frequency = {time: -1};
 *   type Velocity = Add<Length, Frequency>;
 *   //   ^ {length: 1, time: -1}
 * ```
 * 
 * And also a function:
 * ```
 *   const length = {length: 1};
 *   const frequency = {time: -1};
 *   const velocity = Add(length, frequency);
 *   //   ^ {length: 1, time: -1}
 * ```
 */
export type Add<A extends Dimensions, B extends Dimensions> = {
  [K in keyof A | keyof B]: AddExponent<Get<A, K>, Get<B, K>>
}

export function Add<A extends Dimensions, B extends Dimensions>(a: A, b: B): Add<A, B> {
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

  return ret as Add<A, B>;
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


// Probably delete everything below this line.

export type BaseQuantity =
  'time' |
  'length' |
  'mass' |
  'current' |
  'temperature' |
  'amount' |
  'luminosity';

export type One = {};
export const One: One = {};

export type Time = {time: 1};
export const Time: Time = {time: 1};

export type Length = {length: 1};
export const Length: Length = {length: 1};

export type Area = {length: 2};
export const Area: Area = {length: 2};

export type Volume = {length: 3};
export const Volume: Volume = {length: 3};

export type Mass = {mass: 1};
export const Mass: Mass = {mass: 1};

export type Temperature = {temperature: 1};
export const Temperature: Temperature = {temperature: 1};


/*
export function times(d1: Dimensions, d2: Dimensions): Dimensions {
  function maybeAdd(f1?: number, f2?: number): number|undefined {
    const f3 = (f1 || 0) + (f2 || 0);
    return f3 === 0 ? undefined : f3;
  }

  return {
    time: maybeAdd(d1.time, d2.time),
    length:  maybeAdd(d1.length, d2.length),
    mass:  maybeAdd(d1.mass, d2.mass),
    current:  maybeAdd(d1.current, d2.current),
    temperature:  maybeAdd(d1.temperature, d2.temperature),
    amount:  maybeAdd(d1.amount, d2.amount),
    luminosity:  maybeAdd(d1.luminosity, d2.luminosity),
  }
}
*/

/**
 * Divide two dimensions.
 * 
 * Some examples:
 * 
 *    `[L] / [T] = [L T^-1]`
 *    `[1] / [T] = [T^-1]`
 * 
 * @param d1 numerator
 * @param d2 denominator
 */
/*export function divide(d1: Dimensions, d2: Dimensions): Dimensions {
  function maybeSubtract(f1?: number, f2?: number): number|undefined {
    const f3 = (f1 || 0) - (f2 || 0);
    return f3 === 0 ? undefined : f3;
  }

  return {
    time: maybeSubtract(d1.time, d2.time),
    length:  maybeSubtract(d1.length, d2.length),
    mass:  maybeSubtract(d1.mass, d2.mass),
    current:  maybeSubtract(d1.current, d2.current),
    temperature:  maybeSubtract(d1.temperature, d2.temperature),
    amount:  maybeSubtract(d1.amount, d2.amount),
    luminosity:  maybeSubtract(d1.luminosity, d2.luminosity),
  }
}
*/

export const SYMBOLS: {readonly [key in BaseQuantity]: string} = {
  time: 'T',
  length: 'L',
  mass: 'M',
  current: 'I',
  temperature: 'Θ',
  amount: 'N',
  luminosity: 'J',
}

export function toString(d: Dimensions, formatter: Formatter = stringFormatter): string {
  let s = [];
  for (const key of Object.keys(SYMBOLS)) {
    const baseQuantity: BaseQuantity = key as BaseQuantity;
    if (d[baseQuantity]) {
      s.push(formatter.formatBaseQuantity(baseQuantity, d[baseQuantity]!));
    }
  }

  return formatter.formatDimension(s);
}

export interface Formatter {
  formatBaseQuantity(baseQuantity: BaseQuantity, exponent: number): string
  formatDimension(formattedQuantities: string[]): string;
}

export const stringFormatter: Formatter = {
  formatBaseQuantity: (baseQuantity: BaseQuantity, exponent: number): string => {
    if (exponent === 1) {
      return SYMBOLS[baseQuantity];
    }
    return `[${SYMBOLS[baseQuantity]}]^${exponent}`
  },

  formatDimension: (formattedQuantities: string[]): string => {
    if (formattedQuantities.length < 1) {
      return '[1]';
    }

    return formattedQuantities.join('');
  },
}
