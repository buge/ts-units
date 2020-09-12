import {Quantity, Unit} from './unit';
import {meters, kilometers, miles, feet, nauticalMiles} from './length';
import {seconds, hours} from './time';

namespace dimension {
  /**
   * The dimensions of the SI derived quantity of speed.
   *
   * Denoted by `[L][T]^-1`.
   */
  export type Speed = {length: 1, time: -1};
  export const Speed: Speed = {length: 1, time: -1};
}

/** A quantity of length. */
export type Speed = Quantity<dimension.Speed>;

/** The meter per second, symbol `m/s`, is the SI unit for speed. */
export const metersPerSecond: Unit<dimension.Speed> =
  meters.per(seconds).withSymbol('m/s');

export const kilometersPerHour: Unit<dimension.Speed> =
  kilometers.per(hours).withSymbol('km/h');

export const milesPerHour: Unit<dimension.Speed> =
  miles.per(hours).withSymbol('mph');

export const knots: Unit<dimension.Speed> =
  nauticalMiles.per(hours).withSymbol('kn');

export const feetPerSecond: Unit<dimension.Speed> =
  feet.per(seconds).withSymbol('fps');
