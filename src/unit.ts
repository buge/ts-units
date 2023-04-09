import {Arithmetic, NativeArithmetic} from './arithmetic';
import {
  Cubed,
  Dimensions,
  Divisor,
  Multiplicand,
  Over,
  Reciprocal,
  Squared,
  Times
} from './dimension';

/**
 * A measurement unit of a particular dimension. For example, the meter, the
 * foot and many other units are measurements of the dimension of length. Units
 * with the same dimensions can be compared to and converted to one another.
 * All units of the same dimension are defined as a ratio (`scale`) of some
 * base unit. We generally use the SI base units (`scale = 1`) as the base of
 * all our unit definitions.
 *
 * Quantities of a particular unit can be defined by simply calling the unit.
 * For example:
 * ```
 * const cupboardHeight = centimeters(95);
 * ```
 * Returns a quantity of 95cm in length.
 *
 * Units store a preferred (text) symbol that they can use, for example, when
 * printed a quantity using `toString()`:
 * ```
 * // Prints "95cm", using the symbol from the centimeters unit that it was
 * // defined with.
 * console.log(cupboardHeight.toString());
 * ```
 *
 * New units can be defined as derived units from existing ones using the
 * `times` and `per` operators. For example, this is how the `meterPerSecond`
 * is defined:
 * ```
 * const metersPerSecond = meters.per(seconds).withSymbol('m/s');
 * ```
 *
 * Note that you will usually also want to explicitly define the type for such
 * derived dimensions to help IDEs display legible types. In the example above,
 * the type of speed is `Unit<Over<Length, Time>>`. By explicitly creating a
 * dimension type and using it in the Unit we can get a more legible
 * `Unit<Speed>`:
 * ```
 * type Speed = {length: 1, time: -1};  // [L]/[T]
 * const metersPerSecond: Unit<Speed> =
 *   meters.per(seconds).withSymbol('m/s');
 * ```
 */
export interface Unit<NumberType, D extends Dimensions> {
  /**
   * The dimensions of this unit.
   *
   * For example:
   * ```
   * const length = {length: 1};  // [L]
   * const speed = {length: 1, time: -1};  // [L][T]^-1
   * const acceleration = {length: 1, time: -2};  // [L][T]^-2
   * ```
   */
  readonly dimension: D;

  /**
   * A symbol for the unit such as `m` for meters or `ºC` for degrees celsius.
   * Used primarily when printing quantities with `toString()`.
   */
  readonly symbol: string;

  /**
   * The ratio of this unit over the base unit.
   *
   * For example, the kilometer as scale 1000 and the foot has a scale of
   * 0.3048 since the base unit for length is the meter.
   */
  readonly scale: NumberType;

  /**
   * An optional datum offset for the unit.
   *
   * This is used for things like temperatures where degrees celsius has the
   * same scale as the base unit Kelvin but is offset by -273.15.
   */
  readonly offset: NumberType;

  /** Generate a new amount of this unit. */
  (amount: number): Quantity<NumberType, D>;

  /**
   * Returns the reciprocal unit to this one.
   *
   * Example:
   * ```
   * const hertz = seconds.reciprocal()
   * ```
   */
  reciprocal(): Unit<NumberType, Reciprocal<D>>;

  /**
   * Returns the squared unit of this one.
   *
   * Example:
   * ```
   * const squareMeter = meters.squared()
   * ```
   */
  squared(): Unit<NumberType, Squared<D>>;

  /**
   * Returns the cubed unit of this one.
   *
   * Example:
   * ```
   * const cubicMeter = meters.cubed()
   * ```
   */
  cubed(): Unit<NumberType, Cubed<D>>;

  /**
   * Returns a copy of this unit using the given symbol.
   * @param symbol The symbol to use for the new unit.
   */
  withSymbol(symbol: string): Unit<NumberType, D>;

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
  withSiPrefix(prefix: SiPrefix): Unit<NumberType, D>;

  /**
   * Multiplies a given unit with this one.
   *
   * This can be used to create scaled units:
   * ```
   * const feet = yards.times(3).withSymbol('ft');
   * ```
   *
   * As well as units with combined dimensions:
   * ```
   * const newtons = metersPerSecond.times(kilograms);
   * const joules = newtons.times(meters);
   * ```
   *
   * @param unit The unit to multiply this one with.
   */
  times(amount: number): Unit<NumberType, D>;
  times<D2 extends Multiplicand<D>>(
    unit: Unit<NumberType, D2>
  ): Unit<NumberType, Times<D, D2>>;

