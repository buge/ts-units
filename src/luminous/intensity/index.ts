import * as dimension from './dimension';
import {Quantity, makeUnit} from '../../unit';

/** A quantity of luminous intensity. */
export type Intensity<NumberType = number> = Quantity<
  NumberType,
  dimension.Intensity
>;

/**
 * The candela, symbol `cd`, is the SI base unit of luminous intensity. All
 * other units in this module are defined as scaled values of the candela.
 */
export const candelas = makeUnit('cd', dimension.Intensity);
