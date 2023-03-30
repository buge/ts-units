import * as dimension from './dimension';
import {Quantity, Unit} from '../unit';
import {seconds} from '../time';

/** A quantity of frequency. */
export type Frequency<NumberType = number> = Quantity<
  NumberType,
  dimension.Frequency
>;

/** The hertz, symbol `Hz`, is the SI unit for frequency. */
export const hertz: Unit<number, dimension.Frequency> = seconds
  .reciprocal()
  .withSymbol('Hz');
