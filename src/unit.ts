import {Dimensions, Divisor, Multiplicand, Over, Times} from './dimension';

/**
 * Default locale to use when generating symbols or when printing a quantity
 * with toString. We hardcode a locale to ensure consistency of these
 * convenience functions across plattforms. Users wishing a particular
 * locale-specific formatting are encouraged to implement their own formatter.
 */
const DEFAULT_LOCALE = 'en-us';

export interface Unit<D extends Dimensions> {
  readonly symbol: string;
  readonly dimension: D;

  readonly scale: number;
  readonly offset: number;

  /** Generate a new amount of this unit. */
  (amount: number): Quantity<D>;

  /**
   * Returns a copy of this unit using the given symbol.
   * @param symbol The symbol to use for the new unit.
   */
  withSymbol(symbol: string): Unit<D>;

  /**
   * Derive a scaled unit from this one.
   *
   * The new unit will have the same dimensionality and as the receiver.
   *
   * Examples:
   * ```
   * const feet = yards.scaled(3).withSymbol('ft');
   * const fahrenheit = kelvin.scaled(9/5, -459.67).withSymbol('ºF');
   * ```
   *
   * @param scale The number of new units in the current one.
   * @param offset An optional datum offset.
   */
  scaled(scale: number, offset?: number): Unit<D>;

  /**
   * Returns this unit scaled by the given SI prefix.
   *
   * Example:
   * ```
   * const mm = meters.withSiPrefix('c');
   * ```
   *
   * @param prefix An SI prefix
   */
  withSiPrefix(prefix: SiPrefix): Unit<D>;

  /**
   * Multiplies a given unit with this one.
   *
   * Examples:
   * ```
   * const newtons = metersPerSecond.times(kilograms);
   * const joules = newtons.times(meters);
   * ```
   *
   * @param unit The unit to multiply this one with.
   */
  times<D2 extends Multiplicand<D>>(unit: Unit<D2>): Unit<Times<D, D2>>;

  /**
   * Divides this one by another.
   *
   * Example:
   * ```
   * const speed = meters.per(seconds);
   * ```
   *
   * @param unit The unit to divide this one with.
   */
  per<D2 extends Divisor<D>>(unit: Unit<D2>): Unit<Over<D, D2>>;
}

export interface Quantity<D extends Dimensions> {
  readonly dimension: D;

  readonly amount: number;
  readonly unit: Unit<D>;

  in(unit: Unit<D>): Quantity<D>;

  /**
   * Multiplies this quantity with another.
   *
   * Examples:
   * ```
   * const newtons = metersPerSecond(9.8).times(kilograms(3));
   * const joules = newtons(13).times(meters(5));
   * ```
   *
   * @param quantity The quantity to multiply this one with.
   */
  times<D2 extends Multiplicand<D>>(
    quantity: Quantity<D2>
  ): Quantity<Times<D, D2>>;

  /**
   * Divides this quantity by another.
   *
   * Example:
   * ```
   * const speed = meters(5).per(seconds(3));
   * ```
   *
   * @param quantity The quantity to divide this one with.
   */
  per<D2 extends Divisor<D>>(quantity: Quantity<D2>): Quantity<Over<D, D2>>;

  /**
   * Returns a string representation of the quantity.
   *
   * Example:
   * ```
   * const length: Length = meters(5);
   * console.log(length.toString());  // 5m
   * ```
   */
  toString(): string;
}

export type SiPrefix = keyof typeof SI_PREFIX;
const SI_PREFIX = {
  Y: 1e24,
  Z: 1e21,
  E: 1e18,
  P: 1e15,
  T: 1e12,
  G: 1e9,
  M: 1e6,
  k: 1e3,
  h: 1e2,
  da: 1e1,
  d: 1e-1,
  c: 1e-2,
  m: 1e-3,
  μ: 1e-6,
  n: 1e-9,
  p: 1e-12,
  f: 1e-15,
  a: 1e-18,
  z: 1e-21,
  y: 1e-24
};

export function makeUnit<D extends Dimensions>(
  symbol: string,
  dimension: D,
  scale = 1,
  offset = 0
): Unit<D> {
  function unit(amount: number): Quantity<D> {
    return makeQuantity<D>(amount, unit);
  }

  unit.symbol = symbol;
  unit.dimension = dimension;

  unit.scale = scale;
  unit.offset = offset;

  unit.withSymbol = function (this: Unit<D>, symbol: string): Unit<D> {
    return makeUnit(symbol, this.dimension, this.scale, this.offset);
  };

  unit.scaled = function (this: Unit<D>, scale: number, offset?: number) {
    // Generate a symbol.
    let symbol = `${scale.toLocaleString(DEFAULT_LOCALE)} × ${this.symbol}`;
    if (offset && offset > 0) {
      symbol += ` + ${offset.toLocaleString(DEFAULT_LOCALE)}`;
    }
    if (offset && offset < 0) {
      symbol += ` - ${offset.toLocaleString(DEFAULT_LOCALE)}`;
    }

    return makeUnit(
      symbol,
      dimension,
      unit.scale * scale,
      unit.offset / scale + (offset || 0)
    );
  };

  unit.withSiPrefix = function (this: Unit<D>, prefix: SiPrefix): Unit<D> {
    return this.scaled(1 * SI_PREFIX[prefix]).withSymbol(
      `${prefix}${this.symbol}`
    );
  };

  unit.times = function <D2 extends Multiplicand<D>>(
    this: Unit<D>,
    other: Unit<D2>
  ) {
    if (this.offset || other.offset) {
      throw new Error(
        `Cannot multiply units with offsets (unit ${this.symbol} has offset ` +
          `${this.offset} and unit ${other.symbol} has offset ${other.offset}`
      );
    }

    return makeUnit(
      `${this.symbol}⋅${other.symbol}`,
      Times(unit.dimension, other.dimension),
      this.scale * other.scale
    );
  };

  unit.per = function <D2 extends Divisor<D>>(this: Unit<D>, other: Unit<D2>) {
    if (this.offset || other.offset) {
      throw new Error(
        `Cannot divide units with offsets (unit ${this.symbol} has offset ` +
          `${this.offset} and unit ${other.symbol} has offset ${other.offset}`
      );
    }

    return makeUnit(
      `${this.symbol}/${other.symbol}`,
      Over(unit.dimension, other.dimension),
      this.scale / other.scale
    );
  };

  return unit;
}

export function makeQuantity<D extends Dimensions>(
  amount: number,
  unit: Unit<D>
): Quantity<D> {
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
        ((amount - this.unit.offset) * this.unit.scale) / other.scale +
          other.offset,
        other
      );
    },

    times: function <D2 extends Multiplicand<D>>(
      other: Quantity<D2>
    ): Quantity<Times<D, D2>> {
      return makeQuantity(
        this.amount * other.amount,
        this.unit.times(other.unit)
      );
    },

    per: function <D2 extends Divisor<D>>(
      other: Quantity<D2>
    ): Quantity<Over<D, D2>> {
      return makeQuantity(
        this.amount / other.amount,
        this.unit.per(other.unit)
      );
    },

    toString: function () {
      return `${amount}${unit.symbol}`;
    }
  };
}
