import {Quantity, makeUnit} from './unit';

namespace dimension {
  /**
   * The dimensions of the SI base quantity of length.
   *
   * Denoted by `[L]`.
   */
  export type Length = {length: 1};
  export const Length: Length = {length: 1};
}

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
] = meters.withSiPrefix(['k', 'c', 'm', 'μ', 'n', 'p', 'f']);

export const [km, m, cm, mm, nm] = [
  kilometers,
  meters,
  centimeters,
  millimeters,
  nanometers,
];

export const fermi = femtometers;
export const angstrom = meters.scaled(1e10).withSymbol('Å');
export const micron = micrometers;

export const yards = meters.scaled(1 / 0.9144).withSymbol('yd');
export const feet = yards.scaled(3).withSymbol('ft');
export const inches = feet.scaled(12).withSymbol('in');
export const chains = yards.scaled(1 / 22).withSymbol('ch');
export const furlongs = chains.scaled(1 / 10).withSymbol('fur')
export const miles = furlongs.scaled(1 / 8).withSymbol('mi');