  /**
   * Derive a unit as a datum offset of this one.
   *
   * Example:
   * ```
   * const celsius = kelvin.withOffset(-273.15).withSymbol('ºC');
   * ```
   */
  withOffset(offset: number): Unit<NumberType, D>;

  /**
   * Divides this one by another.
   *
   * This can be used to create scaled units:
   *  ```
   * const feet = yards.times(1 / 3).withSymbol('ft');
   * ```
   *
   * As well as units with combined dimensions:
   * ```
   * const speed = meters.per(seconds);
   * ```
   *
   * @param unit The unit to divide this one with.
   */
  per(amount: number): Unit<NumberType, D>;
  per<D2 extends Divisor<D>>(
    unit: Unit<NumberType, D2>
  ): Unit<NumberType, Over<D, D2>>;
}

/**
 * An amount of something as defined by a number (`amount`) and a referencing
 * `unit`. Examples of amounts are 43m, 32ºC or 3.5m/s.
 *
 * New quantities can be created by calling a unit such as:
 * ```
 * const cupboardHeight = centimeters(95);
 * ```
 *
 * Quantities can be converted to other units of the same dimension using the `in` function:
 * ```
 * const cupboardHeightInFeet = cupboardHeight.in(feet);
 * ```
 *
 * You can also compute new quantities by using the `times` and `per`
 * arithmetic operators:
 * ```
 * const area: Area = centimeters(1.5).times(meters(2));
 * ```
 */
export interface Quantity<NumberType, D extends Dimensions> {
  /**
   * The dimensions of this quantity.
   *
   * For example:
   * ```
   * const length = {length: 1};  // [L]
   * const speed = {length: 1, time: -1};  // [L][T]^-1
   * const acceleration = {length: 1, time: -2};  // [L][T]^-2
   * ```
   */
  readonly dimension: D;

  /** The amount of “stuff” of the unit below. */
  readonly amount: NumberType;

  /** The unit that this quantity is being measured in. */
  readonly unit: Unit<NumberType, D>;

  /**
   * Returns whether this quantity is close to another.
   *
   * For example:
   * ```
   * someLength.isCloseTo(meters(5), 0.01);
   * ```
   * Checks whether `someLength` is within 1cm of 5m.
   *
   * @param other The quantity to compare this one to.
   * @param epsilon The tolerance (in the units of the comparing value) to
   *   which this value is considered to be close to the comparing value
   *   (`|this - other| < epsilon` in the units of other).
   */
  isCloseTo(other: Quantity<NumberType, D>, epsilon: number): boolean;

  /**
   * Adds a quantity to this one, returning a new quantity in the units of the
   * given one.
   *
   * Example:
   * ```
   * console.log(meters(3).plus(2cm).toString()); // 302cm
   * ```
   *
   * @param quantity The quantity to add to this one.
   */
  plus(quantity: number): Quantity<NumberType, D>;
  plus(quantity: Quantity<NumberType, D>): Quantity<NumberType, D>;

  /**
   * Subtracts a quantity from this one, returning a new quantity in the units
   * of the given one.
   *
   * Example:
   * ```
   * console.log(meters(3).minus(2cm).toString()); // 298cm
   * ```
   *
   * @param quantity The quantity to subtract from this one.
   */
  minus(quantity: number): Quantity<NumberType, D>;
  minus(quantity: Quantity<NumberType, D>): Quantity<NumberType, D>;

  /**
   * Convert this quantity to another unit of the same dimensions.
   *
   * For example:
   * ```
   * meters(3).in(feet);
   * ```
   *
   * @param unit The unit to convert this quantity to.
   */
  in(unit: Unit<NumberType, D>): Quantity<NumberType, D>;

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
  times(quantity: number): Quantity<NumberType, D>;
  times<D2 extends Multiplicand<D>>(
    quantity: Quantity<NumberType, D2>
  ): Quantity<NumberType, Times<D, D2>>;

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
  per(quantity: number): Quantity<NumberType, D>;
  per<D2 extends Divisor<D>>(
    quantity: Quantity<NumberType, D2>
  ): Quantity<NumberType, Over<D, D2>>;

  /**
   * Returns the reciprocal to this quantity.
   *
   * Example:
   * ```
   * const frequency = seconds(5).reciprocal()
   * ```
   */
  reciprocal(): Quantity<NumberType, Reciprocal<D>>;

  /**
   * Returns the squared quantity of this one.
   *
   * Example:
   * ```
   * const area = meters(3).squared();
   * ```
   */
  squared(): Quantity<NumberType, Squared<D>>;

