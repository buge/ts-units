import * as dimension from './dimension';
import {Arithmetic, NativeArithmetic} from '../arithmetic';
import {Quantity, Unit} from '../unit';
import {withValueType as lengthWithValueType} from '../length';
import {withValueType as timeWithValueType} from '../time';

/** A quantity of length. */
export type Speed<NumberType = number> = Quantity<NumberType, dimension.Speed>;

export function withValueType<NumberType>(arithmetic: Arithmetic<NumberType>) {
  const {meters, kilometers, miles, nauticalMiles, feet} =
    lengthWithValueType(arithmetic);
  const {seconds, hours} = timeWithValueType(arithmetic);

  class WithValueType {
    private constructor() {}

    /** The meter per second, symbol `m/s`, is the SI unit for speed. */
    static metersPerSecond: Unit<NumberType, dimension.Speed> = meters
      .per(seconds)
      .withSymbol('m/s');

    static kilometersPerHour: Unit<NumberType, dimension.Speed> = kilometers
      .per(hours)
      .withSymbol('km/h');

    static milesPerHour: Unit<NumberType, dimension.Speed> = miles
      .per(hours)
      .withSymbol('mph');

    static knots: Unit<NumberType, dimension.Speed> = nauticalMiles
      .per(hours)
      .withSymbol('kn');

    static feetPerSecond: Unit<NumberType, dimension.Speed> = feet
      .per(seconds)
      .withSymbol('fps');
  }

  return WithValueType;
}

export const {
  metersPerSecond,
  kilometersPerHour,
  milesPerHour,
  knots,
  feetPerSecond
} = withValueType(NativeArithmetic);
