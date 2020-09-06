import {Dimensions, Times, Over, Multiplicand, Divisor} from './dimension';

export interface Unit<D extends Dimensions> {
  readonly symbol: string;
  readonly dimension: D

  readonly scale: number
  readonly offset: number

  /** Generate a new amount of this unit. */
  (amount: number): Quantity<D>

  /**
   * Derive a scaled unit from this one.
   *
   * The new unit will have the same dimensionality and as the receiver.
   * 
   * Examples:
   * ```
   *   const feet = yards.scaled('ft', 3);
   *   const fahrenheit = kelvin.scaled('ºF', 9/5, -459.67);
   * ```
   *
   * @param symbol The symbol for the new unit.
   * @param scale The number of new units in the current one (e.g.
   *   `yards.derive('ft', 3)`).
   * @param offset An optional datum offset (e.g.
   *   `kelvin.derive('ºC', 1, -273.15)`).
   */
  scaled(symbol: string, scale: number, offset?: number): Unit<D>

  /**
   * Multiplies a given unit with this one.
   *
   * Examples:
   * ```
   *   const newtons = metersPerSecond.times('N', kilograms);
   *   const joules = newtons.times('J', meters);
   * ```
   *
   * @param symbol The symbol for the new unit.
   * @param unit The unit to multiply this one with.
   */
  times<D2 extends Multiplicand<D>>(symbol: string, unit: Unit<D2>):
      Unit<Times<D, D2>>
  
  /**
   * Divides this one by another.
   *
   * Example:
   * ```
   *   const velocity = meters.per('m/s', seconds);
   * ```
   *
   * @param symbol The symbol for the new unit.
   * @param unit The unit to divide this one with.
   */
  per<D2 extends Divisor<D>>(symbol: string, unit: Unit<D2>):
      Unit<Over<D, D2>>
}

export interface Quantity<D extends Dimensions> {
  readonly dimension: D

  readonly amount: number
  readonly unit: Unit<D>

  in(unit: Unit<D>): Quantity<D>;
  toString(): string
}

export function makeUnit<D extends Dimensions>(
  symbol: string,
  dimension: D,
  scale: number = 1,
  offset: number = 0
): Unit<D> {
  function unit(amount: number): Quantity<D> {
    return makeQuantity<D>(amount, unit)
  };

  unit.symbol = symbol;
  unit.dimension = dimension;

  unit.scale = scale;
  unit.offset = offset;

  unit.scaled = function(this: Unit<D>, symbol: string, scale: number, offset?: number) {
    return makeUnit(
      symbol,
      dimension,
      unit.scale * scale,
      (unit.offset * scale) + (offset || 0))
  }

  unit.times = function<D2 extends Multiplicand<D>>(this: Unit<D>, symbol: string, other: Unit<D2>) {
    if (this.offset || other.offset) {
      throw new Error(
        `Cannot multiply units with offsets (unit ${this.symbol} has offset ` +
        `${this.offset} and unit ${other.symbol} has offset ${other.offset}`);
    }

    return makeUnit(
      symbol,
      Times(unit.dimension, other.dimension),
      this.scale * other.scale);
  }

  unit.per = function<D2 extends Divisor<D>>(this: Unit<D>, symbol: string, other: Unit<D2>) {
    if (this.offset || other.offset) {
      throw new Error(
        `Cannot divide units with offsets (unit ${this.symbol} has offset ` +
        `${this.offset} and unit ${other.symbol} has offset ${other.offset}`);
    }

    return makeUnit(
      symbol,
      Over(unit.dimension, other.dimension),
      this.scale / other.scale);
  }

  return unit;
}

export function makeQuantity<D extends Dimensions>(amount: number, unit: Unit<D>): Quantity<D> {
  return {
    amount,
    unit,

    dimension: unit.dimension,

    in: function (this: Quantity<D>, other: Unit<D>) {
      // If the unit requested is our unit, don't do any work.
      if (this.unit === other) {
        return this;
      }

      return makeQuantity(
        (amount - this.unit.offset) / this.unit.scale
          * other.scale + other.offset,
        other);
    },

    toString: function () {
      return `${amount}${unit.symbol}`;
    },
  };
}

export type SI_PREFIX = typeof SI_PREFIX;
export const SI_PREFIX = {
  'Y': 1e24,
  'Z': 1e21,
  'E': 1e18,
  'P': 1e15,
  'T': 1e12,
  'G': 1e9,
  'M': 1e6,
  'k': 1e3,
  'h': 1e2,
  'da': 1e1,
  'd': 1e-1,
  'c': 1e-2,
  'm': 1e-3,
  'μ': 1e-6,
  'n': 1e-9,
  'p': 1e-12,
  'f': 1e-15,
  'a': 1e-18,
  'z': 1e-21,
  'y': 1e-24,
};

export function makeSiPrefixes<D extends Dimensions>(unit: Unit<D>, prefixes: ReadonlyArray<keyof SI_PREFIX>): Unit<D>[] {
  return prefixes.map(prefix => unit.scaled(`${prefix}${unit.symbol}`, 1 / SI_PREFIX[prefix]));
}
