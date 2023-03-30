import * as dimension from './dimension';
import {Quantity, SiPrefix, makeUnit} from '../unit';

/** A quantity of length. */
export type Length<NumberType = number> = Quantity<
  NumberType,
  dimension.Length
>;

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
export const angstroms = meters.times(1e-10).withSymbol('Å');
export const microns = micrometers;

// Imperial units
export const yards = meters.times(0.9144).withSymbol('yd');
export const feet = yards.per(3).withSymbol('ft');
export const inches = feet.per(12).withSymbol('in');
export const chains = yards.times(22).withSymbol('ch');
export const furlongs = chains.times(10).withSymbol('fur');
export const miles = furlongs.times(8).withSymbol('mi');

// Marine units
export const fathoms = yards.times(2).withSymbol('ftm');
export const nauticalMiles = meters.times(1852).withSymbol('M');

// Astronomical Units
export const astronomicalUnits = meters.times(149597870700).withSymbol('au');
