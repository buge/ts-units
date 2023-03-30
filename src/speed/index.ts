import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {feet, kilometers, meters, miles, nauticalMiles} from '../length';
import {hours, seconds} from '../time';

/** A quantity of length. */
export type Speed<NumberType = number> = Quantity<NumberType, dimension.Speed>;

/** The meter per second, symbol `m/s`, is the SI unit for speed. */
export const metersPerSecond: Unit<number, dimension.Speed> = meters
  .per(seconds)
  .withSymbol('m/s');

export const kilometersPerHour: Unit<number, dimension.Speed> = kilometers
  .per(hours)
  .withSymbol('km/h');

export const milesPerHour: Unit<number, dimension.Speed> = miles
  .per(hours)
  .withSymbol('mph');

export const knots: Unit<number, dimension.Speed> = nauticalMiles
  .per(hours)
  .withSymbol('kn');

export const feetPerSecond: Unit<number, dimension.Speed> = feet
  .per(seconds)
  .withSymbol('fps');
