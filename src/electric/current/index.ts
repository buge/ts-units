import * as dimension from './dimension';
import {Quantity, makeUnit} from '../../unit';

/** A quantity of electric current. */
export type Current<NumberType = number> = Quantity<
  NumberType,
  dimension.Current
>;

/**
 * The ampere, symbol `A`, is the SI base unit of electric current. All other
 * units in this module are defined as scaled values of the ampere.
 */
export const amperes = makeUnit('A', dimension.Current);
