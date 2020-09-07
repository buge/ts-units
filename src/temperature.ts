import {Quantity, makeUnit} from './unit';

namespace dimension {
  /**
   * The dimensions of the SI base quantity of thermodynamic temperature.
   *
   * Denoted by `[Θ]`.
   */
  export type Temperature = {temperature: 1};
  export const Temperature: Temperature = {temperature: 1};
}
/** A quantity of thermodynamic temperature. */
export type Temperature = Quantity<dimension.Temperature>;

/**
 * The kelvin, symbol `K`, is the SI unit of thermodynamic temperature. All
 * other units in this module are defined as scaled values of the kelvin.
 */
export const kelvin = makeUnit('K', dimension.Temperature);

export const celsius = kelvin.scaled('ºC', 1, -273.15);
export const fahrenheit = kelvin.scaled('ºF', 9/5, -459.67);
export const rankine = kelvin.scaled('ºR', 1.8);