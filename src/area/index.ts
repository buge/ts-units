import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {meters} from '../length';

/** A quantity of area. */
export type Area<NumberType = number> = Quantity<NumberType, dimension.Area>;

/**
 * The square meter, symbol `m²`, is the SI unit of area. All other units in
 * this module are defined as scaled values of the square meter.
 */
export const squareMeters: Unit<number, dimension.Area> = meters
  .squared()
  .withSymbol('m²');
