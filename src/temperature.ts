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

export const celsius = kelvin.scaled(1, -273.15).withSymbol('ºC');
export const fahrenheit = kelvin.scaled(9/5, -459.67).withSymbol('ºF');
export const rankine = kelvin.scaled(1.8).withSymbol('ºR');
