import {Quantity, Unit, makeUnit, makeSiPrefixes} from './unit';
import {Length as LengthDimension} from './dimension';

export type Length = Quantity<LengthDimension>;
export const meters: Unit<LengthDimension> = makeUnit('m', LengthDimension);

export const [
  kilometers,
  centimeters,
  millimeters,
  micrometers,
  nanometers,
  picometers,
  femtometers
] = makeSiPrefixes(meters, ['k', 'c', 'm', 'μ', 'n', 'p', 'f']);

export const [km, m, cm, mm, nm] = [
  kilometers,
  meters,
  centimeters,
  millimeters,
  nanometers,
];

export const fermi = femtometers;
export const angstrom = meters.scaled('Å', 1e10);
export const micron = micrometers;

export const yards = meters.scaled('yd', 1 / 0.9144);
export const feet = yards.scaled('ft', 3);
export const inches = feet.scaled('in', 12);
export const chains = yards.scaled('ch', 1 / 22);
export const furlongs = chains.scaled('fur', 1 / 10)
export const miles = furlongs.scaled('mi', 1 / 8);
