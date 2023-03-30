import * as dimension from './dimension';
import {Quantity, Unit} from '../../unit';
import {seconds} from '../../time';

/** A quantity of radioactivity. */
export type Radioactivity<NumberType = number> = Quantity<
  NumberType,
  dimension.Radioactivity
>;

/** The becquerel, symbol `Bq`, is the SI unit for radioactivity. */
export const becquerels: Unit<number, dimension.Radioactivity> = seconds
  .reciprocal()
  .withSymbol('Bq');
