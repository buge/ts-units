import * as dimension from './dimension';
import {Quantity, makeUnit} from '../../unit';

/** A quantity of electric current. */
export type Current = Quantity<dimension.Current>;

/**
 * The ampere, symbol `A`, is the SI base unit of electric current. All other
 * units in this module are defined as scaled values of the ampere.
 */
export const ampere = makeUnit('A', dimension.Current);
