import * as dimension from './dimension';
import {Quantity, makeUnit} from '../unit';

/** A quantity of mass. */
export type Mass = Quantity<dimension.Mass>;

/**
 * The kilogram, symbol `kg` is the SI base unit of mass. All other units in
 * this module are defined as scaled values of the kilogram.
 */
export const kilograms = makeUnit('kg', dimension.Mass);

export const grams = kilograms.times(1e-3).withSymbol('g');