  /**
   * Returns the cubed quantity of this one.
   *
   * Example:
   * ```
   * const volume = meters(3).cubed();
   * ```
   */
  cubed(): Quantity<NumberType, Cubed<D>>;

  /**
   * Returns whether this is a dimensionless quantity. Or, more accurately, a
   * quantity of dimension `[1]`.
   */
  isDimensionless(): boolean;

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

  /**
   * Returns the amount of this quantity in the base unit as a NumberType
   * value.
   *
   * This allows for comparison of the quantity using custom arithmetic operators.
   */
  value(): NumberType;

  /**
   * Returns the amount of this quantity in the base unit as a primitive
   * Javascript value.
   *
   * This allows for correct comparison of the quantity using operators such
   * as `<` or `>=`.
   */
  valueOf(): number;
}

/**
 * An SI prefix such as 'k' for kilo or 'μ' for micro. Used, for example,
 * for creating derived units using `Unit.withSiPrefix`.
 */
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

/**
 * Default locale to use when generating symbols or when printing a quantity
 * with toString. We hardcode a locale to ensure consistency of these
 * convenience functions across plattforms. Users wishing a particular
 * locale-specific formatting are encouraged to implement their own formatter.
 */
const DEFAULT_LOCALE = 'en-us';

export const makeUnitFactory = <NumberType>(
  arithmetic: Arithmetic<NumberType>
) => {
  const {fromNative, toNative, add, sub, mul, div, pow, abs, compare} =
    arithmetic;

  /**
   * Creates a new unit.
   *
   * @param symbol The symbol to use for the unit (e.g. "m" or "m/s")
   * @param dimension The dimensions that this unit are defined over. For
   *   example, `{length: 1}` if unit of length
   * @param scale The ratio to the base unit. For example, the kilometer has a
   *   scale of 1000, the foot has a scale of 0.3048 given that the base unit of
   *   length is the meter.
   * @param offset An optional datum offset. For example, degrees celsius have a
   *   datum offset over the Kelvin of -273.15.
   */
  function makeUnit<D extends Dimensions>(
    symbol: string,
    dimension: D,
    scale: NumberType = fromNative(1),
    offset: NumberType = fromNative(0)
  ): Unit<NumberType, D> {
    // Return a callable object that constructs a quantity of the given unit.
    // See class comment for more details.
    function makeQuantity(amount: number): Quantity<NumberType, D> {
      return new QuantityImpl<D>(
        fromNative(amount),
        makeQuantity as Unit<NumberType, D>
      );
    }

    makeQuantity.symbol = symbol;
    makeQuantity.dimension = dimension;
    makeQuantity.scale = scale;
    makeQuantity.offset = offset;

    Object.setPrototypeOf(makeQuantity, UnitImpl.prototype);
    return makeQuantity as unknown as Unit<NumberType, D>;
  }

  /**
   * Prototype for `Unit`s so that methods (e.g. `withSymbol`, `withOffset`, etc.)
   * are only implemented once and passed to concrete units via prototype
   * inheritance.
   *
   * Because units are callable for concise syntax (e.g. `meters(5)`) we need to
   * employ a bit of a hack where this implementation extends `Function` and we
   * set the prototype in `makeQuantity`. We _could_ have also returned a
   * function with the prototype set from the constructor, but this makes it a
   * bit clearer that this class is used only for its prototype.
   */
  class UnitImpl<D extends Dimensions>
    extends Function
    implements UnitProps<NumberType, D>
  {
    readonly symbol: string;
    readonly dimension: D;
    readonly scale: NumberType;
    readonly offset: NumberType;

    constructor() {
      super();
      throw new Error(
        'UnitImpl should never be instantiated but be used for its prototype ' +
          'definition only.'
      );
    }

    withSymbol(symbol: string): Unit<NumberType, D> {
      return makeUnit(symbol, this.dimension, this.scale, this.offset);
    }

    withOffset(offset: number): Unit<NumberType, D> {
      if (offset === 0) {
        return this as unknown as Unit<NumberType, D>;
      }

      const sign = offset > 0 ? '+' : '-';
      const symbol = `${this.symbol} ${sign} ${offset.toLocaleString(
        DEFAULT_LOCALE
      )}`;

      return makeUnit(
        symbol,
        this.dimension,
        this.scale,
        add(div(this.offset, this.scale), fromNative(offset))
      );
    }

    withSiPrefix(prefix: SiPrefix): Unit<NumberType, D> {
      return this.times(1 * SI_PREFIX[prefix]).withSymbol(
        `${prefix}${this.symbol}`
      );
    }

    times<D2 extends Multiplicand<D>>(
      other: Unit<NumberType, D2>
    ): Unit<NumberType, Times<D, D2>>;
    times(amount: number): Unit<NumberType, D>;
    times<D2 extends Multiplicand<D>>(
      amountOrUnit: number | Unit<NumberType, D2>
    ): Unit<NumberType, D> | Unit<NumberType, Times<D, D2>> {
      if (typeof amountOrUnit === 'number') {
        return makeUnit(
          this.symbol,
          this.dimension,
          mul(this.scale, fromNative(amountOrUnit)),
          this.offset
        );
      }

      const other = amountOrUnit;
      if (this.offset || other.offset) {
        throw new Error(
          `Cannot multiply units with offsets (unit ${this.symbol} has offset ` +
            `${this.offset} and unit ${other.symbol} has offset ${other.offset}`
        );
      }

      return makeUnit(
        `${this.symbol}⋅${other.symbol}`,
        Times(this.dimension, other.dimension),
        mul(this.scale, other.scale)
      );
    }

    per<D2 extends Divisor<D>>(
      other: Unit<NumberType, D2>
    ): Unit<NumberType, Over<D, D2>>;
    per(amount: number): Unit<NumberType, D>;
    per<D2 extends Divisor<D>>(
      amountOrUnit: number | Unit<NumberType, D2>
    ): Unit<NumberType, D> | Unit<NumberType, Over<D, D2>> {
      if (typeof amountOrUnit === 'number') {
        return makeUnit(
          this.symbol,
          this.dimension,
          div(this.scale, fromNative(amountOrUnit)),
          this.offset
        );
      }

      const other = amountOrUnit;
      if (this.offset || other.offset) {
        throw new Error(
          `Cannot divide units with offsets (unit ${this.symbol} has offset ` +
            `${this.offset} and unit ${other.symbol} has offset ${other.offset}`
        );
      }

      return makeUnit(
        `${this.symbol}/${other.symbol}`,
        Over(this.dimension, other.dimension),
        div(this.scale, other.scale)
      );
    }

    reciprocal() {
      if (this.offset) {
        throw new Error(
          'Cannot take the reciprocal of a unit with offset (unit ' +
            `${this.symbol} has offset ${this.offset})`
        );
      }

      return makeUnit(
        `1/${this.symbol}`,
        Reciprocal(this.dimension),
        div(fromNative(1), this.scale)
      );
    }

    squared(this: Unit<NumberType, D>) {
      if (this.offset) {
        throw new Error(
          `Cannot square a unit with an offset (unit ${this.symbol} has ` +
            `offset ${this.offset})`
        );
      }

      return makeUnit(
        `${this.symbol}²`,
        Squared(this.dimension),
        pow(this.scale, fromNative(2))
      );
    }

    cubed() {
      if (this.offset) {
        throw new Error(
          `Cannot cube a unit with an offset (unit ${this.symbol} has ` +
            `offset ${this.offset})`
        );
      }

      return makeUnit(
        `${this.symbol}³`,
        Cubed(this.dimension),
        pow(this.scale, fromNative(3))
      );
    }
  }

  /**
   * Utility type that lists all properties of Unit<D> minus the callable one to
   * ensure (at compile time) that `UnitImpl` implements all members that we want
   * in the prototype.
   *
   * This works because `keyof Unit<D>` does not list the callable.
   */
  type UnitProps<NumberType, D extends Dimensions> = {
    [P in keyof Unit<NumberType, D>]: Unit<NumberType, D>[P];
  };

  /**
   * Creates a new quantity.
   * @param amount The amount of quantity in the given unit.
   * @param unit The unit of the quantity measurement.
   */
  function makeQuantity<D extends Dimensions>(
    amount: NumberType,
    unit: Unit<NumberType, D>
  ): Quantity<NumberType, D> {
    return new QuantityImpl(amount, unit);
  }

  class QuantityImpl<D extends Dimensions> implements Quantity<NumberType, D> {
    readonly dimension: D;

    constructor(
      readonly amount: NumberType,
      readonly unit: Unit<NumberType, D>
    ) {
      this.dimension = unit.dimension;
    }

    isCloseTo(other: Quantity<NumberType, D>, epsilon: number) {
      return (
        compare(
          fromNative(epsilon),
          abs(sub(this.in(other.unit).amount, other.amount))
        ) >= 0
      );
    }

    in(other: Unit<NumberType, D>): Quantity<NumberType, D> {
      // If the unit requested is our unit, don't do any work.
      if (this.unit === other) {
        return this;
      }

      return new QuantityImpl(
        add(div(this.value(), other.scale), other.offset),
        other
      );
    }

    plus(quantity: number): Quantity<NumberType, D>;
    plus(quantity: Quantity<NumberType, D>): Quantity<NumberType, D>;
    plus(quantity: number | Quantity<NumberType, D>) {
      if (typeof quantity === 'number') {
        return new QuantityImpl(
          add(this.amount, fromNative(quantity)),
          this.unit
        );
      }

      return new QuantityImpl(
        add(this.in(quantity.unit).amount, quantity.amount),
        quantity.unit
      );
    }

    minus(quantity: number): Quantity<NumberType, D>;
    minus(quantity: Quantity<NumberType, D>): Quantity<NumberType, D>;
    minus(quantity: number | Quantity<NumberType, D>) {
      if (typeof quantity === 'number') {
        return new QuantityImpl(
          sub(this.amount, fromNative(quantity)),
          this.unit
        );
      }

      return new QuantityImpl(
        sub(this.in(quantity.unit).amount, quantity.amount),
        quantity.unit
      );
    }

    times(other: number): Quantity<NumberType, D>;
    times<D2 extends Multiplicand<D>>(
      other: Quantity<NumberType, D2>
    ): Quantity<NumberType, Times<D, D2>>;
    times<D2 extends Multiplicand<D>>(
      this: Quantity<NumberType, D>,
      other: number | Quantity<NumberType, D2>
    ): Quantity<NumberType, D> | Quantity<NumberType, Times<D, D2>> {
      if (typeof other === 'number') {
        return new QuantityImpl(mul(this.amount, fromNative(other)), this.unit);
      }

      if (this.isDimensionless()) {
        return new QuantityImpl(
          mul(mul(other.amount, this.amount), this.unit.scale),
          other.unit
        ) as unknown as Quantity<NumberType, Times<D, D2>>;
      }

      if (other.isDimensionless()) {
        return new QuantityImpl(
          mul(mul(this.amount, other.amount), other.unit.scale),
          this.unit
        ) as unknown as Quantity<NumberType, Times<D, D2>>;
      }

      return new QuantityImpl(
        mul(this.amount, other.amount),
        this.unit.times(other.unit)
      );
    }

    per(amount: number): Quantity<NumberType, D>;
    per<D2 extends Divisor<D>>(
      quantity: Quantity<NumberType, D2>
    ): Quantity<NumberType, Over<D, D2>>;
    per<D2 extends Divisor<D>>(
      other: number | Quantity<NumberType, D2>
    ): Quantity<NumberType, D> | Quantity<NumberType, Over<D, D2>> {
      if (typeof other === 'number') {
        return new QuantityImpl(div(this.amount, fromNative(other)), this.unit);
      }

      if (other.isDimensionless()) {
        return new QuantityImpl(
          div(div(this.amount, other.amount), other.unit.scale),
          this.unit
        ) as unknown as Quantity<NumberType, Over<D, D2>>;
      }

      return new QuantityImpl(
        div(this.amount, other.amount),
        this.unit.per(other.unit)
      );
    }

    reciprocal() {
      return new QuantityImpl(
        div(fromNative(1), this.amount),
        this.unit.reciprocal()
      );
    }

    squared() {
      return new QuantityImpl(
        pow(this.amount, fromNative(2)),
        this.unit.squared()
      );
    }

    cubed() {
      return new QuantityImpl(
        pow(this.amount, fromNative(3)),
        this.unit.cubed()
      );
    }

    isDimensionless() {
      return Object.keys(this.dimension).length === 0;
    }

    toString() {
      return `${toNative(this.amount).toLocaleString(DEFAULT_LOCALE)}${
        this.unit.symbol
      }`;
    }

    valueOf() {
      return toNative(this.value());
    }

    value() {
      return mul(sub(this.amount, this.unit.offset), this.unit.scale);
    }
  }

  function makeUnitFromNative<D extends Dimensions>(
    symbol: string,
    dimension: D,
    scale = 1,
    offset = 0
  ): Unit<NumberType, D> {
    return makeUnit(symbol, dimension, fromNative(scale), fromNative(offset));
  }

  function makeQuantityFromNative<D extends Dimensions>(
    amount: number,
    unit: Unit<NumberType, D>
  ): Quantity<NumberType, D> {
    return makeQuantity(fromNative(amount), unit);
  }

  return {
    makeUnit: makeUnitFromNative,
    makeQuantity: makeQuantityFromNative
  };
};

export const {makeUnit, makeQuantity} = makeUnitFactory(NativeArithmetic);
