import {Quantity, makeUnit} from './unit';

namespace dimension {
  /**
   * The dimensions of the SI base quantity of time.
   *
   * Denoted by `[T]`.
   */
  export type Time = {time: 1};
  export const Time: Time = {time: 1};
}

/** A quantity of mass. */
export type Mass = Quantity<dimension.Time>;

/**
 * The second, symbol `s`, is the SI base unit of time. All other units in
 * this module are defined as scaled values of the second.
 */
export const seconds = makeUnit('s', dimension.Time);

export const [
  milliseconds,
  microseconds,
  nanoseconds,
] = seconds.withSiPrefix(['m', 'μ', 'n']);

export const [s, msec, usec] = [
  seconds,
  milliseconds,
  microseconds,
  nanoseconds,
];

export const minutes = seconds.scaled(60).withSymbol('m');
export const hours = minutes.scaled(60).withSymbol('h');
