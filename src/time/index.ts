import * as dimension from './dimension';
import {Quantity, SiPrefix, makeUnit} from '../unit';

/** A quantity of mass. */
export type Mass = Quantity<dimension.Time>;

/**
 * The second, symbol `s`, is the SI base unit of time. All other units in
 * this module are defined as scaled values of the second.
 */
export const seconds = makeUnit('s', dimension.Time);

export const [milliseconds, microseconds, nanoseconds] = ([
  'm',
  'μ',
  'n'
] as SiPrefix[]).map(x => seconds.withSiPrefix(x));

export const [s, msec, usec] = [
  seconds,
  milliseconds,
  microseconds,
  nanoseconds
];

export const minutes = seconds.scaled(60).withSymbol('m');
export const hours = minutes.scaled(60).withSymbol('h');
