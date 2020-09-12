import {Quantity, makeUnit} from './unit';

namespace dimension {
  /**
   * The dimensions of the SI base quantity of mass.
   *
   * Denoted by `[M]`.
   */
  export type Mass = {mass: 1};
  export const Mass: Mass = {mass: 1};
}

/** A quantity of mass. */
export type Mass = Quantity<dimension.Mass>;

/**
 * The kilogram, symbol `kg` is the SI base unit of mass. All other units in
 * this module are defined as scaled values of the kilogram.
 */
export const kilogram = makeUnit('kg', dimension.Mass);

export const gram = kilogram.scaled(1e-3).withSymbol('g');
