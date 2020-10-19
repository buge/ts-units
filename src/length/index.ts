import * as dimension from './dimension';
import {Quantity, SiPrefix, makeUnit} from '../unit';

/** A quantity of length. */
export type Length = Quantity<dimension.Length>;

/**
 * The meter, symbol `m`, is the SI base unit of length. All other units in
 * this module are defined as scaled values of the meter.
 */
export const meters = makeUnit('m', dimension.Length);

export const [
  kilometers,
  centimeters,
  millimeters,
  micrometers,
  nanometers,
  picometers,
  femtometers
] = (['k', 'c', 'm', 'μ', 'n', 'p', 'f'] as SiPrefix[]).map(x =>
  meters.withSiPrefix(x)
);

export const fermi = femtometers;
export const angstrom = meters.scaled(1e-10).withSymbol('Å');
export const micron = micrometers;

// Imperial units
export const yards = meters.scaled(0.9144).withSymbol('yd');
export const feet = yards.scaled(1 / 3).withSymbol('ft');
export const inches = feet.scaled(1 / 12).withSymbol('in');
export const chains = yards.scaled(22).withSymbol('ch');
export const furlongs = chains.scaled(10).withSymbol('fur');
export const miles = furlongs.scaled(8).withSymbol('mi');

// Marine units
export const fathoms = yards.scaled(2).withSymbol('ftm');
export const nauticalMiles = meters.scaled(1852).withSymbol('M');

// Astronomical Units
export const astronomicalUnits = meters.scaled(149597870700).withSymbol('au');
