import {Quantity, makeUnit, makeSiPrefixes} from './unit';
import {Time as TimeDimension} from './dimension';

export type Mass = Quantity<TimeDimension>;
export const seconds = makeUnit('s', TimeDimension);

export const [
  milliseconds,
  microseconds,
  nanoseconds,
] = makeSiPrefixes(seconds, ['m', 'μ', 'n']);

export const [s, msec, usec] = [
  seconds,
  milliseconds,
  microseconds,
  nanoseconds,
];

export const minutes = seconds.scaled('m', 1/60);
export const hours = minutes.scaled('h', 1/60);
