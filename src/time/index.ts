import * as dimension from './dimension';
import {Quantity, SiPrefix, makeUnit} from '../unit';

/** A quantity of time. */
export type Time<NumberType = number> = Quantity<NumberType, dimension.Time>;

/**
 * The second, symbol `s`, is the SI base unit of time. All other units in
 * this module are defined as scaled values of the second.
 */
export const seconds = makeUnit('s', dimension.Time);

export const [milliseconds, microseconds, nanoseconds] = (
  ['m', 'μ', 'n'] as SiPrefix[]
).map(x => seconds.withSiPrefix(x));

export const [s, msec, usec] = [
  seconds,
  milliseconds,
  microseconds,
  nanoseconds
];

export const minutes = seconds.times(60).withSymbol('m');
export const hours = minutes.times(60).withSymbol('h');
