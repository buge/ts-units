import {Dimensions, Add as AddDimensions} from './dimension';

export interface Unit<D extends Dimensions> {
  readonly symbol: string;
  readonly dimension: D

  readonly baseUnit: Unit<D>
  readonly scale: number
  readonly offset: number

  /** Generate a new amount of this unit. */
  (amount: number): Quantity<D>

  isBaseUnit(): boolean

  /**
   * Derive a scaled unit from this one.
   * 
   * The new unit will have the same dimensionality and the same base unit as
   * the receiver.
   *
   * @param symbol The symbol for the new unit.
   * @param scale The number of new units in the current one (e.g.
   *   `yards.derive('ft', 3)`).
   * @param offset An optional datum offset (e.g.
   *   `kelvin.derive('ºC', 1, -273.15)`).
   */
  scaled(symbol: string, scale: number, offset?: number): Unit<D>

  times<D2 extends Dimensions>(symbol: string, unit: Unit<D2>): Unit<AddDimensions<D, D2>>
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
  baseUnit?: Unit<D>,
  scale: number = 1,
  offset: number = 0
): Unit<D> {
  function unit(amount: number): Quantity<D> {
    return makeQuantity<D>(amount, unit)
  };

  unit.symbol = symbol;
  unit.dimension = dimension;

  const actualBaseUnit: Unit<D> = baseUnit === undefined ? unit : baseUnit;
  unit.baseUnit = actualBaseUnit;

  unit.scale = scale;
  unit.offset = offset;

  unit.isBaseUnit = () => !baseUnit;

  unit.scaled = function(this: Unit<D>, symbol: string, scale: number, offset?: number) {
    return makeUnit(
      symbol,
      dimension,
      actualBaseUnit,
      unit.scale * scale,
      (unit.offset * scale) + (offset || 0))
  }

  unit.times = function<D2 extends Dimensions>(this: Unit<D>, symbol: string, other: Unit<D2>) {
    if (this.offset || other.offset) {
      throw new Error(
        `Cannot multiply units with offsets (unit ${this.symbol} has offset ` +
        `${this.offset} and unit ${other.symbol} has offset ${other.offset}`);
    }

    const dimensions = AddDimensions(unit.dimension, other.dimension);

    let scale = this.scale * other.scale;
    let baseUnit = undefined;
    if (!this.isBaseUnit() || !other.isBaseUnit()) {
      baseUnit = makeUnit(`${this.baseUnit.symbol}⋅${other.baseUnit.symbol}`, dimensions)
    }
    return makeUnit(symbol, dimensions, baseUnit, scale);
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

      // If we are not in the base unit, convert to that first.
      let amount = this.amount;
      if (this.unit !== this.unit.baseUnit) {
        amount = (amount - this.unit.offset) / this.unit.scale;
      }

      // Scale to the other unit.
      amount = amount * other.scale + other.offset;

      return makeQuantity(amount, other);
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
