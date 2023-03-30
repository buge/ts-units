import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {meters} from '../length';

/** A quantity of volume. */
export type Volume<NumberType = number> = Quantity<
  NumberType,
  dimension.Volume
>;

/**
 * The cubic meter, symbol `m³`, is the SI unit of area. All other units in
 * this module are defined as scaled values of the cubic meter.
 */
export const cubicMeters: Unit<number, dimension.Volume> = meters
  .cubed()
  .withSymbol('m³');
