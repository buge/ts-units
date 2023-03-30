import * as dimension from './dimension';
import {Quantity, makeUnit} from '../unit';

/** A quantity of thermodynamic temperature. */
export type Temperature<NumberType = number> = Quantity<
  NumberType,
  dimension.Temperature
>;

/**
 * The kelvin, symbol `K`, is the SI unit of thermodynamic temperature. All
 * other units in this module are defined as scaled values of the kelvin.
 */
export const kelvin = makeUnit('K', dimension.Temperature);

export const celsius = kelvin.withOffset(-273.15).withSymbol('ºC');
export const fahrenheit = kelvin
  .times(5 / 9)
  .withOffset(-459.67)
  .withSymbol('ºF');
export const rankine = kelvin.times(1 / 1.8).withSymbol('ºR');
